export function formatMessageDate(date) {
  const timeFormat = new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Check if the date is today
  if (isToday(new Date(date))) {
    return timeFormat;
  }
  const dayAndTimeFormat = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Check if the date is this week
  if (isThisWeek(new Date(date))) {
    return `${dayAndTimeFormat} ${timeFormat}`;
  } else {
    // Format the date to "MM:DD:YYYY" if not this week
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const dateFormat = new Date(date).toLocaleDateString("en-US", options);
    return `${timeFormat} ${dateFormat}`;
  }
}

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(date) {
  const today = new Date();
  const startOfWeek = new Date(today.getDate() - (today.getDay() || 7) + 1);
  return date >= startOfWeek && date <= today;
}
