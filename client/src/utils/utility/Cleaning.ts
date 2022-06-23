export class Cleaning {
  constructor() {}

  /*
   * Formats a value to display to the user.
   */
  static cleanStringAmount = (amount: string): string => {
    const _amount = parseFloat(amount).toString();
    const whole = _amount.split('.')[0];
    const decimals = _amount.split('.')[1];

    // Only whole numbers
    if (!decimals || whole.length >= 5) return whole;

    // Ensure a min of 2 decimal places if decimals present
    if (decimals.length === 1) return `${whole}.${decimals}0`;

    // Reduce decimals to ensure that number accounts for less than 6 digits
    if (whole.length + decimals.length >= 6)
      return `${whole}.${decimals.slice(0, 6 - whole.length)}`;

    // Ensure whole number and decimal accounts for less than 6 digits
    if (decimals && decimals.length > 0) return `${whole}.${decimals}`;

    return '-1';
  };
}
