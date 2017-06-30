import { ChainState } from "../src/";
import * as Collections from "typescript-collections";
import * as Helpers from "./helpers";

describe("ChainState<T>", () => {
    describe("fromQueue", () => {
        function makeNameQueue(): Collections.Queue<string> {
            const names: Collections.Queue<string> = new Collections.Queue<string>();
            names.enqueue("jim");
            names.enqueue("george");
            names.enqueue("bob");
            names.enqueue("fred");
            return names;
        }

        it("Should be same length as input", function () {
            const names = makeNameQueue();
            const chain = ChainState.fromQueue(names);
            expect(chain.items.length).toEqual(names.size());
        });

        it("Should have same elements as input", function () {
            const names = makeNameQueue();
            const chain = ChainState.fromQueue(names);
            for (let x = 0; x < chain.items.length; x++) {
                expect(chain.items[x]).toBe(names.dequeue());
            }
        });
    });

    describe("constructor", () => {
        function makeNameArray(): string[] {
            return ["jim", "george", "bob", "fred"];
        }

        it("Should be same length as input", function () {
            const names = makeNameArray();
            const chain = new ChainState<string>(names);
            expect(chain.items.length).toEqual(names.length);
        });

        it("Should have same elements as input", function () {
            const names = makeNameArray();
            const chain = new ChainState<string>(names);
            for (let x = 0; x < names.length; x++) {
                expect(chain.items[x]).toBe(names[x]);
            }
        });
    });

    describe("equals", () => {
        function makeNameArray(): string[] {
            return ["jim", "george", "bob", "fred"];
        }

        function makePersonArray(): Helpers.Person[] {
            return [
                new Helpers.Person("jim", 20),
                new Helpers.Person("george", 18),
                new Helpers.Person("bob", 25),
                new Helpers.Person("fred", 46),
            ];
        }

        it("Should be same with equal strings", function () {
            const names1 = makeNameArray();
            const names2 = names1.slice(0);

            const chain1 = new ChainState<string>(names1);
            const chain2 = new ChainState<string>(names2);

            expect(chain1.equals(chain2)).toBe(true);
        });

        it("Should be same based on values not references", function () {
            const people1 = makePersonArray();
            const people2 = makePersonArray();

            const chain1 = new ChainState<Helpers.Person>(people1);
            const chain2 = new ChainState<Helpers.Person>(people2);

            expect(chain1.equals(chain2)).toBe(true);
        });
    });
});
