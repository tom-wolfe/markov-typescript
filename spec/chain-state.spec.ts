import { ChainState } from "../src/";
import * as Collections from "typescript-collections";
import * as Helpers from "./helpers";
import {describe, it, expect} from 'vitest'
describe("ChainState<T>", () => {
    function makeNameQueue(): Collections.Queue<string> {
        const names: Collections.Queue<string> = new Collections.Queue<string>();
        names.enqueue("jim");
        names.enqueue("george");
        names.enqueue("bob");
        names.enqueue("fred");
        return names;
    }

    function makePersonQueue(): Collections.Queue<Helpers.Person> {
        const people: Collections.Queue<Helpers.Person> = new Collections.Queue<Helpers.Person>();
        people.enqueue(new Helpers.Person("jim", 20));
        people.enqueue(new Helpers.Person("george", 18));
        people.enqueue(new Helpers.Person("bob", 25));
        people.enqueue(new Helpers.Person("fred", 46));
        return people;
    }

    describe("constructor", () => {
        it("Should be same length as input", function () {
            expect(() => {
                const chain = new ChainState(null);
            }).toThrow();
        });
        it("Should be same length as input", function () {
            const names = makeNameQueue();
            const chain = new ChainState(names);
            expect(chain.items.length).toEqual(names.size());
        });
        it("Should have same elements as input", function () {
            const names = makeNameQueue();
            const chain = new ChainState(names);
            for (let x = 0; x < chain.items.length; x++) {
                expect(chain.items[x]).toBe(names.dequeue());
            }
        });
    });

    describe("equals", () => {
        it("Should be same with equal strings", function () {
            const names1 = makeNameQueue();
            const names2 = new Collections.Queue<string>();
            names1.forEach(name => {
                names2.enqueue(name);
            });

            const chain1 = new ChainState<string>(names1);
            const chain2 = new ChainState<string>(names2);

            expect(chain1.equals(chain2)).toBe(true);
        });

        it("Should be same based on values not references", function () {
            const people1 = makePersonQueue();
            const people2 = makePersonQueue();

            const chain1 = new ChainState<Helpers.Person>(people1);
            const chain2 = new ChainState<Helpers.Person>(people2);

            expect(chain1.equals(chain2)).toBe(true);
        });

        it("Changing object field renders unequal", function () {
            const people1 = makePersonQueue();
            const people2 = makePersonQueue();
            people2.forEach(p => {
                p.age = 30;
            });

            const chain1 = new ChainState<Helpers.Person>(people1);
            const chain2 = new ChainState<Helpers.Person>(people2);

            expect(chain1.equals(chain2)).toBe(false);
        });

        it("Changing array length renders unequal", function () {
            const people1 = makePersonQueue();
            const people2 = makePersonQueue();
            people2.enqueue(new Helpers.Person("tom", 27));

            const chain1 = new ChainState<Helpers.Person>(people1);
            const chain2 = new ChainState<Helpers.Person>(people2);

            expect(chain1.equals(chain2)).toBe(false);
        });
    });
});
