export function findClosestNum(num: number, arr: number[]) {
  var curr = arr[0],
    diff = Math.abs(num - curr),
    index = 0;

  for (var val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
    }
  }
  return index;
}
