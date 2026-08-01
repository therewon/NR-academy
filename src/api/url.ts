const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5287/api';

export function resolveApiAssetUrl(path?: string | null) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const apiOrigin = new URL(apiBaseUrl, window.location.origin).origin;
  return new URL(path.replace(/^\//, ''), `${apiOrigin}/`).toString();
}
