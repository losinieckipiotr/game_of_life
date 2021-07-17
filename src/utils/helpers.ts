export function constrain(number: number, min: number, max: number) {
  if (number < min) {
    return NaN;
  }
  if (number > max) {
    return NaN;
  }
  return number;
}
