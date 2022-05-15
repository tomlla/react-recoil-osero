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

export const reverseDisk = (disk: Disk) => {
  switch (disk) {
    case Disk.Black:
      return Disk.White;
    case Disk.White:
      return Disk.Black;
    default:
      const repr = JSON.stringify(disk);
      throw new Error(`Unexpected kind of disk. reverseDisk(${repr})`);
  }
};
