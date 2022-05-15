export enum Disk {
  Empty = "_",
  White = "W",
  Black = "B",
}

export const diskName = (disk: Disk): string => {
  switch (disk) {
    case Disk.Empty:
      return "Empty";
    case Disk.Black:
      return "Black";
    case Disk.White:
      return "White";
    default:
      throw new Error(`Unexpected kind of disk. ${disk}`);
  }
};
