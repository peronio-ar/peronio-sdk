import { validateAndParseAddress } from './utils'
import { CurrencyAmount, Mint, Withdraw } from './entities'

const ZERO_HEX = '0x0'

function toHex(currencyAmount: CurrencyAmount) {
  return `0x${currencyAmount.raw.toString(16)}`
}

/**
 * Options for producing the arguments to send call to the Peronio contract.
 */
export interface MintOptions {
  /**
   * The account that should receive the output of the mint.
   */
  recipient: string
}

/**
 * Options for producing the arguments to send call to the Peronio contract.
 */
export interface WithdrawOptions {
  /**
   * The account that should receive the output of the mint.
   */
  recipient: string
}

/**
 * The parameters to use in the call to the Peronio Vault to execute a mint.
 */
export interface CallParameters {
  /**
   * The method to call on the Pancake Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

/**
 * Represents the Pancake Router, and has static methods for helping execute minting.
 */
export abstract class Minter {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given mint.
   * @param mint to produce call parameters for
   * @param options options for the call parameters
   */
  public static mintCallParameters(mint: Mint, options: MintOptions): CallParameters {
    const to: string = validateAndParseAddress(options.recipient)
    // const amountIn: string = toHex(mint.inputAmount)
    const amountIn: string = toHex(mint.inputAmount)
    const minReceive: string = mint.minReceive.toString() // Fix this

    return {
      methodName: 'mint',
      args: [to, amountIn, minReceive],
      value: ZERO_HEX
    }
  }

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given mint.
   * @param mint to produce call parameters for
   * @param options options for the call parameters
   */
  public static withdrawCallParameters(withdraw: Withdraw, options: WithdrawOptions): CallParameters {
    const to: string = validateAndParseAddress(options.recipient)
    const amountIn: string = toHex(withdraw.inputAmount)

    return {
      methodName: 'withdraw',
      args: [to, amountIn],
      value: ZERO_HEX
    }
  }
}
