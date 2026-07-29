import worldCountries from 'world-countries';

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: CountryOption[] = worldCountries
  .map(c => ({ code: c.cca2, name: c.name.common, flag: c.flag }))
  .sort((a, b) => a.name.localeCompare(b.name));

const COUNTRIES_BY_CODE = new Map(COUNTRIES.map(c => [c.code, c]));

export function getCountryByCode(code?: string | null): CountryOption | undefined {
  if (!code) return undefined;
  return COUNTRIES_BY_CODE.get(code);
}
