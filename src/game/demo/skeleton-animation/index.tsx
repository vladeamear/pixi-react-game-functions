import { Stage, useTick } from "@pixi/react";
import { TCBProps, useCreateGameObject } from "../../hooks/useCreateGameObject";
import { GameContainer } from "../../components/GameContainer";
import { TDimensions } from "../../types/TDimensions";
import imgSrc from "./skeleton.png";
import { makeFrame } from "../../functions/makeFrame";
import { useEffect, useLayoutEffect, useState } from "react";

const DIMENSIONS: TDimensions = {
  width: 1280,
  height: 720,
};

const FRAMES = {
  up: [
    makeFrame(imgSrc, [0, 0, 64, 64]),
    makeFrame(imgSrc, [64, 0, 64, 64]),
    makeFrame(imgSrc, [128, 0, 64, 64]),
    makeFrame(imgSrc, [192, 0, 64, 64]),
    makeFrame(imgSrc, [256, 0, 64, 64]),
    makeFrame(imgSrc, [320, 0, 64, 64]),
    makeFrame(imgSrc, [384, 0, 64, 64]),
    makeFrame(imgSrc, [448, 0, 64, 64]),
    makeFrame(imgSrc, [512, 0, 64, 64]),
  ],
  left: [
    makeFrame(imgSrc, [0, 64, 64, 64]),
    makeFrame(imgSrc, [64, 64, 64, 64]),
    makeFrame(imgSrc, [128, 64, 64, 64]),
    makeFrame(imgSrc, [192, 64, 64, 64]),
    makeFrame(imgSrc, [256, 64, 64, 64]),
    makeFrame(imgSrc, [320, 64, 64, 64]),
    makeFrame(imgSrc, [384, 64, 64, 64]),
    makeFrame(imgSrc, [448, 64, 64, 64]),
    makeFrame(imgSrc, [512, 64, 64, 64]),
  ],
  down: [
    makeFrame(imgSrc, [0, 128, 64, 64]),
    makeFrame(imgSrc, [64, 128, 64, 64]),
    makeFrame(imgSrc, [128, 128, 64, 64]),
    makeFrame(imgSrc, [192, 128, 64, 64]),
    makeFrame(imgSrc, [256, 128, 64, 64]),
    makeFrame(imgSrc, [320, 128, 64, 64]),
    makeFrame(imgSrc, [384, 128, 64, 64]),
    makeFrame(imgSrc, [448, 128, 64, 64]),
    makeFrame(imgSrc, [512, 128, 64, 64]),
  ],
  right: [
    makeFrame(imgSrc, [0, 192, 64, 64]),
    makeFrame(imgSrc, [64, 192, 64, 64]),
    makeFrame(imgSrc, [128, 192, 64, 64]),
    makeFrame(imgSrc, [192, 192, 64, 64]),
    makeFrame(imgSrc, [256, 192, 64, 64]),
    makeFrame(imgSrc, [320, 192, 64, 64]),
    makeFrame(imgSrc, [384, 192, 64, 64]),
    makeFrame(imgSrc, [448, 192, 64, 64]),
    makeFrame(imgSrc, [512, 192, 64, 64]),
  ],
  idle: [makeFrame(imgSrc, [0, 128, 64, 64])],
};

// Игра
const GameDemo = () => {
  const [direction, setDirection] = useState<
    "up" | "left" | "down" | "right" | "idle"
  >("idle");

  const skeleton = useCreateGameObject({
    animation: {
      frames: FRAMES.idle,
      speed: 0.2,
    },
    size: {
      width: 64,
      height: 64,
    },
    collisionBlocks: ({ x, y }: TCBProps) => [
      {
        width: 64,
        height: 64,
        x: x,
        y: y,
      },
    ],
    startingPosition: {
      x: (DIMENSIONS.width - 64) / 2,
      y: (DIMENSIONS.height - 64) / 2,
    },
  });

  const onArrowUp = () => {
    skeleton.setFrames(FRAMES.up);
    setDirection("up");
  };
  const onArrowLeft = () => {
    skeleton.setFrames(FRAMES.left);
    setDirection("left");
  };
  const onArrowDown = () => {
    skeleton.setFrames(FRAMES.down);
    setDirection("down");
  };
  const onArrowRight = () => {
    skeleton.setFrames(FRAMES.right);
    setDirection("right");
  };
  const onIdle = () => {
    skeleton.setFrames(FRAMES.idle);
    setDirection("idle");
  };

  useLayoutEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") onArrowUp();
      if (e.key === "ArrowLeft") onArrowLeft();
      if (e.key === "ArrowDown") onArrowDown();
      if (e.key === "ArrowRight") onArrowRight();
    };

    const keyUpHandler = (e: KeyboardEvent) => {
      onIdle();
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useTick((delta) => {
    // console.log(delta, ticker);
    if (direction === "up") skeleton.setY(skeleton.parameters.y - delta * 0.2);
    if (direction === "down")
      skeleton.setY(skeleton.parameters.y + delta * 0.2);
    if (direction === "left")
      skeleton.setX(skeleton.parameters.x - delta * 0.2);
    if (direction === "right")
      skeleton.setX(skeleton.parameters.x + delta * 0.2);
  });

  return (
    <GameContainer dimensions={DIMENSIONS}>
      <>
        <skeleton.sprite />
      </>
    </GameContainer>
  );
};

// Обертка игры
export const SkeletonAnimation = () => {
  return (
    <Stage
      {...DIMENSIONS}
      options={{
        background: "#759bd9",
      }}
    >
      <GameDemo />
    </Stage>
  );
};
