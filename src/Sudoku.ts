import { List } from "immutable";

export default class Sudoku {
  constructor(public readonly values: List<List<number | null>>) {
    if (values.size !== 9) {
      throw new Error("failed to construct Sudoku: values must be a 9x9 array");
    }
    for (const valuesRow of values) {
      if (valuesRow.size !== 9) {
        throw new Error(
          "failed to construct Sudoku: values must be a 9x9 array"
        );
      }
    }
  }
}
