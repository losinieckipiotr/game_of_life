export function constrain(number, min, max) {
  if (number < min) {
    return NaN;
  }
  if (number > max) {
    return NaN;
  }
  return number;
}
