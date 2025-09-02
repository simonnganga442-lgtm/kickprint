// localStorageHelpers.js
export function setItemWithExpiry(key, value, ttlDays = 30) {
  const now = new Date();
  const expiry = now.getTime() + ttlDays * 24 * 60 * 60 * 1000;

  const item = { value, expiry };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  try {
    const item = JSON.parse(itemStr);
    if (new Date().getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (e) {
    console.error("Error reading localStorage item:", e);
    return null;
  }
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
