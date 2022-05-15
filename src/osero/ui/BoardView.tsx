import "./Board.scss";
import { times } from "../../utils/times";
import { Board } from "../core/board";
import { Disk } from "../core/disk";
import { useRecoilState } from "recoil";
import { defaultGameState } from "../state/gameState";
import { Pos } from "../core/pos";

export const BoardView: React.FC<{ board: Board }> = ({ board }) => {
  const N = board.nCells;
  return (
    <div className="BoardView">
      <table className="Osero-board">
        <tbody>{times(N).map((y) => Row({ board, y }))}</tbody>
      </table>
    </div>
  );
};

const Row: React.FC<{ board: Board; y: number }> = ({ board, y }) => {
  return (
    <tr key={y}>
      <th>{y}</th>
      {times(board.nCells).map((x) => Cell({ board, pos: { x, y } }))}
    </tr>
  );
};

const diskClassName = (disk: Disk): string => {
  switch (disk) {
    case Disk.Empty:
      return "DiskEmpty";
    case Disk.Black:
      return "DiskBlack";
    case Disk.White:
      return "DiskWhite";
    default:
      throw new Error(`Unexpected kind of disk. ${disk}`);
  }
};

const Cell: React.FC<{ board: Board; pos: Pos }> = ({ board, pos }) => {
  const disk = board.getCell(pos);
  const [defaultGame, setDefaultGame] = useRecoilState(defaultGameState);
  const onClick = () => {
    if (defaultGame.board.getCell(pos) === Disk.Empty) {
      const game = defaultGame.withCmd(pos);
      setDefaultGame(game);
    }
  };
  return (
    <td key={pos.x} className={diskClassName(disk)} onClick={onClick}>
      <div className="CellInnerContainer">{diskSvg(disk)}</div>
    </td>
  );
};

const diskSvg = (disk: Disk) => {
  if (disk === Disk.Black) {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="black" />
      </svg>
    );
  }
  if (disk === Disk.White) {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="white" />
      </svg>
    );
  }
  if (disk === Disk.Empty) {
    return (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="green" />
      </svg>
    );
  }
  return <></>;
};
