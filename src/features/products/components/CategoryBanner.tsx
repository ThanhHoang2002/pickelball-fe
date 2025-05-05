import { Link } from 'react-router-dom';

type CategoryData = {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
};

type CategoryBannerProps = {
  category: CategoryData;
  reversed?: boolean;
};

export const CategoryBanner = ({ category, reversed = false }: CategoryBannerProps) => {
  const ImageBlock = (
    <div className="aspect-square overflow-hidden rounded-lg">
      <img
        src={category.image}
        alt={category.title}
        className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
      />
    </div>
  );

  const TextBlock = (
    <div className={`flex flex-col ${reversed ? 'md:pr-12' : 'md:pl-12'}`}>
      <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
      <p className="mt-4 text-gray-600">{category.description}</p>
      <Link
        to={category.link}
        className="mt-6 inline-flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
      >
        {category.linkText}
      </Link>
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
      {reversed ? TextBlock : ImageBlock}
      {reversed ? ImageBlock : TextBlock}
    </div>
  );
};
