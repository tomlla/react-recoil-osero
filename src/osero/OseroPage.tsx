import { useState } from "react";
import { Game } from "./core/game";
import { GameView } from "./ui/GameView";

export const OseroPage = () => {
  const [game, setGame] = useState<Game>(Game.new());

  return (
    <>
      <div>{game && <GameView game={game}/>}</div>
    </>
  );
};
