import { List } from "immutable";
import React, { useState } from "react";
import Sudoku from "./Sudoku";
import SudokuView from "./SudokuView";

export default function App() {
  const _ = null;

  const [sudoku, setSudoku] = useState(
    new Sudoku(
      List([
        ...[
          List([...[_, 5, _], ...[4, _, 6], ...[_, _, _]]),
          List([...[_, _, _], ...[2, _, _], ...[_, _, _]]),
          List([...[_, 8, 4], ...[7, _, 3], ...[6, _, _]]),
        ],
        ...[
          List([...[_, _, 2], ...[_, 3, 1], ...[4, 9, 8]]),
          List([...[8, _, _], ...[_, _, _], ...[_, 2, 5]]),
          List([...[5, 4, 9], ...[_, _, _], ...[_, _, _]]),
        ],
        ...[
          List([...[7, 6, _], ...[1, _, _], ...[_, 4, 2]]),
          List([...[_, _, 5], ...[_, 6, _], ...[_, _, _]]),
          List([...[9, _, _], ...[_, _, _], ...[_, 5, _]]),
        ],
      ])
    )
  );
  return (
    <>
      <p>
        To put a number in a cell, select the cell and type the number. To clear
        a cell, type '0' or space.
      </p>
      <SudokuView sudoku={sudoku} setSudoku={setSudoku} />
      <p>Sudoku is {sudoku.valid ? "valid" : "not valid"}.</p>
      <div>
        <button
          onClick={() => {
            const solvedSudoku = sudoku.fillInLocationsWithOnePossibility();
            if (solvedSudoku !== null) {
              setSudoku(solvedSudoku);
            }
          }}
        >
          Solve Step
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const solvedSudoku = sudoku.solve();
            if (solvedSudoku !== null) {
              setSudoku(solvedSudoku);
            }
          }}
        >
          Solve Full
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setSudoku(
              new Sudoku(
                List(
                  Array.from({ length: 9 }, () =>
                    List(Array.from({ length: 9 }, () => null))
                  )
                )
              )
            );
          }}
        >
          Clear
        </button>
      </div>
    </>
  );
}
