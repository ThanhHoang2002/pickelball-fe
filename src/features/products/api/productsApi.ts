import { Product, ProductCategory } from '../types';

// In a real application, we would fetch from an API
// For this example, we'll use mock data

export const fetchProducts = async (): Promise<Product[]> => {
  return mockProducts;
};

export const fetchProductsByCategory = async (category: ProductCategory): Promise<Product[]> => {
  return mockProducts.filter(product => product.category === category);
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return mockProducts.find(product => product.id === id);
};

export const fetchBestSellers = async (): Promise<Product[]> => {
  return mockProducts.filter(product => product.isBestSeller);
};

export const fetchSaleProducts = async (): Promise<Product[]> => {
  return mockProducts.filter(product => product.isOnSale);
};

export const fetchNewArrivals = async (): Promise<Product[]> => {
  return mockProducts.filter(product => product.isNewArrival);
};

// Mock data
const mockProducts: Product[] = [
  // Premium Paddles
  {
    id: '1',
    name: 'Six Zero Double Black Diamond Control',
    slug: 'six-zero-double-black-diamond-control',
    description: 'Our best paddle yet. The Six Zero Double Black Diamond Control offers exceptional spin and touch with balanced power. Its premium carbon fiber face provides unmatched feedback, making it the perfect choice for skilled players seeking precision.',
    price: 189.99,
    category: 'paddles',
    tags: ['advanced', 'premium', 'control'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'advanced',
    isOnSale: false,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: '2',
    name: 'JOOLA Perseus Pro IV',
    slug: 'joola-perseus-pro-iv',
    description: 'Unleash explosive power with the JOOLA Perseus Pro IV. Featuring JOOLA\'s JOOfoam core and Hyperfoam technology, this paddle delivers maximum power without sacrificing control. Ideal for aggressive players looking to dominate the court.',
    price: 169.99,
    originalPrice: 199.99,
    category: 'paddles',
    tags: ['advanced', 'power', 'bestseller'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'advanced',
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: '3',
    name: 'PIKKL Hurricane Pro',
    slug: 'pikkl-hurricane-pro',
    description: 'Experience unmatched precision with the PIKKL Hurricane Pro. Its carbon fiber face and honeycomb core provide exceptional touch and feel, making it the go-to choice for players who prioritize shot placement and finesse.',
    price: 159.99,
    originalPrice: 189.99,
    category: 'paddles',
    tags: ['advanced', 'control', 'precision'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'advanced',
    isOnSale: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: '4',
    name: 'Bread & Butter Filth',
    slug: 'bread-butter-filth',
    description: 'The ultimate all-court paddle. The Bread & Butter Filth offers the perfect balance of power, control, and spin, making it versatile for every style of play. Its raw carbon fiber face delivers incredible spin potential and consistent performance.',
    price: 174.99,
    category: 'paddles',
    tags: ['intermediate', 'advanced', 'all-court'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'intermediate',
    isOnSale: false,
    isBestSeller: true,
    isNewArrival: false
  },
  // Intermediate Paddles
  {
    id: '5',
    name: 'Barton Springs',
    slug: 'barton-springs',
    description: 'The perfect pickleball paddle for intermediate players. The Barton Springs offers a great balance of power and control with its polypropylene core and fiberglass face.',
    price: 54.00,
    originalPrice: 68.00,
    category: 'paddles',
    tags: ['intermediate', 'bestseller'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'intermediate',
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: '6',
    name: 'Selkirk Power Air Invikta',
    slug: 'selkirk-power-air-invikta',
    description: 'Experience the perfect blend of power and control with the Selkirk Power Air Invikta. Its air-dynamic shape reduces drag for faster swings, while the polymer core ensures excellent touch and feel.',
    price: 149.99,
    category: 'paddles',
    tags: ['intermediate', 'advanced', 'power'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'intermediate',
    isOnSale: false,
    isBestSeller: false,
    isNewArrival: true
  },
  // Budget/Beginner Paddles
  {
    id: '7',
    name: 'Vatic Pro PRISM Flash',
    slug: 'vatic-pro-prism-flash',
    description: 'The best budget paddle on the market. The Vatic Pro PRISM Flash delivers exceptional control and touch at an affordable price point. Perfect for beginners or players on a budget who don\'t want to compromise on quality.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'paddles',
    tags: ['beginner', 'budget', 'control'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'beginner',
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: '8',
    name: 'Friday Original',
    slug: 'friday-original',
    description: 'Start your pickleball journey right with the Friday Original. This beginner-friendly paddle offers excellent playability and durability at a price that won\'t break the bank. The perfect first paddle for new players.',
    price: 69.99,
    category: 'paddles',
    tags: ['beginner', 'budget', 'starter'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'beginner',
    isOnSale: false,
    isBestSeller: false,
    isNewArrival: false
  },
  // Paddle Sets
  {
    id: '9',
    name: 'Advanced Midnight Set',
    slug: 'advanced-midnight-set',
    description: 'Premium paddle set for advanced players. Includes two high-performance paddles, four premium balls, and a deluxe carrying case.',
    price: 178.00,
    originalPrice: 210.00,
    category: 'paddle-sets',
    tags: ['advanced', 'set'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'advanced',
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: '10',
    name: 'Date Night Set',
    slug: 'date-night-set',
    description: 'The perfect set for couples who play together. Includes two intermediate-level paddles, four balls, and a stylish carrying case.',
    price: 212.00,
    originalPrice: 248.00,
    category: 'paddle-sets',
    tags: ['set', 'gift'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'intermediate',
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: '11',
    name: 'Family Fun Pack',
    slug: 'family-fun-pack',
    description: 'Everything your family needs to get started with pickleball. Includes four beginner-friendly paddles, eight balls, and a portable net system.',
    price: 249.99,
    originalPrice: 299.99,
    category: 'paddle-sets',
    tags: ['beginner', 'set', 'family'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    skill: 'beginner',
    isOnSale: true,
    isBestSeller: false,
    isNewArrival: false
  },
  // Clothing
  {
    id: '12',
    name: 'Merrit Dress - Black',
    slug: 'merrit-dress-black',
    description: 'Stylish and comfortable dress for pickleball. Features moisture-wicking fabric and a built-in shorts liner.',
    price: 78.00,
    originalPrice: 98.00,
    category: 'clothing',
    tags: ['dress', 'bestseller'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    colors: [
      { name: 'Black', value: '#000000', imageUrl: 'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158' },
      { name: 'Espresso', value: '#5D4037', imageUrl: 'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158' },
      { name: 'Navy', value: '#0D47A1', imageUrl: 'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158' },
      { name: 'Poppy', value: '#D32F2F', imageUrl: 'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158' }
    ],
    sizes: ['xs', 's', 'm', 'l', 'xl'],
    isOnSale: true,
    isBestSeller: true,
    isNewArrival: false
  },
  // Accessories
  {
    id: '13',
    name: 'Court Bag',
    slug: 'court-bag',
    description: 'Compact bag perfect for carrying your essentials. Features a padded paddle compartment and multiple storage pockets.',
    price: 11.00,
    originalPrice: 14.00,
    category: 'accessories',
    tags: ['bag', 'essentials'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    isOnSale: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: '14',
    name: 'Rally Bag',
    slug: 'rally-bag',
    description: 'Spacious bag for all your pickleball gear. Features dedicated compartments for paddles, shoes, and clothing.',
    price: 78.00,
    originalPrice: 98.00,
    category: 'accessories',
    tags: ['bag', 'large'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    isOnSale: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: '15',
    name: 'Green Hybrid Pickleballs - Set of 3',
    slug: 'green-hybrid-pickleballs',
    description: 'Premium outdoor pickleballs for performance play. These durable balls offer consistent bounce and visibility in all conditions.',
    price: 11.00,
    originalPrice: 14.00,
    category: 'accessories',
    tags: ['balls', 'essentials'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    isOnSale: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: '16',
    name: 'Custom Pickleball Paddle',
    slug: 'custom-pickleball-paddle',
    description: 'Design your own unique paddle with our customization tools. Choose from multiple face materials, core options, and add your name or logo.',
    price: 78.00,
    originalPrice: 98.00,
    category: 'custom-paddles',
    tags: ['custom', 'gift'],
    images: [
      'https://www.recesspickleball.com/cdn/shop/files/recess-pickleball-sets-midnight-set-39787043881203_600x.progressive.jpg?v=1698793158'
    ],
    isOnSale: false,
    isNewArrival: true
  }
]; 