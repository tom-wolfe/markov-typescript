import { MarkovChain } from "../../src/markov-chain";
import { MarkovChainItems } from "../../src/markov-chain-items";
import { MarkovTerminalItems } from "../../src/markov-terminal-items";

export class ExposedMarkovChain<T> extends MarkovChain<T> {
    public getItems(): MarkovChainItems<T> {
        return this.items;
    }

    public getTerminals(): MarkovTerminalItems<T> {
        return this.terminals;
    }
};
