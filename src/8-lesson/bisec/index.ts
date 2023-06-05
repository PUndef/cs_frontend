export const bisecLeft = (
  arr: Array<number>,
  comparator: (el: number) => number,
) => {
  let from = 0,
      to = arr.length,
      res = -1;

  while (from < to) {
    const index = Math.floor((from + to) / 2);
    const mid = arr[index];
    const comparRes = comparator(mid);

    if (comparRes === 0) {
      res = index;
    }

    if (comparRes >= 0) {
      to = index;
    } else {
      from = index + 1;
    }
  }

  return res;
}

export const bisecRight = (
  arr: Array<number>,
  comparator: (el: number) => number,
) => {
  let from = 0,
      to = arr.length,
      res = -1;

  while (from < to) {
    const index = Math.floor((from + to) / 2);
    const mid = arr[index];
    const comparRes = comparator(mid)

    if (comparRes === 0) {
      res = index;
    }

    if (comparRes > 0) {
      to = index;
    } else {
      from = index + 1;
    }
  }

  return res;
}