import SudokuLocation from "./SudokuLocation";
import { Set } from "immutable";

describe("locationsInSameRow", () => {
  test("row 4, col 2", () => {
    const location = new SudokuLocation({ row: 4, col: 2 });
    expect(location.locationsInSameRow).toEqual(
      Set([
        new SudokuLocation({ row: 4, col: 0 }),
        new SudokuLocation({ row: 4, col: 1 }),
        new SudokuLocation({ row: 4, col: 3 }),
        new SudokuLocation({ row: 4, col: 4 }),
        new SudokuLocation({ row: 4, col: 5 }),
        new SudokuLocation({ row: 4, col: 6 }),
        new SudokuLocation({ row: 4, col: 7 }),
        new SudokuLocation({ row: 4, col: 8 }),
      ])
    );
  });
});
describe("locationsInSameCol", () => {
  test("row 4, col 2", () => {
    const location = new SudokuLocation({ row: 4, col: 2 });
    expect(location.locationsInSameCol).toEqual(
      Set([
        new SudokuLocation({ row: 0, col: 2 }),
        new SudokuLocation({ row: 1, col: 2 }),
        new SudokuLocation({ row: 2, col: 2 }),
        new SudokuLocation({ row: 3, col: 2 }),
        new SudokuLocation({ row: 5, col: 2 }),
        new SudokuLocation({ row: 6, col: 2 }),
        new SudokuLocation({ row: 7, col: 2 }),
        new SudokuLocation({ row: 8, col: 2 }),
      ])
    );
  });
});
describe("locationsInSameBox", () => {
  test("row 4, col 2", () => {
    const location = new SudokuLocation({ row: 4, col: 2 });
    expect(location.locationsInSameBox).toEqual(
      Set([
        new SudokuLocation({ row: 3, col: 0 }),
        new SudokuLocation({ row: 3, col: 1 }),
        new SudokuLocation({ row: 3, col: 2 }),
        new SudokuLocation({ row: 4, col: 0 }),
        new SudokuLocation({ row: 4, col: 1 }),
        new SudokuLocation({ row: 5, col: 0 }),
        new SudokuLocation({ row: 5, col: 1 }),
        new SudokuLocation({ row: 5, col: 2 }),
      ])
    );
  });
  test("row 5, col 8", () => {
    const location = new SudokuLocation({ row: 5, col: 8 });
    expect(location.locationsInSameBox).toEqual(
      Set([
        new SudokuLocation({ row: 3, col: 6 }),
        new SudokuLocation({ row: 3, col: 7 }),
        new SudokuLocation({ row: 3, col: 8 }),
        new SudokuLocation({ row: 4, col: 6 }),
        new SudokuLocation({ row: 4, col: 7 }),
        new SudokuLocation({ row: 4, col: 8 }),
        new SudokuLocation({ row: 5, col: 6 }),
        new SudokuLocation({ row: 5, col: 7 }),
      ])
    );
  });
});

describe("adjacentLocations", () => {
  test("row 4, col 2", () => {
    const location = new SudokuLocation({ row: 4, col: 2 });
    expect(location.adjacentLocations).toEqual(
      Set([
        new SudokuLocation({ row: 4, col: 0 }),
        new SudokuLocation({ row: 4, col: 1 }),
        new SudokuLocation({ row: 4, col: 3 }),
        new SudokuLocation({ row: 4, col: 4 }),
        new SudokuLocation({ row: 4, col: 5 }),
        new SudokuLocation({ row: 4, col: 6 }),
        new SudokuLocation({ row: 4, col: 7 }),
        new SudokuLocation({ row: 4, col: 8 }),

        new SudokuLocation({ row: 0, col: 2 }),
        new SudokuLocation({ row: 1, col: 2 }),
        new SudokuLocation({ row: 2, col: 2 }),
        new SudokuLocation({ row: 3, col: 2 }),
        new SudokuLocation({ row: 5, col: 2 }),
        new SudokuLocation({ row: 6, col: 2 }),
        new SudokuLocation({ row: 7, col: 2 }),
        new SudokuLocation({ row: 8, col: 2 }),

        new SudokuLocation({ row: 3, col: 0 }),
        new SudokuLocation({ row: 3, col: 1 }),
        new SudokuLocation({ row: 5, col: 0 }),
        new SudokuLocation({ row: 5, col: 1 }),
      ])
    );
  });
  test("row 5, col 8", () => {
    const location = new SudokuLocation({ row: 5, col: 8 });
    expect(location.locationsInSameBox).toEqual(
      Set([
        new SudokuLocation({ row: 3, col: 6 }),
        new SudokuLocation({ row: 3, col: 7 }),
        new SudokuLocation({ row: 3, col: 8 }),
        new SudokuLocation({ row: 4, col: 6 }),
        new SudokuLocation({ row: 4, col: 7 }),
        new SudokuLocation({ row: 4, col: 8 }),
        new SudokuLocation({ row: 5, col: 6 }),
        new SudokuLocation({ row: 5, col: 7 }),
      ])
    );
  });
});
