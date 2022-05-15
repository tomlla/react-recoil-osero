import { times } from "../../utils/times";
import { Disk, diskName, reverseDisk } from "./disk";
import { Player, PlayerDisk } from "./game";
import { Pos } from "./pos";

export class Board {
  public static new(bgo: BoardGenOption): Board {
    const nCells = bgo.nCells;
    assertNCell(nCells);

    const cells = genCells(nCells);
    const b = new Board(nCells, cells);
    b.setInitialDisks();
    return b;
  }

  private constructor(public nCells: number, public cells: Disk[][]) {}

  private setInitialDisks() {
    const base = this.nCells / 2 - 1;
    this.putDisk({ x: base, y: base }, Disk.White);
    this.putDisk({ x: base + 1, y: base }, Disk.Black);
    this.putDisk({ x: base, y: base + 1 }, Disk.Black);
    this.putDisk({ x: base + 1, y: base + 1 }, Disk.White);
  }

  public clone(): Board {
    const newCells = genCells(this.nCells);
    this.cellsIter().forEach(({ pos, disk }) => {
      newCells[pos.y][pos.x] = disk;
    });
    return new Board(this.nCells, newCells);
  }

  private cellsIter(): { pos: Pos; disk: Disk }[] {
    return this.cells.flatMap((thisRowCells, y) =>
      thisRowCells.map((cell, x) => ({ pos: { x, y }, disk: cell }))
    );
  }

  cosnolePrint() {
    console.table(this.cells);
  }

  public getCell(pos: Pos): Disk {
    return this.cells[pos.y][pos.x];
  }

  public reverse(pos: Pos, currentPlayerDisk: PlayerDisk) {
    const before = this.getCell(pos);
    if (before !== reverseDisk(currentPlayerDisk)) {
      throw new Error(
        `Can't reverse ${diskName(before)} in (${pos.x}, ${pos.y})`
      );
    }
    this.cells[pos.y][pos.x] = currentPlayerDisk;
  }

  public putDisk(pos: Pos, disk: Disk) {
    const currentCell = this.cells[pos.y][pos.x];
    if (currentCell !== Disk.Empty) {
      throw new Error(
        `Already ${diskName(currentCell)} disk exists in (${pos.x}, ${pos.y})`
      );
    }
    this.cells[pos.y][pos.x] = disk;
  }

  public withDisk(pos: Pos, disk: Disk): Board {
    const currentCell = this.cells[pos.y][pos.x];
    if (currentCell !== Disk.Empty) {
      throw new Error(
        `Already ${diskName(currentCell)} disk exists in (${pos.x}, ${pos.y})`
      );
    }
    const newBoard = this.clone();
    newBoard.cells[pos.y][pos.x] = disk;
    return newBoard;
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

const genCells = (nCells: number) =>
  times(nCells).map((_) => times(nCells).map(() => Disk.Empty));
