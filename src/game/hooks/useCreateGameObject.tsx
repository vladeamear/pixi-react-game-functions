import { Sprite } from "@pixi/react";
import "@pixi/events";
import { useState } from "react";
import { TGameObjectParameters } from "../types/TGameObjectParameters";
import { Rectangle } from "pixi.js";

export type TCBProps = { x: number; y: number };

type TCollisionBlocks = ({ x, y }: TCBProps) => TGameObjectParameters[];

export interface IGameObject {
  image: string;
  size: {
    width: number;
    height: number;
  };
  collisionBlocks: TCollisionBlocks;
  isCollisionBlocksVisible?: boolean;
  onClick?: () => void;
  startingPosition?: {
    x?: number;
    y?: number;
  };
}

export const useCreateGameObject = ({
  image,
  size,
  collisionBlocks,
  isCollisionBlocksVisible,
  onClick,
  startingPosition,
}: IGameObject) => {
  const [x, setX] = useState(startingPosition?.x || 0);
  const [y, setY] = useState(startingPosition?.y || 0);

  const collisionBlocksAtTheMoment = collisionBlocks({ x, y });

  const interactiveObj = onClick
    ? {
        interactive: true,
        hitArea: new Rectangle(x, y, size.width, size.height),
        onpointerdown: onClick,
      }
    : {};

  return {
    sprite: () => (
      <>
        <Sprite image={image} {...size} x={x} y={y} {...interactiveObj} />
        {isCollisionBlocksVisible
          ? collisionBlocksAtTheMoment.map((cb, index) => (
              <Sprite
                key={index}
                {...cb}
                image="https://dummyimage.com/600x400/sdcdsc/fff&text=+"
              />
            ))
          : null}
      </>
    ),
    parameters: {
      width: size.width,
      height: size.height,
      x,
      y,
    } as TGameObjectParameters,
    setX,
    setY,
    collisionBlocksAtTheMoment,
  };
};
