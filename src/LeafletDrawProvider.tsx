import L, { DrawMap, LeafletEventHandlerFn } from "leaflet";
import "leaflet-draw";
import React, { FC, useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { DrawDispatcher, DrawProvider, DrawType } from "./context";

export interface LeafletDrawProviderProps {
  onDrawCreated?: LeafletEventHandlerFn;
  onDrawEdited?: LeafletEventHandlerFn;
  onDrawDeleted?: LeafletEventHandlerFn;
  onDrawStart?: LeafletEventHandlerFn;
  onDrawStop?: LeafletEventHandlerFn;
  onDrawVertex?: LeafletEventHandlerFn;
  onEditStart?: LeafletEventHandlerFn;
  onEditMove?: LeafletEventHandlerFn;
  onEditResize?: LeafletEventHandlerFn;
  onEditVertex?: LeafletEventHandlerFn;
  onEditStop?: LeafletEventHandlerFn;
  onDeleteStart?: LeafletEventHandlerFn;
  onDeleteStop?: LeafletEventHandlerFn;
  onToolbarOpened?: LeafletEventHandlerFn;
  onToolbarClosed?: LeafletEventHandlerFn;
  onMarkerContext?: LeafletEventHandlerFn;
}

export const LeafletDrawProvider: FC<LeafletDrawProviderProps> = (
  props: React.PropsWithChildren<LeafletDrawProviderProps>
) => {
  const map = useMap();
  const [polygonHandler] = useState(new L.Draw.Polygon(map as DrawMap));
  const [polylineHandler] = useState(new L.Draw.Polyline(map as DrawMap));
  const [rectangleHandler] = useState(new L.Draw.Rectangle(map as DrawMap));
  const [markerHandler] = useState(new L.Draw.Marker(map as DrawMap));
  const [circleHandler] = useState(new L.Draw.Circle(map as DrawMap));
  const [circleMarkerHandler] = useState(new L.Draw.CircleMarker(map as DrawMap));

  const handleDraw: DrawDispatcher = (type) => {
    switch (type) {
      case DrawType.CIRCLE: {
        circleHandler.enable();
        break;
      }
      case DrawType.CIRCLE_MARKER: {
        circleMarkerHandler.enable();
        break;
      }
      case DrawType.MARKER: {
        markerHandler.enable();
        break;
      }
      case DrawType.POLYGON: {
        polygonHandler.enable();
        break;
      }
      case DrawType.POLYLINE: {
        polylineHandler.enable();
        break;
      }
      case DrawType.RECTANGLE: {
        rectangleHandler.enable();
        break;
      }
    }
  };

  useEffect(() => {
    if (props.onDrawCreated) map.on(L.Draw.Event.CREATED, props.onDrawCreated);
    if (props.onDrawEdited) map.on(L.Draw.Event.EDITED, props.onDrawEdited);
    if (props.onDrawDeleted) map.on(L.Draw.Event.DELETED, props.onDrawDeleted);
    if (props.onDrawStart) map.on(L.Draw.Event.DRAWSTART, props.onDrawStart);
    if (props.onDrawStop) map.on(L.Draw.Event.DRAWSTOP, props.onDrawStop);
    if (props.onDrawVertex) map.on(L.Draw.Event.DRAWVERTEX, props.onDrawVertex);
    if (props.onEditStart) map.on(L.Draw.Event.EDITSTART, props.onEditStart);
    if (props.onEditMove) map.on(L.Draw.Event.EDITMOVE, props.onEditMove);
    if (props.onEditResize) map.on(L.Draw.Event.EDITRESIZE, props.onEditResize);
    if (props.onEditVertex) map.on(L.Draw.Event.EDITVERTEX, props.onEditVertex);
    if (props.onEditStop) map.on(L.Draw.Event.EDITSTOP, props.onEditStop);
    if (props.onDeleteStart) map.on(L.Draw.Event.DELETESTART, props.onDeleteStart);
    if (props.onDeleteStop) map.on(L.Draw.Event.DELETESTOP, props.onDeleteStop);
    if (props.onToolbarOpened) map.on(L.Draw.Event.TOOLBAROPENED, props.onToolbarOpened);
    if (props.onToolbarClosed) map.on(L.Draw.Event.TOOLBARCLOSED, props.onToolbarClosed);
    if (props.onMarkerContext) map.on(L.Draw.Event.MARKERCONTEXT, props.onMarkerContext);
  }, [
    map,
    props.onDrawCreated,
    props.onDrawEdited,
    props.onDrawDeleted,
    props.onDrawStart,
    props.onDrawStop,
    props.onDrawVertex,
    props.onEditStart,
    props.onEditMove,
    props.onEditResize,
    props.onEditVertex,
    props.onEditStop,
    props.onDeleteStart,
    props.onDeleteStop,
    props.onToolbarOpened,
    props.onToolbarClosed,
    props.onMarkerContext,
  ]);

  return <DrawProvider value={handleDraw}>{props.children}</DrawProvider>;
};
