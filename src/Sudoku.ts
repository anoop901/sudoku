import chain from "@anoop901/js-util/chain";
import allIntegersStartingAt from "@anoop901/js-util/iterables/allIntegersStartingAt";
import take from "@anoop901/js-util/iterables/take";
import anyMatch from "@anoop901/js-util/iterables/anyMatch";
import map from "@anoop901/js-util/iterables/map";
import fold from "@anoop901/js-util/iterables/fold";
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
    return chain(location.adjacentLocations)
      .then(map((location) => this.valueAtLocation(location)))
      .then(
        fold(
          Set(chain(allIntegersStartingAt(1)).then(take(9)).end()),
          (possibleValues, adjacentValue) =>
            adjacentValue == null
              ? possibleValues
              : possibleValues.remove(adjacentValue)
        )
      )
      .end();
  }

  isValuePossibleAtLocation(value: number, location: SudokuLocation): boolean {
    return chain(location.adjacentLocations)
      .then(map((location) => this.valueAtLocation(location)))
      .then(anyMatch((adjacentValue) => adjacentValue === value))
      .then((x) => !x)
      .end();
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
