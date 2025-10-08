/**
 * Calculate the next Programmiercafé date (every second Friday)
 * Reference date: October 10, 2025 (first Programmiercafé)
 */
export const getNextProgrammiercafeDate = (): Date => {
  const referenceDate = new Date('2025-10-10'); // First Programmiercafé
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // If today is before the reference date, return the reference date
  if (today < referenceDate) {
    return referenceDate;
  }

  // Calculate weeks since reference date
  const daysSinceReference = Math.floor((today.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));
  const weeksSinceReference = Math.floor(daysSinceReference / 7);

  // Find the next occurrence (every 2 weeks)
  let weeksToAdd = weeksSinceReference;
  if (weeksSinceReference % 2 === 1) {
    weeksToAdd += 1; // Next even week
  }

  const nextDate = new Date(referenceDate);
  nextDate.setDate(referenceDate.getDate() + (weeksToAdd * 7));

  // If the calculated date is in the past or today, add 2 weeks
  if (nextDate <= today) {
    nextDate.setDate(nextDate.getDate() + 14);
  }

  return nextDate;
};

/**
 * Format date for event display (e.g., "OCT\n10" for English, "10\nOKT" for German)
 */
export const formatEventDate = (date: Date, locale: 'en' | 'de'): string => {
  const month = date.toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  if (locale === 'en') {
    return `${month}\n${day}`;
  } else {
    return `${day}\n${month}`;
  }
};