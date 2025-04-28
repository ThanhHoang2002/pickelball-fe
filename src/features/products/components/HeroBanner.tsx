import { Link } from 'react-router-dom';

type HeroBannerProps = {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  buttonText: string;
  buttonLink: string;
};

export const HeroBanner = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
}: HeroBannerProps) => {
  return (
    <div
      className="relative flex h-[70vh] w-full flex-col items-center justify-center bg-cover bg-center py-32 text-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        
        {subtitle && (
          <p className="mt-6 text-xl text-white">
            {subtitle}
          </p>
        )}
        
        <div className="mt-10">
          <Link
            to={buttonLink}
            className="rounded-md bg-white px-8 py-3 text-base font-medium text-black shadow-sm hover:bg-gray-100"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}; 