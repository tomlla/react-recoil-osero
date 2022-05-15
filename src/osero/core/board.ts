import { times } from "../../utils/times";
import { Disk, diskName } from "./disk";

export interface BoardInterface {
  id: string;
  nCells: number;
  cells: Disk[][];
}
export class Board {
  public static gen(bgo: BoardGenOption): Board {
    const nCells = bgo.nCells;
    assertNCell(nCells);
    const cells = times(nCells).map((_) => times(nCells).map(() => Disk.Empty));
    const b = new Board(nCells, cells);
    setInitialDisk(b);
    return b;
  }
  constructor(
    public nCells: number,
    public cells: Disk[][]
  ) {}

  public getCell(pos: Pos): Disk {
    return this.cells[pos.y][pos.x];
  }
  public setDisk(pos: Pos, disk: Disk) {
    const currentCell = this.cells[pos.y][pos.x];
    if (currentCell !== Disk.Empty) {
      throw new Error(`Already ${diskName(currentCell)} disk exists in (${pos.x}, ${pos.y})`);
    }
    this.cells[pos.y][pos.x] = disk;
  }
}
interface BoardGenOption {
  nCells: number;
}


const assertNCell = (nCells: number) => {
  if (nCells % 2 != 0) {
    throw new Error(`nCells should be even number. (nCells: ${nCells})`);
  }
  if (nCells < 4) {
    throw new Error(`nCells should greater than 4. (nCells: ${nCells})`);
  }
};

export interface Pos {
  x: number;
  y: number;
}

const setInitialDisk = (board: Board) => {
  const base = board.nCells / 2 - 1;
  board.setDisk({ x: base, y: base }, Disk.White);
  board.setDisk({ x: base + 1, y: base }, Disk.Black);
  board.setDisk({ x: base, y: base + 1 }, Disk.Black);
  board.setDisk({ x: base + 1, y: base + 1 }, Disk.White);
};

const cosnolePrint = (b: Board) => {
  console.table(b.cells);
};