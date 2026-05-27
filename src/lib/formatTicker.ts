export function formatTicker(name: string): string {
  const initials = name.split(/\s+/).map(w => w[0] ?? '').join('').toUpperCase();
  return initials.slice(0, 4) || name.slice(0, 3).toUpperCase();
}
