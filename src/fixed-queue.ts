import * as Collections from "typescript-collections";

export class FixedQueue<T> extends Collections.Queue<T> {
    public maxSize = 0;

    constructor(maxSize: number) {
        super();
        this.maxSize = maxSize;
    }

    enqueue(elem: T): boolean {
        const val = super.enqueue(elem);
        this.enforceSize();
        return val;
    }

    add(elem: T): boolean {
        const val = super.add(elem);
        this.enforceSize();
        return val;
    }

    protected enforceSize() {
        while (this.size() > this.maxSize) { this.dequeue(); }
    }
};
