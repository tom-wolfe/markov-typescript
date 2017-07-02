import * as Collections from "typescript-collections";

import { ChainState } from "./chain-state";
import { FixedQueue } from "./fixed-queue";
import { MarkovChainItems } from "./markov-chain-items";
import { MarkovTerminalItems } from "./markov-terminal-items";
import * as utils from "./utils";
import { WeightedDictionary } from "./weighted-dictionary";

export class MarkovChain<T> {
    public readonly order: number;
    public readonly items: MarkovChainItems<T> = new MarkovChainItems<T>()
    public readonly terminals: MarkovTerminalItems<T> = new MarkovTerminalItems<T>();

    protected readonly toStrFunction: (key: T) => string;

    /**
     * Initializes a new instance of MarkovChain<T>.
     * @param order The number of state transitions to track within the model.
     * @param toStrFunction Optional function used to convert keys to strings.
     */
    constructor(order: number = 2, toStrFunction?: (key: T) => string) {
        if (order < 0) { throw new RangeError("Order must not be less than 0."); }
        this.order = order;
        this.toStrFunction = toStrFunction;
    }

    /**
     * Learns multiple sequences and their transitions.
     * @param items The list of sequences to learn.
     */
    learnAll(items: T[][]): void {
        items.forEach(item => this.learn(item));
    }

    /**
     * Learns a single sequence of elements.
     * @param items Lear
     */
    learn(items: T[]): void {
        if (!items || items.length === 0) { return; }

        const previous: FixedQueue<T> = new FixedQueue<T>(this.order);
        items.forEach(item => {
            const key = new ChainState(previous);
            this.learnWithPrevious(key, item);
            previous.enqueue(item);
        });

        const terminalKey = new ChainState(previous);
        this.terminals.incrementValue(terminalKey, 1);
    }

    private learnWithPrevious(previous: ChainState<T>, next: T): void {
        const weights = this.items.getOrCreateValue(previous, () => new WeightedDictionary<T>(this.toStrFunction));
        weights.incrementValue(next, 1);
    }

    /**
     * Walks the model from the beginning.
     */
    walk(): T[] {
        return this.walkWithPrevious([]);
    }

    /**
     * Walks the model, starting with the preceeding state.
     * @param previous The previous state with which to begin.
     */
    walkWithPrevious(previous: T[]): T[] {
        const retVal: T[] = new Array();
        const state: FixedQueue<T> = new FixedQueue<T>(this.order);
        previous.forEach(x => state.add(x));

        while (true) {
            const key = new ChainState(state);
            if (!this.items.containsKey(key)) { break; }

            const weights: WeightedDictionary<T> = this.items.getValue(key);
            let terminalWeight = 0;
            if (this.terminals.containsKey(key)) {
                terminalWeight = this.terminals.getValue(key);
            }

            const value = utils.randomNumberBetween(1, weights.totalWeight + terminalWeight);

            // Represents a terminal.
            if (value > weights.totalWeight) { break; }

            // Get the value that corresponds to.
            let currentWeight = 0;
            weights.forEach((k, v) => {
                currentWeight += v;
                if (currentWeight >= value) {
                    retVal.push(k);
                    state.enqueue(k);
                    return false;
                }
                return true;
            });
        }

        return retVal;
    }
};
