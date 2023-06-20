import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Logincard";
import "@testing-library/jest-dom";

const mockedNavigate = jest.fn();

jest.mock("axios", () => ({
  __esmodule: true,

  default: {
    post: () => ({
      data: { message: "Login sucessfull", token: "mockToken" },
    }),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

test("Email,Password,Login Button should be rendered", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const loginButton = screen.getByRole("button");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("Email and password input should be empty initially", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const loginButton = screen.getByRole("button");

  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(loginButton).toBeDisabled();
});

test("Email input should change", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const testValue = "test";

  fireEvent.change(emailInput, { target: { value: testValue } });
  expect(emailInput.value).toBe(testValue);
});

test("Password input should change", () => {
  render(<Login />);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const testValue = "test";

  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("Login Button should be enabled when inputs exist", () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText(/Enter Password/i);
  const loginButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(emailInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });

  expect(loginButton).toBeEnabled();
});
