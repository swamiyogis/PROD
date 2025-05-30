// types/session.js
export const parseSession = (session) => ({
  sessionId: session.sessionId || '',
  sessionHeading: session.sessionHeading || '',
  date: session.date || '',
  time: session.time || '',
  timezone: session.timezone || '',
  instructor: session.instructor || '',
  amount: session.amount || 0,
  description: session.description || '',
  notes: session.notes || '',
  seatsRemaining: session.seatsRemaining || 0,
  totalSeats: session.totalSeats || 0,
});
