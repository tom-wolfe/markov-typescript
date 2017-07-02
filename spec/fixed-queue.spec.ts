import { FixedQueue } from "../src/fixed-queue";
import { WeightedDictionary } from "../src/weighted-dictionary";

describe("FixedQueue<T>", () => {
    describe("constructor", () => {
        it("Queue accepts maxSize", function () {
            const queue = new FixedQueue<string>(10);
            expect(queue.maxSize).toBe(10);
        });
    });
    describe("enqueue", () => {
        it("Never goes above maxSize", function () {
            const maxSize = 5;
            const queue = new FixedQueue<string>(maxSize);
            for (let x = 0; x < 100; x++) {
                queue.enqueue("new item");
                expect(queue.size()).toBeLessThanOrEqual(maxSize);
            }
        });
    });
});
