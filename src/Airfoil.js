export default function Airfoil(code) {
  if (code.toString().length == 4) {
    const camber = parseInt(code.toString()[0]) / 100;
    const high = parseInt(code.toString()[1]) / 10;
    const thick = parseInt(code.toString().substr(2)) / 100;
    if (isNaN(camber) || isNaN(high) || isNaN(thick)) return null;

    const thickFun = (x) =>
      5 *
      thick *
      (0.2969 * Math.sqrt(x) -
        0.126 * x -
        0.3516 * x * x +
        0.2843 * x * x * x -
        0.1015 * x * x * x * x);

    const camberFun = (x) =>
      x <= high
        ? (camber / (high * high)) * (2 * high * x - x * x)
        : (camber / ((1 - high) * (1 - high))) *
          (1 - 2 * high + 2 * high * x - x * x);

    const num = 6;
    const denom = Math.round(num / thick);
    const iArray = [...Array(2 * denom + 1).keys()];
    let xArray = iArray.map(
      (i) => ((i / denom) * (i / denom)) / (2 + i / denom)
    );
    xArray.reverse();
    let points = xArray.map((x) => [x, camberFun(x) + thickFun(x)]);
    xArray.reverse();
    xArray.splice(0, 1);
    points.push(...xArray.map((x) => [x, camberFun(x) - thickFun(x)]));
    return points;
  } else return null;
}
