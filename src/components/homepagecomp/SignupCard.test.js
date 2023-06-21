import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "./SignupCard";
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

test("Username,Email,Password,RePassword and Signup button are rendered", () => {
  render(<SignUp />);
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText("Enter Password");
  const rePasswordInput = screen.getByPlaceholderText("Enter Password Again");
  const signUpButton = screen.getByRole("button");
  const otherElements = screen.getAllByRole("heading");

  expect(usernameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(rePasswordInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
  expect(otherElements).toHaveLength(2);
});

test("Username,Email,Password,RePassword should be empty initialy", () => {
  render(<SignUp />);
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText("Enter Password");
  const rePasswordInput = screen.getByPlaceholderText("Enter Password Again");
  const signUpButton = screen.getByRole("button");

  expect(usernameInput.value).toBe("");
  expect(emailInput.value).toBe("");
  expect(passwordInput.value).toBe("");
  expect(rePasswordInput.value).toBe("");
  expect(signUpButton).toBeDisabled();
});

test("Username input should change", () => {
  render(<SignUp />);
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  expect(usernameInput.value).toBe(testValue);
});

test("Email input should change", () => {
  render(<SignUp />);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const testValue = "test";

  fireEvent.change(emailInput, { target: { value: testValue } });
  expect(emailInput.value).toBe(testValue);
});

test("Password input should change", () => {
  render(<SignUp />);
  const passwordInput = screen.getByPlaceholderText("Enter Password");
  const testValue = "test";

  fireEvent.change(passwordInput, { target: { value: testValue } });
  expect(passwordInput.value).toBe(testValue);
});

test("RePassword input should change", () => {
  render(<SignUp />);
  const rePasswordInput = screen.getByPlaceholderText("Enter Password Again");
  const testValue = "test";

  fireEvent.change(rePasswordInput, { target: { value: testValue } });
  expect(rePasswordInput.value).toBe(testValue);
});

test("SignUp Button should be enabled when inputs exist", () => {
  render(<SignUp />);
  const usernameInput = screen.getByPlaceholderText(/Username/i);
  const emailInput = screen.getByPlaceholderText(/Enter Email/i);
  const passwordInput = screen.getByPlaceholderText("Enter Password");
  const rePasswordInput = screen.getByPlaceholderText("Enter Password Again");
  const signUpButton = screen.getByRole("button");
  const testValue = "test";

  fireEvent.change(usernameInput, { target: { value: testValue } });
  fireEvent.change(emailInput, { target: { value: testValue } });
  fireEvent.change(passwordInput, { target: { value: testValue } });
  fireEvent.change(rePasswordInput, { target: { value: testValue } });

  expect(signUpButton).toBeEnabled();
});
