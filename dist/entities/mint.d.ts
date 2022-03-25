import { Price, Percent, CurrencyAmount } from './fractions';
/**
 * Represents a mint executed to the vault.
 */
export declare class Mint {
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
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly feeAmount: number;
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly minReceive: number;
    /**
     * The input amount for the trade assuming no slippage.
     */
    readonly markup: Percent;
    /**
     *
     * @param inputAmount Underlying asset
     * @param outputAmount Token minted
     * @param markupPercent Example 5. Represents 5%
     */
    constructor(inputAmount: CurrencyAmount, outputAmount: CurrencyAmount, markupPercent: Percent);
    /**
     * Constructs a Mint object based on exact token minted amount
     * @param currencyAmountIn (USDT)
     * @param price (base: PE, quote: USDT)
     * @param markup
     * @returns
     */
    static exactIn(currencyAmountIn: CurrencyAmount, price: Price, markup: Percent): Mint;
    /**
     * Constructs a Mint object based on exact token deposited amount
     * @param currencyAmountOut (PE)
     * @param _price (base: PE, quote: USDT)
     * @param markup
     * @returns
     */
    static exactOut(currencyAmountOut: CurrencyAmount, _price: Price, markup: Percent): Mint;
}
