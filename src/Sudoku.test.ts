import { List, Set } from "immutable";
import Sudoku from "./Sudoku";
import SudokuLocation from "./SudokuLocation";

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
describe("possibleValuesAtLocation", () => {
  test("multiple possibilities", () => {
    const _ = null;
    const sudoku = new Sudoku(
      List([
        ...[
          List([...[_, _, _], ...[_, _, 8], ...[3, 5, 4]]),
          List([...[7, _, _], ...[6, _, 2], ...[8, 1, _]]),
          List([...[_, _, _], ...[9, _, _], ...[7, _, 2]]),
        ],
        ...[
          List([...[_, 5, 8], ...[7, _, 4], ...[_, _, _]]),
          List([...[4, 3, 2], ...[5, 1, _], ...[6, 7, 8]]),
          List([...[_, 1, _], ...[_, _, 6], ...[_, _, 5]]),
        ],
        ...[
          List([...[8, 6, _], ...[_, 3, _], ...[_, _, _]]),
          List([...[3, _, _], ...[_, 9, 5], ...[1, 2, _]]),
          List([...[_, _, 9], ...[_, _, 7], ...[_, 8, _]]),
        ],
      ])
    );
    const possibleValues = sudoku.possibleValuesAtLocation(
      new SudokuLocation({ row: 5, col: 4 })
    );
    expect(possibleValues).toEqual(Set([2, 8]));
  });
  test("single possibility", () => {
    const _ = null;
    const sudoku = new Sudoku(
      List([
        ...[
          List([...[_, _, _], ...[_, _, 8], ...[3, 5, 4]]),
          List([...[7, _, _], ...[6, _, 2], ...[8, 1, _]]),
          List([...[_, _, _], ...[9, _, _], ...[7, _, 2]]),
        ],
        ...[
          List([...[_, 5, 8], ...[7, _, 4], ...[_, _, _]]),
          List([...[4, 3, 2], ...[5, 1, _], ...[6, 7, 8]]),
          List([...[_, 1, _], ...[_, _, 6], ...[_, _, 5]]),
        ],
        ...[
          List([...[8, 6, _], ...[_, 3, _], ...[_, _, _]]),
          List([...[3, _, _], ...[_, 9, 5], ...[1, 2, _]]),
          List([...[_, _, 9], ...[_, _, 7], ...[_, 8, _]]),
        ],
      ])
    );
    const possibleValues = sudoku.possibleValuesAtLocation(
      new SudokuLocation({ row: 4, col: 5 })
    );
    expect(possibleValues).toEqual(Set([9]));
  });
});
