import * as Collections from "typescript-collections";

export class WeightedDictionary<T> extends Collections.Dictionary<T, number> {
    private _totalWeight = 0;

    constructor(toStrFunction?: (key: T) => string) {
        super(toStrFunction);
    }

    get totalWeight(): number {
        return this._totalWeight;
    }

    setValue(key: T, value: number): number {
        const prevVal = super.setValue(key, value);
        if (prevVal) { this._totalWeight -= prevVal; }
        if (value) { this._totalWeight += value; }
        return prevVal;
    }

    incrementValue(key: T, value: number): number {
        let newWeight = value;
        if (this.containsKey(key)) {
            newWeight += this.getValue(key);
        };
        return this.setValue(key, newWeight);
    }

    remove(key: T): number {
        const val = super.remove(key);
        if (val) { this._totalWeight -= val; }
        return val;
    }
};
