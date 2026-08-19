import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, ArrowLeftRight, Layers, ZoomIn, ZoomOut, Compass, Info, CheckCircle2 } from 'lucide-react';
import { CITY_COORDINATES, calculateDistance } from '../data/vehiclesData';

// Custom Google Maps Style Teardrop Markers
const createGooglePinHtml = (type, label) => {
  const isPickup = type === 'pickup';
  const isDest = type === 'dest';
  const bgColor = isPickup ? '#34A853' : isDest ? '#EA4335' : '#4285F4';

  return `
    <div class="google-map-marker-pin group flex flex-col items-center">
      <div style="background-color: ${bgColor};" class="w-8 h-8 rounded-full shadow-lg border-2 border-white flex items-center justify-center text-white font-extrabold text-xs transition-transform transform hover:scale-125">
        ${isPickup ? 'A' : isDest ? 'B' : '•'}
      </div>
      <div style="border-top-color: ${bgColor};" class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-[1px]"></div>
      <div class="bg-white/95 text-slate-900 font-extrabold text-[11px] px-2 py-0.5 rounded-full shadow-md border border-slate-200 mt-1 whitespace-nowrap">
        ${label}
      </div>
    </div>
  `;
};

const createCityDotHtml = (label, isSelected, type) => {
  if (isSelected) {
    return createGooglePinHtml(type, label);
  }
  return `
    <div class="flex flex-col items-center group cursor-pointer">
      <div class="w-3.5 h-3.5 rounded-full bg-white border-2 border-blue-600 shadow-md group-hover:scale-125 transition-transform"></div>
      <div class="bg-slate-900/90 text-white font-bold text-[10px] px-1.5 py-0.5 rounded shadow-xs mt-0.5 whitespace-nowrap">
        ${label.split(' ')[0]}
      </div>
    </div>
  `;
};

export default function RouteMap({ pickupCity, destinationCity, onSelectPickup, onSelectDestination }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerGroupRef = useRef(null);
  const polylineRef = useRef(null);

  const [tileMode, setTileMode] = useState('voyager'); // 'voyager' (Google Map Light style) or 'satellite'
  const [tileLayerObj, setTileLayerObj] = useState(null);

  const distance = (pickupCity && destinationCity) ? calculateDistance(pickupCity, destinationCity) : 0;
  const estimatedHours = distance > 0 ? (distance / 45).toFixed(1) : 0;
  const estimatedMins = Math.round(distance * 1.4);

  const pickupCoords = pickupCity ? CITY_COORDINATES[pickupCity] : null;
  const destCoords = destinationCity ? CITY_COORDINATES[destinationCity] : null;

  // Initialize Leaflet Map Instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center around Tamil Nadu (Coimbatore/Erode region)
      const map = L.map(mapContainerRef.current, {
        center: [11.2500, 77.2500],
        zoom: 9,
        zoomControl: false,
        attributionControl: false
      });

      // Google Maps Voyager Light Style Tile Layer
      const initialLayer = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd'
        }
      ).addTo(map);

      setTileLayerObj(initialLayer);

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when tileMode changes (Street / Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerObj) {
      mapInstanceRef.current.removeLayer(tileLayerObj);
    }

    let url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    if (tileMode === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    }

    const newLayer = L.tileLayer(url, { maxZoom: 18 }).addTo(mapInstanceRef.current);
    setTileLayerObj(newLayer);
  }, [tileMode]);

  // Render City Pins & Polyline Route whenever pickupCity or destinationCity changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    const boundsLatLngs = [];

    // Render markers ONLY for selected Pick-up and Reach Destination locations
    Object.entries(CITY_COORDINATES).forEach(([cityName, data]) => {
      const isPickup = pickupCity === cityName;
      const isDest = destinationCity === cityName;
      const isSelected = isPickup || isDest;

      if (!isSelected) return; // Skip unselected cities

      const type = isPickup ? 'pickup' : 'dest';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: createGooglePinHtml(type, cityName),
        iconSize: [40, 50],
        iconAnchor: [20, 25]
      });

      L.marker([data.lat, data.lng], { icon: customIcon }).addTo(layerGroup);
      boundsLatLngs.push([data.lat, data.lng]);
    });

    // Draw Google Maps Blue Polyline Route
    if (pickupCoords && destCoords) {
      const latlngs = [
        [pickupCoords.lat, pickupCoords.lng],
        [destCoords.lat, destCoords.lng]
      ];

      // Google Maps Signature Blue Route Line (#4285F4)
      const polyline = L.polyline(latlngs, {
        color: '#4285F4',
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(layerGroup);

      polylineRef.current = polyline;

      // Fit map view bounds with padding so both pins are visible
      const bounds = L.latLngBounds(boundsLatLngs);
      mapInstanceRef.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
    } else if (pickupCoords) {
      mapInstanceRef.current.setView([pickupCoords.lat, pickupCoords.lng], 10);
    } else if (destCoords) {
      mapInstanceRef.current.setView([destCoords.lat, destCoords.lng], 10);
    }
  }, [pickupCity, destinationCity]);

  // Zoom Control Handlers
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  // Swap Locations Handler
  const handleSwapLocations = () => {
    const temp = pickupCity;
    onSelectPickup(destinationCity);
    onSelectDestination(temp);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xl relative space-y-0 text-slate-800">
      
      {/* 1. GOOGLE MAPS SEARCH & ROUTE HEADER BAR */}
      <div className="p-4 bg-white border-b border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          {/* Google Maps Styled Logo & Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-slate-900 text-sm tracking-tight">Google Maps</span>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                  Live Directions
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Interactive Route Navigation & City Pins</p>
            </div>
          </div>

          {/* Satellite / Street Map Layer Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setTileMode('voyager')}
              className={`px-2.5 py-1 rounded-lg font-extrabold transition-all cursor-pointer ${
                tileMode === 'voyager' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Default
            </button>
            <button
              type="button"
              onClick={() => setTileMode('satellite')}
              className={`px-2.5 py-1 rounded-lg font-extrabold transition-all cursor-pointer ${
                tileMode === 'satellite' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
          </div>
        </div>

        {/* Pickup & Destination Address Bar Overlay */}
        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center gap-3 text-xs">
          
          {/* Pick-up Badge */}
          <div className="flex-1 w-full bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs">
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
              A
            </div>
            <div className="flex-1 truncate">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Pick-up Location</span>
              <strong className="text-slate-900 font-bold block truncate">
                {pickupCity || 'Select Pick-up on map or dropdown'}
              </strong>
            </div>
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwapLocations}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-blue-600 transition-colors shadow-2xs cursor-pointer shrink-0"
            title="Swap Pickup and Destination"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Destination Badge */}
          <div className="flex-1 w-full bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-2xs">
            <div className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
              B
            </div>
            <div className="flex-1 truncate">
              <span className="text-[10px] font-bold text-slate-400 block uppercase">Reach Destination</span>
              <strong className="text-slate-900 font-bold block truncate">
                {destinationCity || 'Select Destination on map'}
              </strong>
            </div>
          </div>

        </div>
      </div>

      {/* 2. LEAFLET MAP CANVAS CONTAINER */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-100 overflow-hidden">
        
        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} className="w-full h-full z-10"></div>

        {/* GOOGLE MAPS FLOATING ROUTE TELEMETRY PILL */}
        {distance > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-200 text-slate-900 max-w-xs space-y-2 animate-slide-down">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[10px] font-black text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Fastest Route
              </span>
              <span className="text-[10px] font-extrabold text-blue-600">via Highways</span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 tracking-tight">{estimatedMins} min</span>
              <span className="text-sm font-bold text-slate-600">({distance} km)</span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium leading-tight">
              Normal traffic. Pay fare directly upon reaching destination.
            </p>
          </div>
        )}

        {/* GOOGLE MAPS ZOOM CONTROLS (BOTTOM RIGHT) */}
        <div className="absolute bottom-6 right-4 z-20 flex flex-col gap-1 shadow-md rounded-xl overflow-hidden bg-white border border-slate-200">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2.5 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors border-b border-slate-100"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2.5 hover:bg-slate-100 text-slate-700 cursor-pointer transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* QUICK HELPER TOAST */}
        {!pickupCity && !destinationCity && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-slate-900/90 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl border border-slate-700 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400" />
            <span>Select Pick-up & Destination to view marked route on map</span>
          </div>
        )}
      </div>

      {/* 3. CITY HUB SELECTION CHIPS BAR */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
        <span className="text-slate-400 font-extrabold text-[10px] uppercase shrink-0">Click Hub Pin:</span>
        {Object.keys(CITY_COORDINATES).map((c) => {
          const isPickup = pickupCity === c;
          const isDest = destinationCity === c;

          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                if (!pickupCity || (pickupCity && destinationCity)) {
                  onSelectPickup(c);
                  if (destinationCity === c) onSelectDestination('');
                } else {
                  if (c !== pickupCity) onSelectDestination(c);
                }
              }}
              className={`px-3 py-1.5 rounded-xl shrink-0 font-extrabold transition-all cursor-pointer border text-xs ${
                isPickup
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : isDest
                  ? 'bg-red-600 text-white border-red-500 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:text-blue-600 shadow-2xs'
              }`}
            >
              {c.split(' ')[0]}
            </button>
          );
        })}
      </div>

    </div>
  );
}
