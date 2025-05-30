import { parseISO, isBefore, format } from 'date-fns';

export default function parseSessionDate(isoDateString) {
  const sessionDateTime = parseISO(isoDateString);
  const now = new Date();

  return {
    isExpired: isBefore(sessionDateTime, now),
    formattedDate: format(sessionDateTime, 'yyyy-MM-dd'),
    formattedTime: format(sessionDateTime, 'hh:mm a'),
    weekday: format(sessionDateTime, 'EEEE'),
  };
}
