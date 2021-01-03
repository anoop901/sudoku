import { Record, Set } from "immutable";

export default class SudokuLocation extends Record({
  row: 0,
  col: 0,
}) {
  get locationsInSameRow(): Set<SudokuLocation> {
    return Set(
      Array.from(
        { length: 9 },
        (_, i) => new SudokuLocation({ row: this.row, col: i })
      ).filter(({ col }) => col !== this.col)
    );
  }
  get locationsInSameCol(): Set<SudokuLocation> {
    return Set(
      Array.from(
        { length: 9 },
        (_, i) => new SudokuLocation({ row: i, col: this.col })
      ).filter(({ row }) => row !== this.row)
    );
  }
  get locationsInSameBox(): Set<SudokuLocation> {
    return Set(
      Array.from({ length: 3 }, (_, rowInBox) =>
        Array.from(
          { length: 3 },
          (_, colInBox) =>
            new SudokuLocation({
              row: rowInBox + Math.floor(this.row / 3) * 3,
              col: colInBox + Math.floor(this.col / 3) * 3,
            })
        )
      )
        .flat()
        .filter(({ row, col }) => this.row !== row || this.col !== col)
    );
  }
  get adjacentLocations(): Set<SudokuLocation> {
    return this.locationsInSameRow
      .union(this.locationsInSameCol)
      .union(this.locationsInSameBox);
  }

  get next(): SudokuLocation {
    if (this.col < 8) {
      return new SudokuLocation({ row: this.row, col: this.col + 1 });
    } else if (this.row < 8) {
      return new SudokuLocation({ row: this.row + 1, col: 0 });
    }
    return this;
  }
}

function* getAllRows(): Generator<Set<SudokuLocation>, void, void> {
  for (let row = 0; row < 9; row++) {
    yield Set(
      (function* () {
        for (let col = 0; col < 9; col++) {
          yield new SudokuLocation({ row, col });
        }
      })()
    );
  }
}

export function* getAllCols(): Generator<Set<SudokuLocation>, void, void> {
  for (let col = 0; col < 9; col++) {
    yield Set(
      (function* () {
        for (let row = 0; row < 9; row++) {
          yield new SudokuLocation({ row, col });
        }
      })()
    );
  }
}

export function* getAllBoxes(): Generator<Set<SudokuLocation>, void, void> {
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      yield Set(
        (function* () {
          for (let rowInBox = 0; rowInBox < 3; rowInBox++) {
            for (let colInBox = 0; colInBox < 3; colInBox++) {
              yield new SudokuLocation({
                row: boxRow * 3 + rowInBox,
                col: boxCol * 3 + colInBox,
              });
            }
          }
        })()
      );
    }
  }
}

export function* getAllGroups(): Generator<Set<SudokuLocation>, void, void> {
  yield* getAllRows();
  yield* getAllCols();
  yield* getAllBoxes();
}
