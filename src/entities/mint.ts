/* eslint-disable lines-between-class-members */
import JSBI from 'jsbi'
import { Price, Percent, CurrencyAmount } from './fractions'

/**
 * Represents a mint executed to the vault.
 */
export class Mint {
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

  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly feeAmount: number

  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly markup: Percent

  /**
   *
   * @param inputAmount Underlying asset
   * @param outputAmount Token minted
   * @param markupPercent Example 5. Represents 5%
   */
  public constructor(inputAmount: CurrencyAmount, outputAmount: CurrencyAmount, markupPercent: Percent) {
    this.inputAmount = inputAmount
    this.outputAmount = outputAmount

    this.markup = markupPercent
    // new CurrencyAmount(inputAmount.currency, inputAmount.multiply()
    const amount = JSBI.toNumber(inputAmount.raw)
    const markupPercentFixed = parseFloat(markupPercent.toFixed(6)) / 100

    this.feeAmount = (amount - amount / (1 + markupPercentFixed)) / 1000000
    // this.feeAmount = (amount - amount / (1 + markupPercentFixed)) / 1000000

    this.executionPrice = new Price(
      this.inputAmount.currency,
      this.outputAmount.currency,
      this.inputAmount.raw,
      this.outputAmount.raw
    )
  }

  /**
   * Constructs a Mint object based on exact token minted amount
   * @param currencyAmountIn (USDT)
   * @param price (base: PE, quote: USDT)
   * @param markup
   * @returns
   */
  public static exactIn(currencyAmountIn: CurrencyAmount, price: Price, markup: Percent): Mint {
    if (price.quoteCurrency !== currencyAmountIn.currency) {
      throw new Error(`currencyAmountOut does\'t match Price.baseCurrency`)
    }

    const currencyAmountOut = price.quote(currencyAmountIn)
    return new Mint(currencyAmountIn, currencyAmountOut, markup)
  }

  /**
   * Constructs a Mint object based on exact token deposited amount
   * @param currencyAmountOut (PE)
   * @param _price (base: PE, quote: USDT)
   * @param markup
   * @returns
   */
  public static exactOut(currencyAmountOut: CurrencyAmount, _price: Price, markup: Percent): Mint {
    const price = _price.invert() // Price now (base: USDT, quote: PE)
    if (price.quoteCurrency !== currencyAmountOut.currency) {
      throw new Error(`currencyAmountOut does\'t match Price.baseCurrency`)
    }

    const currencyAmountIn = price.quote(currencyAmountOut)
    return new Mint(currencyAmountIn, currencyAmountOut, markup)
  }
}

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
}
// .subtract(inputAmount.divide(100 + feePercent) / 1))
