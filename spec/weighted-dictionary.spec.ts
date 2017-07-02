import { WeightedDictionary } from "../src/weighted-dictionary";

describe("WeightedDictionary<T>", () => {
    describe("constructor", () => {
        it("Empty dictionary has weight of zero", function () {
            const dict = new WeightedDictionary<string>();
            expect(dict.totalWeight).toBe(0);
        });
    });

    describe("setValue", () => {
        it("Adding new value increments weight", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test", 4);
            expect(dict.totalWeight).toBe(4);
        });
        it("Adding multiple values increments weight", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test1", 4);
            dict.setValue("test2", 2);
            dict.setValue("test3", 3);
            expect(dict.totalWeight).toBe(9);
        });
        it("Resetting existing value has correct weight", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test1", 4);
            dict.setValue("test2", 2);
            dict.setValue("test3", 3);

            dict.setValue("test1", 1);

            expect(dict.totalWeight).toBe(6);
        });
    });
    describe("incrementValue", () => {
        it("element weight increments", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test", 4);
            dict.incrementValue("test", 3);
            expect(dict.getValue("test")).toBe(7);
        });
        it("Total weight increments", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test1", 4);
            dict.setValue("test2", 2);
            dict.setValue("test3", 3);
            dict.incrementValue("test2", 5);
            expect(dict.totalWeight).toBe(14);
        });
    });
    describe("remove", () => {
        it("Removing value decrements weight", function () {
            const dict = new WeightedDictionary<string>();
            dict.setValue("test1", 4);
            dict.setValue("test2", 2);
            dict.setValue("test3", 3);
            dict.remove("test2");
            expect(dict.totalWeight).toBe(7);
        });
    });
    describe("toStrFunction", () => {
        it("setValue respects toStrFunction", function () {
            const dict = new WeightedDictionary<string>(k => k.toLowerCase());
            dict.setValue("TEST", 1);
            dict.setValue("test", 2);
            dict.setValue("teST", 3);
            expect(dict.size()).toBe(1);
        });
        it("getValue respects toStrFunction", function () {
            const dict = new WeightedDictionary<string>(k => k.toLowerCase());
            dict.setValue("TEST", 1);
            dict.setValue("test", 2);
            dict.setValue("teST", 3);
            expect(dict.getValue("TEst")).toBe(3);
        });
        it("remove respects toStrFunction", function () {
            const dict = new WeightedDictionary<string>(k => k.toLowerCase());
            dict.setValue("TEST", 1);
            dict.setValue("test", 2);
            dict.setValue("teST", 3);
            dict.remove("TEst");
            expect(dict.size()).toBe(0);
        });
        it("incrementValue respects toStrFunction", function () {
            const dict = new WeightedDictionary<string>(k => k.toLowerCase());
            dict.setValue("TEST", 1);
            dict.incrementValue("test", 2);
            dict.incrementValue("teST", 3);
            dict.incrementValue("TEst", 7);
            expect(dict.getValue("tESt")).toBe(13);
        });
    });
});
