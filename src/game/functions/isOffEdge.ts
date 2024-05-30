import { TDimensions } from "../types/TDimensions";
import { TGameObjectParameters } from "../types/TGameObjectParameters";

export const isOffEdge = (
  objectParameters: TGameObjectParameters,
  dimensions: TDimensions,
  edge: "top" | "bottom" | "left" | "right"
): boolean => {
  return (
    (edge === "left" && objectParameters.x + objectParameters.width < 0) ||
    (edge === "top" && objectParameters.y + objectParameters.height < 0) ||
    (edge === "right" && objectParameters.x > dimensions.width) ||
    (edge === "bottom" && objectParameters.y > dimensions.height)
  );
};
