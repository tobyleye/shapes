import { useState } from "react";
import styled, { css } from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { fakePass, login as $login } from "./service";

const Button = styled.button`
  border: none;
  outline: none;
  background: rgb(0,0,255);
  color: #fff;
  height: 40px;
  font-size: inherit;
  cursor: pointer;
  border-radius: 4px;
  padding: 0 20px;
  display: block;
  width: 100%;

  &:disabled {
    background: rgba(0, 0, 255, .5);
  }
`;

const Input  = styled.input<{ error: boolean}>`
  border: none;
  font: inherit;
  height: 44px;
  padding: 0 18px;
  border-radius: 5px;
  display: block;
  width: 100%;
  box-sizing: border-box;
  background: #f4f4f4;

  ${props => props.error && css`
    background: rgba(255, 0, 0, .1);
  `}

  
  &:focus {
    background: none;
    border: 1px solid #ddd;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.09);
    outline: none;

    ${props => props.error && css`
      border-color: red;
    `}
  }
`;

const FormContainer = styled.div`
  width: 300px;
  margin: auto;
  background: #fff;
  border: 1px solid #ccc;
  padding: 40px 30px;
  border-radius: 4px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 25px;
  font-size: 28px;
`;

const LoginWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
`;

const Field = styled.div`
  margin-bottom: 20px;
`;

export default function Login() {
  const [password, setPassword] = useState(fakePass);
  const [error, setError] = useState(false);
  const { loginSuccess } = useAuth();
  const [loading, setLoading] = useState(false);

  const resetError = () => error && setError(false)

  const submit = async (e) => {
   resetError()
    e.preventDefault();
    try {
      setLoading(true);
      await $login(password);
      setLoading(false);
      loginSuccess();
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <LoginWrapper>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={submit}>
          <Field>
            <Input
              error={error}
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                // reset error;
               resetError()
                setPassword(e.target.value)}
              }
              required
            />
            {error && (
              <p style={{ color: "red", marginTop: 4 }}>Incorrect password.</p>
            )}
          </Field>
          <Button disabled={loading}>{loading ? 'Loading...' : 'Login' }</Button>
        </form>
      </FormContainer>
    </LoginWrapper>
  );
}
