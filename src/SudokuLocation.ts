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
}
