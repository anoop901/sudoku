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

  solve(): Sudoku {
    throw new Error("not implemented");
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
