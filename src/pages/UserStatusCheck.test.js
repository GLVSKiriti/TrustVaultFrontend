import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserStatusCheck from "./UserStatusCheck";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("UserStatusCheck", () => {
  test("Every component renders perfectly", () => {
    render(<UserStatusCheck />);
    const headerElement = screen.getByTestId("header");
    const loginCardStatusCheck = screen.getByTestId("logCardStatusCheck");

    expect(headerElement).toBeInTheDocument();
    expect(loginCardStatusCheck).toBeInTheDocument();
  });
});
