import { createContext } from 'react'

export enum DrawType {
  POLYLINE,
  POLYGON,
  RECTANGLE,
  CIRCLE,
  MARKER,
  CIRCLE_MARKER
}

export type DrawDispatcher = (drawType: DrawType) => void

export const DrawContext = createContext<DrawDispatcher | null>(null)

export const DrawProvider = DrawContext.Provider
