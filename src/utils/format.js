export function getCurrentYear() {
  try {
    return new Date().getFullYear();
  } catch (error) {
    console.error('getCurrentYear error:', error);
    return 2026;
  }
}

export function clamp(n, min, max) {
  try {
    return Math.min(max, Math.max(min, n));
  } catch (error) {
    console.error('clamp error:', error);
    return n;
  }
}