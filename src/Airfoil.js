export default function Airfoil(code) {
  if (code.toString().length == 4) {
    const camber = parseInt(code.toString()[0]) / 10;
    const high = parseInt(code.toString()[1]) / 10;
    const thick = parseInt(code.toString().substr(2)) / 100;
    if (isNaN(camber) || isNaN(high) || isNaN(thick)) return null;

    const thickFun = (x) =>
      0.2969 * Math.sqrt(x) -
      0.126 * x -
      0.3516 * x * x +
      0.2843 * x * x * x -
      0.1015 * x * x * x * x;
    const num = 16;
    const denom = Math.round(num / thick);
    const iArray = [...Array(2 * denom + 1).keys()];
    let xArray = iArray.map(
      (i) => ((i / denom) * (i / denom)) / (2 + i / denom)
    );
    xArray.reverse();
    let points = xArray.map((x) => [x, thickFun(x)]);
    xArray.reverse();
    xArray.splice(0, 1);
    points.push(...xArray.map((x) => [x, -thickFun(x)]));
    return points;
  } else return null;
}
