/*
 * Enum defintions for all crypto tickers.
 */
export enum ECrypto {
  // AUR = 'AUR',
  // BCH = 'BCH',
  BTC = 'BTC',
  // DASH = 'DASH',
  DOGE = 'DOGE',
  // ETC = 'ETC',
  ETH = 'ETH',
  // GRC = 'GRC',
  // LTC = 'LTC',
  // MZC = 'MZC',
  // Nano = 'Nano',
  // NEO = 'NEO',
  // NMC = 'NMC',
  // NXT = 'NXT',
  // POT = 'POT',
  // PPC = 'PPC',
  // TIT = 'TIT',
  USDC = 'USDC',
  USDT = 'USDT',
  XLM = 'XLM',
  // XMR = 'XMR',
  // XRP = 'XRP',
}

/*
 * Map of tickers with the crypto names.
 */
export const Crypto: { [key in ECrypto]: string } = {
  // [ECrypto.AUR]: 'Auroracoin',
  // [ECrypto.BCH]: 'Bitcoin Cash',
  [ECrypto.BTC]: 'Bitcoin',
  // [ECrypto.DASH]: 'Dash',
  [ECrypto.DOGE]: 'Dogecoin',
  // [ECrypto.ETC]: 'Ethereum Classic',
  [ECrypto.ETH]: 'Ethereum',
  // [ECrypto.GRC]: 'Gridcoin',
  // [ECrypto.LTC]: 'Litecoin',
  // [ECrypto.MZC]: 'Mazacoin',
  // [ECrypto.Nano]: 'Nano',
  // [ECrypto.NEO]: 'Neo',
  // [ECrypto.NMC]: 'Namecoin',
  // [ECrypto.NXT]: 'NXT',
  // [ECrypto.POT]: 'PotCoin',
  // [ECrypto.PPC]: 'Peercoin',
  // [ECrypto.TIT]: 'Titcoin',
  [ECrypto.USDC]: 'USD Coin (stablecoin)',
  [ECrypto.USDT]: 'Tether (stablecoin)',
  [ECrypto.XLM]: 'Stellar',
  // [ECrypto.XMR]: 'Monero',
  // [ECrypto.XRP]: 'Ripple',
};
