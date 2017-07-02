import { ChainState } from "../src/chain-state";
import { MarkovChainItems } from "../src/markov-chain-items";

describe("MarkovChainItems<T>", () => {
    describe("getOrCreateValue", () => {
        it("Adds new instance if key does not exist", function () {
            const items = new MarkovChainItems<string>();
            const state = new ChainState<string>([]);
            const val = items.getOrCreateValue(state, () => null);
            expect(items.size()).toBe(1);
        });
        it("Calls new instance function if key does not exist", function () {
            const items = new MarkovChainItems<string>();
            const state = new ChainState<string>([]);
            let counter = 0;
            const val = items.getOrCreateValue(state, () => { counter++; return null; });
            expect(counter).toBe(1);
        });
        it("Doesn't add new instance if key exists", function () {
            const items = new MarkovChainItems<string>();
            const state = new ChainState<string>([]);
            let counter = 0;
            items.setValue(state, null);
            const val = items.getOrCreateValue(state, () => { counter++; return null; });
            expect(items.size()).toBe(1);
        });
        it("Doesn't call new instance function if key does not exist", function () {
            const items = new MarkovChainItems<string>();
            const state = new ChainState<string>([]);
            let counter = 0;
            items.setValue(state, null);
            const val = items.getOrCreateValue(state, () => { counter++; return null; });
            expect(counter).toBe(0);
        });
    });
});
