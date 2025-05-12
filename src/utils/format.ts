/**
 * Format số thành định dạng tiền tệ
 * @param amount Số tiền cần format
 * @param locale Locale mặc định là 'vi-VN'
 * @param currency Đơn vị tiền tệ mặc định là 'VND'
 * @returns Chuỗi đã được format theo định dạng tiền tệ
 */
export const formatCurrency = (
  amount: number,
  locale = 'vi-VN',
  currency = 'VND'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}; 