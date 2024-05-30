import { useState } from "react";
import { Stage, Text, useTick } from "@pixi/react";
import { TCBProps, useCreateGameObject } from "../hooks/useCreateGameObject";
import { GameContainer } from "../components/GameContainer";
import { TDimensions } from "../types/TDimensions";
import { isOffEdge } from "../functions/isOffEdge";
import random from "lodash/random";

const DIMENSIONS: TDimensions = {
  width: 1280,
  height: 720,
};

const FALL_SPEED = 2;

// Игра
const GameDemo = () => {
  const [points, setPoints] = useState(0);
  const inc = () => setPoints((prev) => prev + 1);
  const dec = () => setPoints((prev) => (prev === 0 ? prev : prev - 1));

  const bunny1RandomX = () => random(0, DIMENSIONS.width - 30);
  const bunny1 = useCreateGameObject({
    image: "https://pixijs.io/pixi-react/img/bunny.png",
    size: {
      width: 30,
      height: 40,
    },
    collisionBlocks: ({ x, y }: TCBProps) => [
      {
        width: 15,
        height: 20,
        x: x,
        y: y,
      },
      {
        width: 15,
        height: 20,
        x: 15 + x,
        y: 20 + y,
      },
    ],
    onClick: () => {
      inc();
      bunny1.setX(bunny1RandomX());
      bunny1.setY(-40);
    },
    startingPosition: {
      x: bunny1RandomX(),
      y: -40,
    },
  });

  const bunny2RandomX = () => random(0, DIMENSIONS.width - 40);
  const bunny2 = useCreateGameObject({
    image: "https://pixijs.io/pixi-react/img/bunny.png",
    size: {
      width: 40,
      height: 50,
    },
    collisionBlocks: ({ x, y }: TCBProps) => [
      {
        width: 40,
        height: 50,
        x: x,
        y: y,
      },
    ],
    onClick: () => {
      inc();
      bunny2.setX(bunny2RandomX());
      bunny2.setY(-50);
    },
    startingPosition: {
      x: bunny1RandomX(),
      y: -50,
    },
  });

  useTick((delta) => {
    const oldBunny1Parameters = bunny1.parameters;
    if (isOffEdge(oldBunny1Parameters, DIMENSIONS, "bottom")) {
      bunny1.setY(-100);
      bunny1.setX(bunny1RandomX());
    } else {
      const bunny1NewY = oldBunny1Parameters.y + delta * FALL_SPEED;
      bunny1.setY(bunny1NewY);
    }

    const oldBunny2Parameters = bunny2.parameters;
    if (isOffEdge(oldBunny2Parameters, DIMENSIONS, "bottom")) {
      bunny2.setY(-100);
      bunny2.setX(bunny1RandomX());
    } else {
      const bunny2NewY = oldBunny2Parameters.y + delta * FALL_SPEED;
      bunny2.setY(bunny2NewY);
    }
  });

  return (
    <GameContainer dimensions={DIMENSIONS} onClick={{ fn: dec, target: "bg" }}>
      <>
        <bunny1.sprite />
        <bunny2.sprite />
        <Text text={points.toString()} />
      </>
    </GameContainer>
  );
};

// Обертка игры
export const GameDemoWrapper = () => {
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
