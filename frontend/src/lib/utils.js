export function formatMessageDate(dateString) {
  const date = new Date(dateString);
  const timeFormat = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // Check if the date is today
  if (isToday(date)) {
    return timeFormat;
  }
  // Check if the date is this week
  if (isThisWeek(date)) {
    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    return `${weekday} ${timeFormat}`;
  }
  // Format the date to "MM:DD:YYYY" if not this week
  const dateFormat = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return `${timeFormat} ${dateFormat}`;
}

function isToday(date) {
  const today = new Date();
  return date.toDateString() === today.toDateString()
}

function isThisWeek(date) {
  const today = new Date();
  const startOfWeek = new Date(today)
  // Get the Monday of the current week
  startOfWeek.setDate(today.getDate() - (today.getDay() || 7) + 1)
  startOfWeek.setHours(0,0,0,0)
  return date >= startOfWeek && date <= today;
}
