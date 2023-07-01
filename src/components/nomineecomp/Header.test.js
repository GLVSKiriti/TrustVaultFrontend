import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("Header Component", () => {
  test("Header component renders correctly", () => {
    render(<Header />);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
  });
});
