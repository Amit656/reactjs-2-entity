export function capitalizeFirstChar(val) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}

export function parseCamelCase(val) {
  return val
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  return new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })} @ ${date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
}

export function formatDateLong(date) {
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });
}

export function trimDateFromISODate(date) {
  return date.toISOString().substr(0, 7);
}
