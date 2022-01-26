import { Price, CurrencyAmount } from './fractions';
/**
 * Represents a mint executed to the vault.
 */
export declare class Withdraw {
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly inputAmount: CurrencyAmount;
    /**
     * The output amount for the trade assuming no slippage.
     */
    readonly outputAmount: CurrencyAmount;
    /**
     * The price expressed in terms of output amount/input amount.
     */
    readonly executionPrice: Price;
    constructor(inputAmount: CurrencyAmount, outputAmount: CurrencyAmount);
    /**
     * Constructs a Mint object based on exact token minted amount
     * @param currencyAmountIn (PE)
     * @param price (base: PE, quote: USDT)
     * @returns
     */
    static exactIn(currencyAmountIn: CurrencyAmount, price: Price): Withdraw;
    /**
     * Constructs a Mint object based on exact token deposited amount
     * @param currencyAmountOut (PE)
     * @param _price (base: PE, quote: USDT)
     * @param markup
     * @returns
     */
    static exactOut(currencyAmountOut: CurrencyAmount, _price: Price): Withdraw;
}
