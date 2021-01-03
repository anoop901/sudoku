export default class Sudoku {
  constructor(public readonly values: (number | null)[][]) {
    if (values.length !== 9) {
      throw new Error("failed to construct Sudoku: values must be a 9x9 array");
    }
    for (const valuesRow of values) {
      if (valuesRow.length !== 9) {
        throw new Error(
          "failed to construct Sudoku: values must be a 9x9 array"
        );
      }
    }
  }
}
