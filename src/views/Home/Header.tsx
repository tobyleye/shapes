import styled from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { Container } from "./styles";

export const Styled = styled.header`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.09);
  background: #fff;
  margin-bottom: 40px;

  ${Container} {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
  }
`;
export const Logo = styled.div`
  text-transform: uppercase;
  font-size: 20px;
`;

export const LogoutButton = styled.button`
  color: red;
  border: none;
  outline: none;
  background: transparent;
  font-size: inherit;
  cursor: pointer;
`;

export function Header() {
  const { logout } = useAuth();

  return (
    <Styled>
      <Container>
        <Logo>Shapes</Logo>
        <LogoutButton onClick={logout}>
          Logout
        </LogoutButton>
      </Container>
    </Styled>
  );
}
