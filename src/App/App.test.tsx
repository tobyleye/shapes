import { render } from '@testing-library/react';
import App from '.';
import { AuthProvider } from "../contexts/Auth"

test('renders without crashing', () => {
  render(<AuthProvider><App /></AuthProvider>);
});
