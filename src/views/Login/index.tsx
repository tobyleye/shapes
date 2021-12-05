import { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { login as $login } from "./service";

const Button = styled.button`
  border: none;
  outline: none;
  background: rgb(0,0,255);
  color: #fff;
  height: 40px;
  font-size: inherit;
  border-radius: 4px;
  padding: 0 20px;
  display: block;
  width: 100%;

  &:disabled {
    background: rgba(0, 0, 255, .5);
  }

  &:not(:disabled) {
    cursor: pointer;
  }
`;

const Input  = styled.input<{ error?: boolean}>`
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


const Title = styled.h3`
text-align: center;
margin-bottom: 25px;
font-size: 28px;
`;

const slidein = keyframes`
from{
  transform: translateX(40px);
  opacity:0;
}
to {
  transform: translateX(0);
  opacity:1;
}

` 
const FormContainer = styled.div`
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  padding: 40px 30px;
  border-radius: 4px;
  animation: ${slidein} .4s ease .1s both;
`;

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -80%);
  max-width: 380px;
  width: 100%;
  padding: 10px;
`;



const Field = styled.div`
  margin-bottom: 20px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  ${Input} {
    padding-right: 34px;
  }

  .visibility-toggle {
    border: none;
    background: transparent;
    outline: none;
    position: absolute;
    right: 3px;
    top: 50%;
    font-size: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }

`
export function PasswordInput(props) {
  const [show, setShow] = useState(false)
  return (
    <PasswordWrapper>
      <Input {...props} type={show ? 'text' : 'password'}  />
      <button type="button" className="visibility-toggle" onClick={() => setShow(show => !show)}>
        { show ? '🐵' : '🙈'}
      </button>
    </PasswordWrapper>
  )
}

export default function Login({pass=''}) {
  const [password, setPassword] = useState(pass);
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
    <LoginContainer>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={submit}>
          <Field>
            <PasswordInput
              error={error}
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value)}
              }
              required
              aria-label="password"
            />
            {error && (
              <p style={{ color: "red", marginTop: 4 }}>Incorrect password.</p>
            )}
          </Field>
          <Button disabled={loading}>{loading ? 'Loading...' : 'Login' }</Button>
        </form>
      </FormContainer>
    </LoginContainer>
  );
}
