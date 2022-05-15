import { useRecoilState } from "recoil";
import { defaultGameState } from "./state/gameState";
import { GameView } from "./ui/GameView";

export const OseroPage = () => {
  const [defaultGame, _] = useRecoilState(defaultGameState);

  return (
    <>
      <div>{defaultGame && <GameView game={defaultGame} />}</div>
    </>
  );
};
