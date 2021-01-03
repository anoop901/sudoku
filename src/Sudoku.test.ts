import { List } from "immutable";
import Sudoku from "./Sudoku";

describe("constructor", () => {
  test("with correct values size", () => {
    expect(
      () =>
        new Sudoku(
          List([
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
          ])
        )
    ).not.toThrowError(
      "failed to construct Sudoku: values must be a 9x9 array"
    );
  });
  test("with bad values size", () => {
    expect(
      () => new Sudoku(List([List([1, 2, 3]), List([1, 2, 3])]))
    ).toThrowError("failed to construct Sudoku: values must be a 9x9 array");
  });
  test("with bad values size 2", () => {
    expect(
      () =>
        new Sudoku(
          List([
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
          ])
        )
    ).toThrowError("failed to construct Sudoku: values must be a 9x9 array");
  });
  test("with bad values size 3", () => {
    expect(
      () =>
        new Sudoku(
          List([
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3, 4, 5, 6, 7, 8, 9]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
            List([1, 2, 3]),
          ])
        )
    ).toThrowError("failed to construct Sudoku: values must be a 9x9 array");
  });
});
