import { Rectangle, Circle, Ellipse, Triangle } from "react-shapes";

const shapes = {
  oval: ({ color, radius = 50 }) => (
    <Ellipse rx={40} ry={60} fill={{ color }} />
  ),
  round: ({ color, radius = 50 }) => <Circle r={radius} fill={{ color }} />,
  triangle: ({ color, width = 100, height = 100 }) => (
    <Triangle width={width} height={height} fill={{ color }} />
  ),
  square: ({ color, length = 100 }) => (
    <Rectangle width={length} height={length} fill={{ color }} />
  ),
  rectangle: ({ color, width = 120, height = 80 }) => (
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
