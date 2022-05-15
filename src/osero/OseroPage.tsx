import { useEffect, useState } from "react";
import { Board, genBoard, genBoardId, sampleRun } from "./core/board";
import { BoardView } from "./ui/BoardView";

export const OseroPage = () => {
  const boardId = genBoardId();
  const [board, setBoard] = useState<Board>(genBoard({ boardId, nCells: 8}));
  useEffect(() => {
    // const componentSeed = Math.random();
    setTimeout(sampleRun, 1 * 1000);
  }, []);

  return (
    <>
      <div>{board && <BoardView board={board}/>}</div>

      <p>成績表</p>
      <table>
        <tbody>
          <tr>
            <td></td>
          </tr>

        </tbody>

      </table>
    </>
  );
};
