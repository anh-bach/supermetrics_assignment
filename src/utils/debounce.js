export function debounce(func, delay = 5000) {
  let timeoutID;
  return function (...args) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
