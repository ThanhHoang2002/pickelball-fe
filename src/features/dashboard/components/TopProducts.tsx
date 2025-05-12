import { CakeSlice } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { TopSellingProduct } from '../types';

import { Card } from '@/components/ui/card';
import { formatCurrency } from '@/utils/format';

interface TopProductsProps {
  products: TopSellingProduct[];
}

const TopProducts = memo(({ products }: TopProductsProps) => {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Top Selling Products</h2>
        <Link to="/admin/products" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="h-64 overflow-hidden">
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product.productId} className="flex items-center">
                <div className="mr-4 h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                  {product.productImage ? (
                    <img
                      src={product.productImage}
                      alt={product.productName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/20">
                      <CakeSlice className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{product.productName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(product.totalRevenue / product.totalQuantitySold)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.totalQuantitySold} sold</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(product.totalRevenue)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </Card>
  );
});

TopProducts.displayName = 'TopProducts';

export default TopProducts; 