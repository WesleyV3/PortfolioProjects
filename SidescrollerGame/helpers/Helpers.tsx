export function getAbsoluteCenter(x: number, width: number, y: number, height: number)
{
  return {x: x - (width/2), y: y-(height/2)}
}