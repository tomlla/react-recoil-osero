export interface Pos {
  x: number;
  y: number;
}

export type PosAsInt = number;

export const asInt = (pos: Pos): PosAsInt => pos.y * 100 + pos.x;

export const asPos = (i: PosAsInt): Pos => {
  const x = i % 100;
  const y = i - x;
  return { x, y };
};
