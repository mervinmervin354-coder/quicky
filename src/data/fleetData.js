export const FLEET_DATA = [
  // 4-Wheeler Cars (₹12 / km)
  {
    id: 'car-1',
    name: 'Maruti Suzuki Swift VXi',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.95,
    reviews: 490,
    seats: 5,
    transmission: 'Manual / AMT',
    fuel: '1.2L Petrol',
    image: '/cars/swift_dzire.jpg',
    featured: true,
    tag: 'Popular Hatchback',
    ownerName: 'Mr. G. Anand (Kongu Travels)',
    ownerPhone: '+91 98422 99000',
    ownerLocation: 'Singanallur, Coimbatore',
    ownerRating: 4.97,
    registrationNo: 'TN-37-SW-1289',
    modelYear: '2024 Model',
    color: 'Pearl Arctic White',
    insuranceValid: 'Valid till Dec 2027',
    features: ['Air Conditioning', 'Touchscreen Infotainment', 'Dual Airbags', 'GPS Live Tracking', '268L Boot Space']
  },
  {
    id: 'car-2',
    name: 'Hyundai Creta SX',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.94,
    reviews: 360,
    seats: 5,
    transmission: 'Manual / Automatic',
    fuel: '1.5L Petrol',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tag: 'Premium SUV',
    ownerName: 'Mr. R. Subramaniam',
    ownerPhone: '+91 97899 44332',
    ownerLocation: 'Collectorate Hub, Erode',
    ownerRating: 4.95,
    registrationNo: 'TN-33-CR-9090',
    modelYear: '2024 Model',
    color: 'Abyss Black',
    insuranceValid: 'Valid till Jan 2028',
    features: ['Panoramic Sunroof', 'Bose 8-Speaker System', 'Ventilated Seats', 'Wireless Charger', '433L Boot Space']
  },
  {
    id: 'car-3',
    name: 'Toyota Innova Crysta 2.4 VX',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.98,
    reviews: 520,
    seats: 7,
    transmission: 'Manual 5-Speed',
    fuel: '2.4L Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    featured: true,
    tag: 'Luxury 7-Seater MPV',
    ownerName: 'Mr. V. Senthil Kumar (Royal Cabs)',
    ownerPhone: '+91 98428 55443',
    ownerLocation: 'Gandhipuram Bus Stand, Coimbatore',
    ownerRating: 4.99,
    registrationNo: 'TN-37-IN-7788',
    modelYear: '2024 Model',
    color: 'Super White',
    insuranceValid: 'Valid till Feb 2028',
    features: ['Rear AC Vents', 'Captain Seats with Armrest', '7 Airbags', 'Dual Zone Climate Control', 'Roof Ambient Lighting']
  },
  {
    id: 'car-4',
    name: 'Mahindra Thar LX 4x4',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.92,
    reviews: 280,
    seats: 4,
    transmission: 'Manual / Automatic',
    fuel: '2.2L mHawk Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tag: 'Off-Road SUV',
    ownerName: 'Mr. D. Vignesh',
    ownerPhone: '+91 99445 66778',
    ownerLocation: 'Charring Cross, Ooty',
    ownerRating: 4.93,
    registrationNo: 'TN-43-TH-4400',
    modelYear: '2023 Model',
    color: 'Napoli Black',
    insuranceValid: 'Valid till Sep 2026',
    features: ['4x4 Low-Range Transfer Case', 'Convertible Hard Top', '4-Star Global NCAP', 'All-Terrain Tyres']
  },
  {
    id: 'car-5',
    name: 'Tata Nexon XZ Plus',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.91,
    reviews: 310,
    seats: 5,
    transmission: 'Manual 6-Speed',
    fuel: '1.2L Turbo Petrol',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tag: '5-Star Safety SUV',
    ownerName: 'Mr. P. Kumaresan',
    ownerPhone: '+91 98423 77889',
    ownerLocation: 'New Bus Stand, Salem',
    ownerRating: 4.91,
    registrationNo: 'TN-27-NX-5566',
    modelYear: '2024 Model',
    color: 'Flame Red',
    insuranceValid: 'Valid till Nov 2027',
    features: ['5-Star NCAP Safety Rating', 'Harman 8-Speaker Audio', 'Express Cool AC', '350L Boot Space']
  },
  {
    id: 'car-6',
    name: 'Honda City 5th Gen',
    category: '4-Wheeler Cars',
    price: 12,
    rating: 4.93,
    reviews: 220,
    seats: 5,
    transmission: 'Manual / CVT',
    fuel: '1.5L i-VTEC Petrol',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    featured: false,
    tag: 'Executive Sedan',
    ownerName: 'Mr. S. Ramesh',
    ownerPhone: '+91 97878 11223',
    ownerLocation: 'Hope College, Coimbatore',
    ownerRating: 4.92,
    registrationNo: 'TN-37-HC-3030',
    modelYear: '2024 Model',
    color: 'Golden Brown Metallic',
    insuranceValid: 'Valid till Jan 2028',
    features: ['Honda Sensing ADAS', 'Leatherette Upholstery', 'LaneWatch Camera', '506L Trunk Capacity']
  },

  // Commercial Goods Trucks (₹15 - ₹25 / km)
  {
    id: 'truck-1',
    name: 'Tata Ace Gold Diesel (Chota Hathi)',
    category: 'Commercial Trucks',
    price: 15,
    rating: 4.96,
    reviews: 340,
    seats: 2,
    transmission: 'Manual 5-Speed',
    fuel: '702 cc Diesel / CNG',
    image: '/trucks/tata_ace.jpg',
    featured: true,
    tag: 'Popular Mini Truck (750 kg Payload)',
    ownerName: 'Mr. P. Velusamy (Kovai Logistics)',
    ownerPhone: '+91 98421 77889',
    ownerLocation: 'Goods Shed Road, Coimbatore',
    ownerRating: 4.95,
    registrationNo: 'TN-37-TA-8899',
    modelYear: '2024 Model',
    color: 'Pure White',
    insuranceValid: 'Valid till Nov 2027',
    features: ['750 kg Payload Capacity', 'High Mileage Diesel Engine', 'Heavy Duty Cargo Bed', 'All-India Permit']
  },
  {
    id: 'truck-2',
    name: 'Eicher Pro 2049 Commercial Goods Truck',
    category: 'Commercial Trucks',
    price: 25,
    rating: 4.98,
    reviews: 290,
    seats: 3,
    transmission: 'Manual 5-Speed',
    fuel: 'E366 3.3L Turbo Diesel',
    image: '/trucks/eicher.jpg',
    featured: true,
    tag: 'Heavy Commercial Carrier (3.5 Ton Payload)',
    ownerName: 'Mr. K. Natarajan (Kongu Transport)',
    ownerPhone: '+91 97877 44556',
    ownerLocation: 'Lorry Owner Association, Salem',
    ownerRating: 4.97,
    registrationNo: 'TN-27-EP-4512',
    modelYear: '2024 Model',
    color: 'Yellow & Blue Container',
    insuranceValid: 'Valid till Dec 2027',
    features: ['3500 kg Payload Capacity', '14 Feet Covered Container Body', 'GPS Live Location Tracking', 'Intercity Goods Carrier']
  }
];

export const CATEGORIES = ['All', '4-Wheeler Cars', 'Commercial Trucks'];

export const CITIES = [
  'Coimbatore',
  'Erode',
  'Gobi (Gobichettipalayam)',
  'Sathy (Sathyamangalam)',
  'Tiruppur',
  'Salem',
  'Mettupalayam',
  'Bhavani',
  'Karur',
  'Ooty (Udhagamandalam)'
];

export const CATEGORY_RATES = {
  '4-Wheeler Cars': 12,
  'Commercial Trucks': 15
};

export const getPerKmRate = (category) => {
  if (!category) return 8;
  if (category.includes('2-Wheeler') || category.includes('Bike')) return 8;
  if (category.includes('3-Wheeler') || category.includes('Auto')) return 10;
  if (category.includes('4-Wheeler') || category.includes('Car')) return 12;
  if (category.includes('Commercial') || category.includes('Truck')) return 15;
  return 8;
};

export const DISTANCE_MATRIX = {
  'Coimbatore-Erode': 100,
  'Coimbatore-Gobi (Gobichettipalayam)': 85,
  'Coimbatore-Sathy (Sathyamangalam)': 70,
  'Coimbatore-Tiruppur': 55,
  'Coimbatore-Salem': 160,
  'Coimbatore-Mettupalayam': 35,
  'Coimbatore-Bhavani': 105,
  'Coimbatore-Karur': 130,
  'Coimbatore-Ooty (Udhagamandalam)': 85,

  'Erode-Gobi (Gobichettipalayam)': 35,
  'Erode-Sathy (Sathyamangalam)': 60,
  'Erode-Tiruppur': 50,
  'Erode-Salem': 65,
  'Erode-Mettupalayam': 105,
  'Erode-Bhavani': 15,
  'Erode-Karur': 65,
  'Erode-Ooty (Udhagamandalam)': 150,

  'Gobi (Gobichettipalayam)-Sathy (Sathyamangalam)': 28,
  'Gobi (Gobichettipalayam)-Tiruppur': 55,
  'Gobi (Gobichettipalayam)-Salem': 90,
  'Gobi (Gobichettipalayam)-Mettupalayam': 50,
  'Gobi (Gobichettipalayam)-Bhavani': 30,
  'Gobi (Gobichettipalayam)-Karur': 95,
  'Gobi (Gobichettipalayam)-Ooty (Udhagamandalam)': 110,

  'Sathy (Sathyamangalam)-Mettupalayam': 35,
  'Sathy (Sathyamangalam)-Ooty (Udhagamandalam)': 85,
  'Sathy (Sathyamangalam)-Tiruppur': 75,
  'Sathy (Sathyamangalam)-Salem': 115,
  'Sathy (Sathyamangalam)-Bhavani': 45,

  'Tiruppur-Salem': 110,
  'Tiruppur-Karur': 80,
  'Tiruppur-Mettupalayam': 75,

  'Salem-Karur': 85,
  'Salem-Bhavani': 55,
  'Bhavani-Karur': 80,
  'Mettupalayam-Ooty (Udhagamandalam)': 50
};

export const calculateDistance = (from, to) => {
  if (!from || !to) return 0;
  if (from === to) return 15;
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  if (DISTANCE_MATRIX[key1]) return DISTANCE_MATRIX[key1];
  if (DISTANCE_MATRIX[key2]) return DISTANCE_MATRIX[key2];
  return 40;
};

export const calculateFare = (from, to, category) => {
  const dist = calculateDistance(from, to);
  const rate = getPerKmRate(category);
  return dist * rate;
};
