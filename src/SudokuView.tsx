import { useState } from "react";
import Sudoku from "./Sudoku";
import SudokuLocation from "./SudokuLocation";

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

export default function SudokuView(props: { sudoku: Sudoku }) {
  const [selectedLocation, setSelectedLocation] = useState(
    new SudokuLocation({ row: 0, col: 0 })
  );
  return (
    <table>
      {Array.from({ length: 3 }, (_, boxRow) => (
        <tr>
          {Array.from({ length: 3 }, (_, boxCol) => (
            <td>
              <table>
                {Array.from({ length: 3 }, (_, rowInBox) => (
                  <tr>
                    {Array.from({ length: 3 }, (_, colInBox) => {
                      const row = boxRow * 3 + rowInBox;
                      const col = boxCol * 3 + colInBox;
                      const location = new SudokuLocation({ row, col });
                      const isSelectedCell = selectedLocation.equals(location);
                      const isAdjacentToSelectedCell = selectedLocation.adjacentLocations.has(
                        location
                      );
                      return (
                        <td
                          style={{
                            ...tableCellStyle,
                            ...(isSelectedCell ? selectedCellStyle : {}),
                            ...(isAdjacentToSelectedCell
                              ? adjacentCellStyle
                              : {}),
                          }}
                          onClick={() => {
                            setSelectedLocation(location);
                          }}
                        >
                          {props.sudoku.values.get(row)?.get(col) ?? ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </table>
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}
