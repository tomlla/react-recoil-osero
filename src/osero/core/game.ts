import { Board, Pos } from "./board";
import { Disk } from "./disk";

export const genGameId = (): string => Math.random().toString().slice(2, 14);

type Player = "Black" | "White";
type Command = "Pass" | { pos: Pos; disk: Disk };

interface Turn {
  player: Player;
  command: Command;
}

export class Game {
  history: (Turn & { timestamp: Date })[];
  startedAt: Date;

  public static new() {
    // const genGameId();
    const board = Board.gen({ nCells: 8 });
    return new Game(board);
  }
  constructor(public readonly board: Board, public player: Player = "Black") {
    this.startedAt = new Date();
    this.history = [];
  }

  public apply(turn: Turn) {
    if (turn.command !== "Pass") {
      this.board.setDisk(turn.command.pos, turn.command.disk);
    }
    this.history.push({ ...turn, timestamp: new Date() });
    this.letPlayerChange();
  }

  private letPlayerChange() {
    this.player = this.player === "Black" ? "White" : "Black";
  }
}
