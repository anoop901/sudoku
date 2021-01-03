import { List, Set } from "immutable";
import SudokuLocation from "./SudokuLocation";

export default class Sudoku {
  constructor(private readonly values: List<List<number | null>>) {
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

  valueAtLocation(location: SudokuLocation): number | null {
    return this.values.get(location.row)?.get(location.col) ?? null;
  }

  solveStep(): Sudoku {
    const newValues = List(
      Array.from({ length: 9 }, (_, row) =>
        List(
          Array.from({ length: 9 }, (_, col) => {
            const location = new SudokuLocation({ row, col });
            const value = this.valueAtLocation(location);
            if (value !== null) {
              return value;
            }
            const possibilities = this.possibleValuesAtLocation(location);
            if (possibilities.size === 0) {
              throw new Error("failed to solve Sudoku: no solution exists");
            }
            if (possibilities.size === 1) {
              return possibilities.toArray()[0];
            }
            return null;
          })
        )
      )
    );
    return new Sudoku(newValues);
  }

  possibleValuesAtLocation(location: SudokuLocation): Set<number> {
    return Set(Array.from({ length: 9 }, (_, i) => i + 1)).subtract(
      location.adjacentLocations.flatMap((adjacentLocation) => {
        const value = this.valueAtLocation(adjacentLocation);
        return value !== null ? [value] : [];
      })
    );
  }
}
