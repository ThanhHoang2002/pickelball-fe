export const mappingCategoryName = (categoryName: string) => {
  switch (categoryName) {
    case 'Vợt':
      return 'paddles';
    case 'Phụ kiện':
      return 'accessories';
    case 'paddle':
      return 'Vợt';
    case 'accessories':
      return 'Phụ kiện';
    default:
      return categoryName;
  }
}

