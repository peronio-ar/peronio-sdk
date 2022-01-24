import { CurrencyAmount } from './fractions/currencyAmount';
import { Price } from './fractions/price';
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
     *
     * @param inputAmount Underlying asset
     * @param outputAmount Token minted
     * @param feePercent Example 5. Represents 5%
     */
    constructor(inputAmount: CurrencyAmount, outputAmount: CurrencyAmount, feePercent: number);
    /**
     * Constructs an exact in trade with the given amount in and route
     * @param route route of the exact in trade
     * @param amountIn the amount being passed in
     */
    static exactIn(amountIn: CurrencyAmount): Mint;
    /**
     * Constructs an exact out trade with the given amount out and route
     * @param route route of the exact out trade
     * @param amountOut the amount returned by the trade
     */
    static exactOut(amountOut: CurrencyAmount): Mint;
}
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
}
