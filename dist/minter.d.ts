import { Mint, Withdraw } from './entities';
/**
 * Options for producing the arguments to send call to the Peronio contract.
 */
export interface MintOptions {
    /**
     * The account that should receive the output of the mint.
     */
    recipient: string;
}
/**
 * Options for producing the arguments to send call to the Peronio contract.
 */
export interface WithdrawOptions {
    /**
     * The account that should receive the output of the mint.
     */
    recipient: string;
}
/**
 * The parameters to use in the call to the Peronio Vault to execute a mint.
 */
export interface CallParameters {
    /**
     * The method to call on the Pancake Router.
     */
    methodName: string;
    /**
     * The arguments to pass to the method, all hex encoded.
     */
    args: (string | string[])[];
    /**
     * The amount of wei to send in hex.
     */
    value: string;
}
/**
 * Represents the Pancake Router, and has static methods for helping execute minting.
 */
export declare abstract class Minter {
    /**
     * Cannot be constructed.
     */
    private constructor();
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given mint.
     * @param mint to produce call parameters for
     * @param options options for the call parameters
     */
    static mintCallParameters(mint: Mint, options: MintOptions): CallParameters;
    /**
     * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given mint.
     * @param mint to produce call parameters for
     * @param options options for the call parameters
     */
    static withdrawCallParameters(withdraw: Withdraw, options: WithdrawOptions): CallParameters;
}
