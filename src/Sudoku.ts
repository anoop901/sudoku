import { List, Set } from "immutable";

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

  get possibilities(): List<List<Set<number>>> {
    throw new Error("not implemented");
  }

  solve(): Sudoku {
    throw new Error("not implemented");
  }
}
