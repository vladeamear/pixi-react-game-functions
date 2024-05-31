import { AnimatedSprite, Sprite } from "@pixi/react";
import "@pixi/events";
import { useState } from "react";
import { TGameObjectParameters } from "../types/TGameObjectParameters";
import { Texture, Rectangle, Resource } from "@pixi/core";

export type TCBProps = { x: number; y: number };

type TCollisionBlocks = ({ x, y }: TCBProps) => TGameObjectParameters[];

export interface IGameObject {
  image?: string;
  animation?: {
    frames: Texture<Resource>[];
    speed: number;
  };
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
  animation,
  size,
  collisionBlocks,
  isCollisionBlocksVisible,
  onClick,
  startingPosition,
}: IGameObject) => {
  const [x, setX] = useState(startingPosition?.x || 0);
  const [y, setY] = useState(startingPosition?.y || 0);
  const [frames, setFrames] = useState(animation?.frames);

  const collisionBlocksAtTheMoment = collisionBlocks({ x, y });

  const interactiveObj = onClick
    ? {
        interactive: true,
        hitArea: new Rectangle(x, y, size.width, size.height),
        onpointerdown: onClick,
      }
    : {};

  return {
    sprite: () => {
      return (
        <>
          {image ? (
            <Sprite image={image} {...size} x={x} y={y} {...interactiveObj} />
          ) : null}
          {animation ? (
            <AnimatedSprite
              textures={frames}
              isPlaying
              animationSpeed={animation.speed}
              {...size}
              x={x}
              y={y}
              {...interactiveObj}
            />
          ) : null}
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
      );
    },
    parameters: {
      width: size.width,
      height: size.height,
      x,
      y,
    } as TGameObjectParameters,
    setX,
    setY,
    setFrames,
    collisionBlocksAtTheMoment,
  };
};
