import { fireEvent, render, screen } from "@testing-library/react";
import ThreeDcard from "./ThreeDcard";
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

test("Should flip the card when flipper function is called", () => {
  render(<ThreeDcard />);

  const card = screen.getByTestId("ThreeDcard");
  expect(card).toHaveClass("card");

  fireEvent.click(screen.getByTestId("cardrTest"));
  expect(card).toHaveClass("card is-flipped");

  fireEvent.click(screen.getByTestId("cardrTest2"));
  expect(card).toHaveClass("card");
});
