import styled from "styled-components";
import { Shape } from "../../components/Shape";

const Container = styled.div`
  background: #fff;
  padding: 20px;
  display: grid;
  place-items: center;
`;

export function Item({ shape, color, ...props }) {
  return (
    <Container>
      <Shape name={shape} color={color} {...props} />
    </Container>
  );
}
