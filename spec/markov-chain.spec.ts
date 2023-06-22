import { MarkovChain } from "../src/markov-chain";
import { ExposedMarkovChain } from "./helpers/exposed-markov-chain";
import {describe, it, expect} from 'vitest'
describe("MarkovChain<T>", () => {
    describe("constructor", () => {
        it("Order parameter should be passed in constructor", function () {
            const order = 4;
            const chain = new MarkovChain<string>(order);
            expect(chain.order).toBe(order);
        });
        it("Throws if order is less than 0", function () {
            expect(() => {
                const chain = new MarkovChain<string>(-1);
            }).toThrow();
        });
        it("Data should be empty upon construction", function () {
            const chain = new ExposedMarkovChain<string>(2);
            expect(chain.getItems()).toBeTruthy();
            expect(chain.getItems().size()).toBe(0);
            expect(chain.getTerminals()).toBeTruthy();
            expect(chain.getTerminals().size()).toBe(0);
        });
    });

    describe("learn", () => {
        it("Does not throw on null", function () {
            const chain = new MarkovChain<string>(2);
            expect(() => { chain.learn(null); }).not.toThrow();
        });
        it("Does not throw on empty list", function () {
            const chain = new MarkovChain<string>(2);
            expect(() => { chain.learn([]); }).not.toThrow();
        });
        it("Does not add data on null", function () {
            const chain = new ExposedMarkovChain<string>(2);
            chain.learn(null);
            expect(chain.getItems().size()).toBe(0);
            expect(chain.getTerminals().size()).toBe(0);
        });
        it("One entry for each distinct word", function () {
            const input = "the quick brown fox".split(" ");
            const chain = new ExposedMarkovChain<string>(2);
            chain.learn(input);
            // Check that it tracks correctly.
            expect(chain.getItems().size()).toBe(4);
            expect(chain.getTerminals().size()).toBe(1);
        });

        it("learn", function () {
            const chain = new MarkovChain<string>(2);
            chain.learn("the quick brown fox jumped over the lazy dog".split(" "));
            chain.learn("the quick brown dog jumped over the lazy cat".split(" "));
            chain.learn("the quick brown cat jumped over the lazy fox".split(" "));
            expect(() => {
                for (let x = 0; x < 10; x++) {
                    console.log(chain.walk().join(" "));
                }
            }).not.toThrow();
        })
    });
    describe("learnAll", () => {
        it("face", function () {
            const chain = new MarkovChain<string>(2);
            const input = [
                "the quick brown fox jumped over the lazy dog".split(" "),
                "the quick brown dog jumped over the lazy cat".split(" "),
                "the quick brown cat jumped over the lazy fox".split(" ")
            ]
            expect(() => chain.learnAll(input)).not.toThrow();
        });
    });
});
