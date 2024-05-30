import { ReactElement } from "react";
import { Container, Sprite } from "@pixi/react";
import "@pixi/events";
import { Rectangle } from "pixi.js";
import { Texture } from "@pixi/core";

interface IGameStage {
  dimensions: {
    width: number;
    height: number;
  };
  children: ReactElement;
  onClick?: { fn: (event: MouseEvent) => void; target: "stage" | "bg" };
}

export const GameContainer = ({
  dimensions,
  children,
  onClick,
}: IGameStage) => {
  const containerInteraction =
    onClick?.target === "stage"
      ? {
          interactive: true,
          hitArea: new Rectangle(0, 0, dimensions.width, dimensions.height),
          pointerdown: onClick.fn,
        }
      : {};

  return (
    <Container x={0} y={0} {...dimensions} {...containerInteraction}>
      {onClick?.target === "bg" ? (
        <Sprite
          interactive
          hitArea={new Rectangle(0, 0, dimensions.width, dimensions.height)}
          pointerdown={onClick.fn}
          texture={Texture.EMPTY}
          {...dimensions}
        />
      ) : (
        <></>
      )}
      {children}
    </Container>
  );
};
