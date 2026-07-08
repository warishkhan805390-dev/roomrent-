export const images = {
  modernApartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  luxuryRoom: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  singleRoom: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80',
  doubleRoom: 'https://images.unsplash.com/photo-1556704692-6d860b8e141d?w=800&q=80',
  familyRoom: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
  pg: 'https://images.unsplash.com/photo-1564078516393-cf04bd96a897?w=800&q=80',
  hostel: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
  villa: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
  studio: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&q=80',
  buildingExterior: 'https://images.unsplash.com/photo-1484154218962-a197bfbde394?w=800&q=80',
  livingRoom: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  bedroom: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
  bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
  balcony: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  parking: 'https://images.unsplash.com/photo-1573342212426-41bb1199f33b?w=800&q=80',
  garden: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80',
  reception: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=800&q=80',
  happyTenants: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80',
  propertyOwner: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',

  gallery1: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
  gallery2: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  gallery3: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  gallery4: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  gallery5: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  gallery6: 'https://images.unsplash.com/photo-1600566753086-00f18f6bae2c?w=800&q=80',
  gallery7: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  gallery8: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
  gallery9: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
  gallery10: 'https://images.unsplash.com/photo-1600566752376-85792a4c0e97?w=800&q=80',

  hero1: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920&q=80',
  hero2: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80',
  hero3: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1920&q=80',

  about: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
  team1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',

  contact: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=1200&q=80',
};

export const getPropertyGallery = () => [
  images.gallery1,
  images.gallery2,
  images.gallery3,
  images.gallery4,
  images.gallery5,
  images.gallery6,
  images.gallery7,
  images.gallery8,
  images.gallery9,
  images.gallery10,
];

export const categories = [
  { id: 1, name: 'Studio Apartment', image: images.studio, count: 24 },
  { id: 2, name: 'Single Room', image: images.singleRoom, count: 18 },
  { id: 3, name: 'Double Room', image: images.doubleRoom, count: 15 },
  { id: 4, name: 'Family Room', image: images.familyRoom, count: 12 },
  { id: 5, name: 'PG Accommodation', image: images.pg, count: 30 },
  { id: 6, name: 'Hostel', image: images.hostel, count: 20 },
  { id: 7, name: 'Villa', image: images.villa, count: 8 },
  { id: 8, name: 'Luxury Suite', image: images.luxuryRoom, count: 10 },
];

export const amenities = [
  { id: 1, name: 'Living Room', image: images.livingRoom },
  { id: 2, name: 'Bedroom', image: images.bedroom },
  { id: 3, name: 'Kitchen', image: images.kitchen },
  { id: 4, name: 'Bathroom', image: images.bathroom },
  { id: 5, name: 'Balcony', image: images.balcony },
  { id: 6, name: 'Parking', image: images.parking },
  { id: 7, name: 'Garden', image: images.garden },
  { id: 8, name: 'Reception', image: images.reception },
];

export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tenant',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    text: 'Found my perfect studio apartment through RoomFinder. The process was seamless and the property exceeded my expectations!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Property Owner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    text: 'Listing my properties on RoomFinder was the best decision. I found quality tenants within days of posting.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Tenant',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    text: 'The detailed photos and virtual tours made it easy to choose my new home. Highly recommend for anyone house hunting!',
    rating: 5,
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Tenant',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    text: 'Great platform with amazing support. The team helped me find a PG accommodation that was perfect for my budget.',
    rating: 4,
  },
];
