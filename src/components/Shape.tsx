import { Rectangle, Circle, Ellipse, Triangle } from "react-shapes";

type ShapeProps = { color: string }
type OvalProps = ShapeProps & {
  radius?: number;
}
type RoundProps = ShapeProps & {
  radius?: number;
}
type SquareProps = ShapeProps & { length?: number}
type RectangleProps = ShapeProps & { width?: number; height?: number}
type TriangleProps = ShapeProps & { width?:number; height?: number;}


const shapes = {
  oval: ({ color, radius = 50 }: OvalProps) => (
    <Ellipse rx={radius} ry={radius} fill={{ color }} />
  ),
  round: ({ color, radius = 50 }: RoundProps) => <Circle r={radius} fill={{ color }} />,
  triangle: ({ color, width = 100, height = 100 }: TriangleProps) => (
    <Triangle width={width} height={height} fill={{ color }} />
  ),
  square: ({ color, length = 100 }: SquareProps) => (
    <Rectangle width={length} height={length} fill={{ color }} />
  ),
  rectangle: ({ color, width = 120, height = 80 }: RectangleProps) => (
    <Rectangle width={width} height={height} fill={{ color }} />
  )
};

export function Shape({ name, color, ...props }) {
  const Component = shapes[name];
  if (Component) {
    return <Component color={color} {...props} />;
  }
  return null;
}
