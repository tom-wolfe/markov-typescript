import * as Collections from "typescript-collections";

export class ChainState<T> {
    public readonly items: T[];

    constructor(items: Collections.Queue<T>) {
        if (!items) {
            throw new ReferenceError("Items cannot be null.");
        }
        const arr: T[] = new Array();
        items.forEach(i => { arr.push(i); return true; });
        this.items = arr;
    }

    equals(other: ChainState<T>): boolean {
        if (!other) { return false; }
        if (this.items.length !== other.items.length) {
            return false;
        }

        for (let x = 0; x < this.items.length; x++) {
            const left = this.items[x], right = other.items[x];
            if (left === right) { continue; }
            if (Collections.util.makeString(left) !== Collections.util.makeString(right)) {
                return false;
            }
        }

        return true;
    }

    toString(): string {
        return Collections.util.makeString(this.items);
    }
};
