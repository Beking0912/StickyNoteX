interface IGetDirection {
  x: number;
  y: number;
  startX: number;
  startY: number;
  clientX: number;
  clientY: number;
}
export const getCreatingDirection = ({
  x,
  y,
  startX,
  startY,
  clientX,
  clientY,
}: IGetDirection) => {
  if (x > 0 && y > 0) {
    return { x: startX, y: startY };
  }
  if (x > 0 && y < 0) {
    return { x: startX, y: clientY };
  }
  if (x < 0 && y > 0) {
    return { x: clientX, y: startY };
  }
  return { x: clientX, y: clientY };
};
