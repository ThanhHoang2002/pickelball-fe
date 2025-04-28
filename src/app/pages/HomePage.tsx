import { CategoryBanner } from '@/features/products/components/CategoryBanner';
import { HeroBanner } from '@/features/products/components/HeroBanner';
import { ProductGrid } from '@/features/products/components/ProductGrid';
import { useBestSellers } from '@/features/products/hooks/useProducts';

const categoryBanners = [
  {
    title: 'Paddles',
    description: 'Discover our collection of high-quality pickleball paddles, designed for players of all skill levels. From beginner-friendly options to advanced competition paddles, find the perfect match for your game.',
    image: 'https://www.recesspickleball.com/cdn/shop/files/PaddlesCategory_Desktop_673x.progressive.jpg?v=1738533804',
    link: '/category/paddles',
    linkText: 'Shop Paddles',
  },
  {
    title: 'Sets',
    description: 'Get everything you need to start playing with our premium pickleball sets. Each set includes carefully selected paddles and balls, perfect for beginners or as a thoughtful gift for the pickleball enthusiast in your life.',
    image: 'https://www.recesspickleball.com/cdn/shop/files/SetsCategory_Desktop_756x.progressive.jpg?v=1738533732%201x',
    link: '/category/paddle-sets',
    linkText: 'Shop Sets',
  },
  {
    title: 'Accessories',
    description: 'Complete your pickleball gear with our accessories collection. From bags and balls to grip tape and paddle covers, we have everything you need to enhance your game and keep your equipment in top condition.',
    image: 'https://www.recesspickleball.com/cdn/shop/files/AccessoriesCategory_Desktop_756x.progressive.jpg?v=1738533706%201x',
    link: '/category/accessories',
    linkText: 'Shop Accessories',
  },
];

export const HomePage = () => {
  const { data: bestSellers = [], isLoading } = useBestSellers();

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

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <ProductGrid
          products={bestSellers}
          title="Best Sellers"
          emptyMessage={isLoading ? 'Loading products...' : 'No products found.'}
        />
      </section>

      {/* Category Banners */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {categoryBanners.map((category, index) => (
            <CategoryBanner
              key={category.title}
              category={category}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* Email Signup */}
      <section className="bg-gray-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Stay in the Loop</h2>
            <p className="mt-4 text-lg text-gray-600">
              Sign up for exclusive access to new products, discounts, events, and more!
            </p>
            <form className="mx-auto mt-8 flex max-w-md">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-l-md border border-gray-300 px-4 py-2 placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="rounded-r-md bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}; 