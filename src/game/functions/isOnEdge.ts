import { TDimensions } from "../types/TDimensions";
import { TGameObjectParameters } from "../types/TGameObjectParameters";

export const isOnEdge = (
  objectParameters: TGameObjectParameters,
  dimensions: TDimensions,
  edge: "top" | "bottom" | "left" | "right"
): boolean => {
  if (objectParameters.x === 0 && edge === "left") return true;
  if (objectParameters.y === 0 && edge === "top") return true;
  if (
    objectParameters.x + objectParameters.width === dimensions.width &&
    edge === "right"
  )
    return true;
  if (
    objectParameters.y + objectParameters.height === dimensions.height &&
    edge === "bottom"
  )
    return true;
  return false;
};
