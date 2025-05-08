import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/features/cart';
import { CategoryBanner } from '@/features/products/components/CategoryBanner';
import { HeroBanner } from '@/features/products/components/HeroBanner';
import { ProductCard } from '@/features/products/components/ProductCard';
import { useBestSellers } from '@/features/products/hooks/useProducts';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// ProductCardSkeleton - Sử dụng compound pattern giống như ProductCard
const ProductCardSkeleton = {
  Root: ({ className, children }: { className?: string, children?: React.ReactNode }) => (
    <div className={`group relative flex w-56 flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md ${className || ''}`}>
      <Skeleton className="absolute right-4 top-4 h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
      {children}
    </div>
  ),
  
  Image: () => (
    <div className="relative aspect-square w-full overflow-hidden rounded-md bg-gray-100">
      <Skeleton className="h-full w-full" />
      <div className="absolute left-2 top-2 z-10">
        <Skeleton className="h-6 w-12 rounded-md" />
      </div>
    </div>
  ),
  
  Content: ({ children }: { children?: React.ReactNode }) => (
    <div className="mt-4 flex flex-col">
      {children}
    </div>
  ),
  
  Title: () => (
    <Skeleton className="h-[3.5rem] w-full" />
  ),
  
  Supplier: () => (
    <Skeleton className="mt-1 h-5 w-1/2" />
  ),
  
  Price: () => (
    <div className="mt-1 flex items-center">
      <Skeleton className="h-7 w-1/3" />
      <Skeleton className="ml-2 h-5 w-1/4" />
    </div>
  ),
  
  Action: () => (
    <Skeleton className="mt-4 h-10 w-full rounded-md" />
  )
};

// Skeleton component cho sản phẩm đang tải - Composite version
const ProductSkeleton = () => (
  <ProductCardSkeleton.Root>
    <ProductCardSkeleton.Image />
    <ProductCardSkeleton.Content>
      <ProductCardSkeleton.Title />
      <ProductCardSkeleton.Supplier />
      <ProductCardSkeleton.Price />
      <ProductCardSkeleton.Action />
    </ProductCardSkeleton.Content>
  </ProductCardSkeleton.Root>
);

const categoryBanners = [
  {
    title: 'Paddles',
    description: 'Discover our collection of high-quality pickleball paddles, designed for players of all skill levels. From beginner-friendly options to advanced competition paddles, find the perfect match for your game.',
    image: 'https://www.recesspickleball.com/cdn/shop/files/PaddlesCategory_Desktop_673x.progressive.jpg?v=1738533804',
    link: '/category/paddles',
    linkText: 'Shop Paddles',
  },
  {
    title: 'Accessories',
    description: 'Complete your pickleball gear with our accessories collection. From bags and balls to grip tape and paddle covers, we have everything you need to enhance your game and keep your equipment in top condition.',
    image: 'https://www.recesspickleball.com/cdn/shop/files/AccessoriesCategory_Desktop_756x.progressive.jpg?v=1738533706%201x',
    link: '/category/accessories',
    linkText: 'Shop Accessories',
  },
];

const HomePage = () => {
  const { data: bestSellers = [], isLoading } = useBestSellers();
  const {addItem} =useCart()
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <HeroBanner
        title="The Perfect Pickleball Paddles"
        subtitle="High-quality, aesthetic pickleball paddles for players of all skill levels"
        backgroundImage="https://joola.com.vn/images/1099/thumbs/joola-pro-iv-1920x850xcrop.webp?1920"
        buttonText="Shop Now"
        buttonLink="/category/paddles"
      />

      {/* Scroll indicator */}
      <motion.div 
        className="-mt-8 mb-8 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: 0.8,
            duration: 0.5
          }
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium text-gray-600">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-black" />
        </motion.div>
      </motion.div>

      {/* Best Sellers */}
      <motion.section 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <motion.div variants={fadeInUp}>
          <div className="w-full">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Best Sellers</h2>
            
            {isLoading ? (
              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array(8).fill(0).map((_, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))}
              </div>
            ) : bestSellers.length === 0 ? (
              <p className="text-center text-gray-500">
                No products found.
              </p>
            ) : (
              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {bestSellers.map((product, index) => (
                  <motion.div
                    key={product.id}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard.Root product={product} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                      <ProductCard.Image />
                      <ProductCard.Content>
                        <ProductCard.Title />
                        <ProductCard.Supplier />
                        <ProductCard.Price />
                        <ProductCard.Action label="Add to cart" onClick={()=>addItem(product.id,1)} />
                      </ProductCard.Content>
                    </ProductCard.Root>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* Category Banners */}
      <motion.section 
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="space-y-24">
          {categoryBanners.map((category, index) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <CategoryBanner
                category={category}
                reversed={index % 2 === 1}
              />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Email Signup */}
      <motion.section 
        className="border-t border-gray-200 bg-gray-50 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-5xl lg:px-8">
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Stay in the Loop</h2>
            <p className="mt-4 text-lg text-gray-600">
              Sign up for exclusive access to new products, discounts, events, and more!
            </p>
            
            <motion.form 
              className="mx-auto mt-8 flex max-w-md"
              variants={fadeInUp}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-gray-300 px-4 py-2 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <Button
                type="submit"
                className="rounded-l-none rounded-r-md bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Subscribe
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Benefits */}
      <motion.section 
        className="bg-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={fadeInUp}
          >
            {[
              {
                title: 'Free Shipping',
                description: 'On all orders over $150',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
              },
              {
                title: 'High Quality',
                description: 'Premium materials and craftsmanship',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ),
              },
              {
                title: 'Expert Support',
                description: 'Guidance from pickleball experts',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288" />
                  </svg>
                ),
              },
              {
                title: 'Easy Returns',
                description: '30-day hassle-free returns',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <motion.div 
                key={benefit.title} 
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 rounded-full bg-gray-100 p-3 text-black">
                  {benefit.icon}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{benefit.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Call to Action */}
      <motion.section 
        className="bg-black py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-8 text-center"
            variants={fadeInUp}
          >
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to upgrade your pickleball game?
            </h2>
            <p className="max-w-xl text-lg text-gray-300">
              Browse our collection of premium paddles and accessories to take your game to the next level.
            </p>
            <Button 
              asChild
              className="mt-6 bg-white text-black hover:bg-gray-200"
              size="lg"
            >
              <Link to="/category/paddles">Shop Collection</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;