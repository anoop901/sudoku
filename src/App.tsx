import { List } from "immutable";
import React from "react";
import Sudoku from "./Sudoku";
import SudokuView from "./SudokuView";

export default function App() {
  const _ = null;
  return (
    <SudokuView
      sudoku={
        new Sudoku(
          List([
            ...[
              List([...[_, _, _], ...[_, _, 8], ...[3, 5, 4]]),
              List([...[7, _, _], ...[6, _, 2], ...[8, 1, _]]),
              List([...[_, _, _], ...[9, _, _], ...[7, _, 2]]),
            ],
            ...[
              List([...[_, 5, 8], ...[7, _, 4], ...[_, _, _]]),
              List([...[4, 3, 2], ...[5, 1, _], ...[6, 7, 8]]),
              List([...[_, 1, _], ...[_, _, 6], ...[_, _, 5]]),
            ],
            ...[
              List([...[8, 6, _], ...[_, 3, _], ...[_, _, _]]),
              List([...[3, _, _], ...[_, 9, 5], ...[1, 2, _]]),
              List([...[_, _, 9], ...[_, _, 7], ...[_, 8, _]]),
            ],
          ])
        )
      }
    />
  );
}
