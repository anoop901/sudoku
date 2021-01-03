import { useEffect, useState } from "react";
import Sudoku from "./Sudoku";
import SudokuLocation from "./SudokuLocation";

const tableCellStyle = {
  border: "1px solid black",
  width: "30px",
  height: "30px",
  textAlign: "center" as const,
  overflow: "visible" as const,
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
      }
      if (["0", " "].includes(event.key)) {
        setSudoku(sudoku.clearValueAtLocation(selectedLocation));
      }
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [sudoku, selectedLocation, setSudoku]);

  return (
    <table>
      <tbody>
        {Array.from({ length: 3 }, (_, boxRow) => (
          <tr key={boxRow}>
            {Array.from({ length: 3 }, (_, boxCol) => (
              <td key={boxCol}>
                <table>
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
