import { List, Set } from "immutable";
import SudokuLocation, {
  getAllGroups,
  getAllLocations,
} from "./SudokuLocation";

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

  setValueAtLocation(location: SudokuLocation, value: number): Sudoku {
    return new Sudoku(this.values.setIn([location.row, location.col], value));
  }

  clearValueAtLocation(location: SudokuLocation): Sudoku {
    return new Sudoku(this.values.setIn([location.row, location.col], null));
  }

  fillInLocationsWithOnePossibility(): Sudoku {
    let newSudoku: Sudoku = this;
    for (const location of getAllLocations()) {
      const value = this.valueAtLocation(location);
      if (value !== null) {
        continue;
      }
      const possibilities = this.possibleValuesAtLocation(location);
      if (possibilities.size === 0) {
        throw new Error("failed to solve Sudoku: no solution exists");
      }
      if (possibilities.size === 1) {
        const newValue = possibilities.toArray()[0];
        newSudoku = newSudoku.setValueAtLocation(location, newValue);
      }
    }
    return newSudoku;
  }

  equals(other: Sudoku): boolean {
    return this.values.equals(other.values);
  }

  get complete(): boolean {
    for (const rowValues of this.values) {
      for (const value of rowValues) {
        if (value === null) {
          return false;
        }
      }
    }
    return true;
  }

  solve(): Sudoku {
    let currentStep: Sudoku = this;
    while (true) {
      if (currentStep.complete) {
        return currentStep;
      }
      const nextStep = currentStep.fillInLocationsWithOnePossibility();
      if (nextStep.equals(currentStep)) {
        return currentStep;
      }
      currentStep = nextStep;
    }
  }

  possibleValuesAtLocation(location: SudokuLocation): Set<number> {
    return Set(Array.from({ length: 9 }, (_, i) => i + 1)).subtract(
      location.adjacentLocations.flatMap((adjacentLocation) => {
        const value = this.valueAtLocation(adjacentLocation);
        return value !== null ? [value] : [];
      })
    );
  }

  get valid(): boolean {
    for (const group of getAllGroups()) {
      let valuesSeen = Set<number>();
      for (const location of group) {
        const value = this.valueAtLocation(location);
        if (value !== null) {
          if (valuesSeen.has(value)) {
            return false;
          }
          valuesSeen = valuesSeen.add(value);
        }
      }
    }
    return true;
  }
}
