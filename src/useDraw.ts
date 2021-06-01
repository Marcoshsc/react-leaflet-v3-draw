import { useContext } from "react";
import { DrawDispatcher, DrawContext } from "./context";

export function useDraw(): DrawDispatcher {
  const drawContext = useContext(DrawContext);
  if (drawContext === null) {
    throw new Error("Error: component must be wrapped inside <MapDraw></MapDraw>.");
  }
  return drawContext;
}
