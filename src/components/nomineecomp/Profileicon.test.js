import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profileicon from "./Profileicon";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("Profileicon Component", () => {
  test("Everything renders perfectly", () => {
    render(<Profileicon />);

    expect(screen.getByTestId("profile")).toBeInTheDocument();
  });
  test("On mouseOver and mouseLeave drop down genrates / not", () => {
    render(<Profileicon />);
    const profile = screen.getByTestId("profile");

    fireEvent.mouseOver(profile);
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("LogOut")).toBeInTheDocument();
    fireEvent.mouseLeave(profile);
    expect(screen.queryByText("Profile")).toBeNull();
    expect(screen.queryByText("LogOut")).toBeNull();
  });
  test("On clicking on logout navigates to home page by removing token from session storage", () => {
    sessionStorage.setItem("jwt", "token");
    render(<Profileicon />);
    const profile = screen.getByTestId("profile");

    fireEvent.mouseOver(profile);
    const logout = screen.getByText("LogOut");
    fireEvent.click(logout);

    expect(mockedNavigate).toBeCalledWith("/");
  });
});
