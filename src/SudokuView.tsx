import { table } from "console";
import Sudoku from "./Sudoku";

const tableCellStyle = {
  border: "1px solid black",
  width: "30px",
  height: "30px",
  textAlign: "center" as const,
};

export default function SudokuView(props: { sudoku: Sudoku }) {
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
                      return (
                        <td style={tableCellStyle}>
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
