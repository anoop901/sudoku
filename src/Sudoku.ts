import { List, Set } from "immutable";
import SudokuLocation, { getAllGroups } from "./SudokuLocation";

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
    let previousStep: Sudoku = this;
    do {
      const currentStep = previousStep.solveStep();
      if (currentStep.complete || currentStep.equals(previousStep)) {
        return currentStep;
      }
      previousStep = currentStep;
    } while (true);
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
