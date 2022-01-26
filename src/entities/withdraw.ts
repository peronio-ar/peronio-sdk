/* eslint-disable lines-between-class-members */
import { Price, CurrencyAmount } from './fractions'

/**
 * Represents a mint executed to the vault.
 */
export class Withdraw {
  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly inputAmount: CurrencyAmount
  /**
   * The output amount for the trade assuming no slippage.
   */
  public readonly outputAmount: CurrencyAmount
  /**
   * The price expressed in terms of output amount/input amount.
   */
  public readonly executionPrice: Price

  public constructor(inputAmount: CurrencyAmount, outputAmount: CurrencyAmount) {
    this.inputAmount = inputAmount
    this.outputAmount = outputAmount
    this.executionPrice = new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.inputAmount.raw,
      this.outputAmount.raw
    )
  }

  /**
   * Constructs a Mint object based on exact token minted amount
   * @param currencyAmountIn (PE)
   * @param price (base: PE, quote: USDT)
   * @returns
   */
  public static exactIn(currencyAmountIn: CurrencyAmount, price: Price): Withdraw {
    if (price.baseCurrency !== currencyAmountIn.currency) {
      throw new Error(`currencyAmountOut does\'t match Price.baseCurrency`)
    }

    const currencyAmountOut = price.quote(currencyAmountIn)
    return new Withdraw(currencyAmountIn, currencyAmountOut)
  }

  /**
   * Constructs a Mint object based on exact token deposited amount
   * @param currencyAmountOut (PE)
   * @param _price (base: PE, quote: USDT)
   * @param markup
   * @returns
   */
  public static exactOut(currencyAmountOut: CurrencyAmount, _price: Price): Withdraw {
    const price = _price.invert() // Price now (base: USDT, quote: PE)
    if (price.quoteCurrency !== currencyAmountOut.currency) {
      throw new Error(`currencyAmountOut does\'t match Price.baseCurrency`)
    }

    const currencyAmountIn = price.quote(currencyAmountOut)
    return new Withdraw(currencyAmountIn, currencyAmountOut)
  }
}
