import { range, times } from "../../utils/times";
import { Board } from "./board";
import { Disk, reverseDisk } from "./disk";
import { Pos } from "./pos";

interface Change {
  pos: Pos;
  disk: Disk;
}

export const reversibleCells = (board: Board, op: Change): Pos[] => {
  const itersByDirection = makeIters(board, op.pos);

  return Object.entries(itersByDirection).flatMap(([k, positions]) =>
    sliceReversiblePositions(board, op.disk, positions)
  );
};

// type Direction = "Top" | "Bottom" | "Left" | "TopLeft" | "TopRight" | "BottomLeft" | "BottomRight";
type Direction = "top" | "bottom";

const makeIters = (board: Board, base: Pos): { [k in Direction]: Pos[] } => {
  const nCells = board.nCells;
  const top = times(base.y)
    .map((y) => ({ x: base.x, y }))
    .reverse();
  const bottom = range(base.y + 1, nCells).map((y) => ({ x: base.x, y }));
  return {
    top,
    bottom,
  };
};

const sliceReversiblePositions = (
  board: Board,
  to: Disk,
  positions: Pos[]
): Pos[] => {
  const reversibleDisk = reverseDisk(to);
  let idx = positions.findIndex((pos) => board.getCell(pos) !== reversibleDisk);
  return positions.slice(0, idx === -1 ? positions.length : idx);
};
