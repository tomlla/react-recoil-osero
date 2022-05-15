export const times = (n: number) => [...Array(n)].map((_, i) => i);

export const range = (from: number, to: number) => times(to).slice(from);
