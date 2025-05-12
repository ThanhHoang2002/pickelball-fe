/**
 * Format số thành định dạng tiền tệ
 * @param amount Số tiền cần format
 * @param locale Locale mặc định là 'vi-VN'
 * @param currency Đơn vị tiền tệ mặc định là 'VND'
 * @returns Chuỗi đã được format theo định dạng tiền tệ
 */
export  const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};