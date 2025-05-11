/**
 * Maps UI category names to API category names
 * @param categoryName The UI-friendly category name to be mapped to API category name
 * @returns The API category name
 */
export function mappingCategoryName(categoryName: string): string {
  const categoryMap: Record<string, string> = {
    'paddles': 'Paddles',
    'accessories': 'Accessories',
    'vợt': 'Paddles',
    'phụ kiện': 'Accessories'
  };
  
  const normalizedCategoryName = categoryName.toLowerCase();
  return categoryMap[normalizedCategoryName] || categoryName;
} 