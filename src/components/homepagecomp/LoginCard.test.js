import { fireEvent, render, screen } from "@testing-library/react";
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
  const otherElements = screen.getAllByRole("heading");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
  expect(otherElements).toHaveLength(3);
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

test("flipper function is called when clicked on signUp", () => {
  const mockFlipper = jest.fn();

  render(<Login flip={mockFlipper} />);
  const signUpText = screen.getByTestId("cardrTest");

  fireEvent.click(signUpText);

  expect(mockFlipper).toHaveBeenCalled();
});
