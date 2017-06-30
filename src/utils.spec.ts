import * as utils from "./utils";

describe("Utils", () => {
    describe("randomNumberBetween", () => {
        it("Should always be between min and max", function () {
            for (let x = 0; x < 1000; x++) {
                const num = utils.randomNumberBetween(1, 10);
                expect(num).toBeGreaterThanOrEqual(1);
                expect(num).toBeLessThanOrEqual(10);
            }
        });

        it("Should be bound inclusive", function () {
            for (let x = 0; x < 1000; x++) {
                const num = utils.randomNumberBetween(5, 5);
                expect(num).toBeGreaterThanOrEqual(5);
                expect(num).toBeLessThanOrEqual(5);
            }
        });
    });
});
