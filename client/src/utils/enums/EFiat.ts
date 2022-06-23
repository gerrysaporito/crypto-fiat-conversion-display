/*
 * Enum defintions for all fiat currency symbols.
 */
export enum EFiat {
  // AUD = 'AUD',
  GBP = 'GBP',
  EUR = 'EUR',
  JPY = 'JPY',
  USD = 'USD',
  CAD = 'CAD',
  // CNY = 'CNY',
  // INR = 'INR',
  // RUB = 'RUB',
}

/*
 * Map of symbols with the fiat currency names.
 */
export const Fiat: { [key in EFiat]: string } = {
  // [EFiat.AUD]: 'Australia Dollar',
  [EFiat.GBP]: 'Great Britain Pound',
  [EFiat.EUR]: 'Euro',
  [EFiat.JPY]: 'Japan Yen',
  [EFiat.USD]: 'USA Dollar',
  [EFiat.CAD]: 'Canada Dollar',
  // [EFiat.CNY]: 'China Yuan/Renminbi',
  // [EFiat.INR]: 'India Rupee',
  // [EFiat.RUB]: 'Russia Rouble',
};
