import { Game } from "../core/game";
import { BoardView } from "./BoardView";

export const GameView: React.FC<{ game: Game }> = ({ game }) => {
  return (
    <>
      <BoardView board={game.board} />
    </>
  );
};
