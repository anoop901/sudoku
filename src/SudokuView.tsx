import { useEffect, useState } from "react";
import Sudoku from "./Sudoku";
import SudokuLocation from "./SudokuLocation";

const tableStyle = {
  borderCollapse: "collapse" as const,
  border: "1px solid black",
};

const boxStyle = {
  padding: "0px",
};

const tableCellStyle = {
  border: "1px solid black",
  width: "30px",
  height: "30px",
  textAlign: "center" as const,
};

const adjacentCellStyle = {
  backgroundColor: "#ddd",
};

const selectedCellStyle = {
  backgroundColor: "#bbf",
};

const possibleValuesStyle = {
  fontSize: "0.7em",
  color: "#888",
  lineHeight: "90%",
};

export default function SudokuView({
  sudoku,
  setSudoku,
}: {
  sudoku: Sudoku;
  setSudoku: (sudoku: Sudoku) => void;
}) {
  const [selectedLocation, setSelectedLocation] = useState(
    new SudokuLocation({ row: 0, col: 0 })
  );

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(event.key)) {
        const value = Number(event.key);
        setSudoku(sudoku.setValueAtLocation(selectedLocation, value));
        setSelectedLocation(selectedLocation.next);
      }
      if (["0", " "].includes(event.key)) {
        setSudoku(sudoku.clearValueAtLocation(selectedLocation));
        setSelectedLocation(selectedLocation.next);
      }
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [sudoku, selectedLocation, setSudoku]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          if (selectedLocation.row > 0) {
            setSelectedLocation(
              new SudokuLocation({
                row: selectedLocation.row - 1,
                col: selectedLocation.col,
              })
            );
          }
          break;
        case "ArrowDown":
          if (selectedLocation.row < 8) {
            setSelectedLocation(
              new SudokuLocation({
                row: selectedLocation.row + 1,
                col: selectedLocation.col,
              })
            );
          }
          break;
        case "ArrowLeft":
          if (selectedLocation.col > 0) {
            setSelectedLocation(
              new SudokuLocation({
                row: selectedLocation.row,
                col: selectedLocation.col - 1,
              })
            );
          }
          break;
        case "ArrowRight":
          if (selectedLocation.col < 8) {
            setSelectedLocation(
              new SudokuLocation({
                row: selectedLocation.row,
                col: selectedLocation.col + 1,
              })
            );
          }
          break;
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [selectedLocation]);

  return (
    <table style={tableStyle}>
      <tbody>
        {Array.from({ length: 3 }, (_, boxRow) => (
          <tr key={boxRow}>
            {Array.from({ length: 3 }, (_, boxCol) => (
              <td key={boxCol} style={boxStyle}>
                <table style={tableStyle}>
                  <tbody>
                    {Array.from({ length: 3 }, (_, rowInBox) => (
                      <tr key={rowInBox}>
                        {Array.from({ length: 3 }, (_, colInBox) => {
                          const row = boxRow * 3 + rowInBox;
                          const col = boxCol * 3 + colInBox;
                          const location = new SudokuLocation({ row, col });
                          const isSelectedCell = selectedLocation.equals(
                            location
                          );
                          const isAdjacentToSelectedCell = selectedLocation.adjacentLocations.has(
                            location
                          );
                          const value = sudoku.valueAtLocation(location);
                          return (
                            <td
                              key={colInBox}
                              style={{
                                ...tableCellStyle,
                                ...(isSelectedCell ? selectedCellStyle : {}),
                                ...(isAdjacentToSelectedCell
                                  ? adjacentCellStyle
                                  : {}),
                                ...(value === null ? possibleValuesStyle : {}),
                              }}
                              onClick={() => {
                                setSelectedLocation(location);
                              }}
                            >
                              {value ??
                                sudoku
                                  .possibleValuesAtLocation(location)
                                  .join(" ")}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
