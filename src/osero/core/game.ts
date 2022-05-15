import { Board } from "./board";
import { Disk } from "./disk";
import { reversibleCells } from "./diskReverse";
import { Pos } from "./pos";

export const genGameId = (): string => Math.random().toString().slice(2, 14);

export type Player = Disk.Black | Disk.White;
export type PlayerDisk = Player;
type Command = "Pass" | Pos;

interface Turn {
  player: Player;
  cmd: Command;
  timestamp: Date;
}

export class Game {
  public static new() {
    const board = Board.new({ nCells: 8 });
    return new Game(board);
  }

  constructor(
    public board: Board,
    public player: Player = Disk.Black,
    public startedAt: Date = new Date(),
    public histories: Turn[] = []
  ) {}

  public clone(): Game {
    return new Game(
      //
      this.board.clone(),
      this.player,
      this.startedAt,
      [...this.histories]
    );
  }

  public withCmd(cmd: Command) {
    const timestamp = new Date();
    const game = this.clone();

    if (cmd !== "Pass") {
      game.board.putDisk(cmd, this.player);
      const op = { pos: cmd, disk: this.player };
      const reverseTargets = reversibleCells(game.board, op);
      console.log({ reverseTargets });
      reverseTargets.forEach((pos) => {
        game.board.reverse(pos, this.player);
      });
    }
    const history = { player: this.player, cmd, timestamp };
    game.player = this.nextPlayer();
    game.histories.push(history);
    return game;
  }

  private nextPlayer() {
    return this.player === Disk.Black ? Disk.White : Disk.Black;
  }
}
