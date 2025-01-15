/**
 * Converts a Date object to a UTC date string in the format YYYY-MM-DD.
 * @param date - The Date object to convert.
 * @returns A string representing the UTC date in YYYY-MM-DD format.
 */
export function DateToUTCDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Parses a UTC date string (YYYY-MM-DD) back into a Date object.
 * @param dateString - A string in the format YYYY-MM-DD.
 * @returns A Date object representing the input date in UTC.
 */
export function UTCDateToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day)); // Months are zero-based
}

/**
 * Checks if a date is within a specified range.
 * @param date - The Date object to check.
 * @param from - The start of the range (inclusive).
 * @param to - The end of the range (inclusive).
 * @returns True if the date is within the range, otherwise false.
 */
export function isDateInRange(date: Date, from: Date, to: Date): boolean {
    return date >= from && date <= to;
}

/**
 * Formats a Date object into a human-readable string.
 * @param date - The Date object to format.
 * @returns A string representing the formatted date.
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
