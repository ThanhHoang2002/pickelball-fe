/**
 * Format date string to localized date format
 * @param dateString - date string or null
 * @param locale - locale string, defaults to 'en-US'
 * @returns formatted date string or 'N/A' if date is null or invalid
 */
export const formatDate = (
  dateString: string | null, 
  locale: string = 'en-US'
): string => {
  if (!dateString) return "N/A";
  
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return "N/A";
    }
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
}; 