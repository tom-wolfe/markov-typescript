import * as Collections from "typescript-collections";

import { ChainState } from "./chain-state";
import { WeightedDictionary } from "./weighted-dictionary";

export class MarkovChainItems<T> extends Collections.Dictionary<ChainState<T>, WeightedDictionary<T>> {
    getOrCreateValue(key: ChainState<T>, createValue: () => WeightedDictionary<T>) {
        if (!this.containsKey(key)) {
            this.setValue(key, createValue());
        }
        return this.getValue(key);
    }
};
