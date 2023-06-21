import { fireEvent, render, screen } from "@testing-library/react";
import HomeApp from "./HomeApp";
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

describe("HomeApp", () => {
  test("Should redirect to /getAllVaults if jwt token exist in session storage", () => {
    sessionStorage.setItem("jwt", "mockToken");

    render(<HomeApp />);
    expect(mockedNavigate).toHaveBeenCalledWith("/getAllVaults");
  });

  test("Title,Cover,Caption,ThreeDcard components are rendered", () => {
    render(<HomeApp />);

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("cover")).toBeInTheDocument();
    expect(screen.getByTestId("caption")).toBeInTheDocument();
    expect(screen.getByTestId("ThreeDcard")).toBeInTheDocument();
  });
});
