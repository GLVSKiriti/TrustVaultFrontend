import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginCardStatusCheck from "./LoginCardStatusCheck";
import axios from "axios";

jest.mock("axios");

describe("LoginCardStatusCheck", () => {
  test("Whether Everything render perfectly or not", () => {
    render(<LoginCardStatusCheck />);
    const headElement = screen.getByText("Status Check With Login");
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const logButton = screen.getByRole("button");

    expect(headElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(logButton).toBeInTheDocument();
  });

  test("Email changes on user input", () => {
    render(<LoginCardStatusCheck />);
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const testValue = "test";

    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe("test");
  });

  test("Password changes on user input", () => {
    render(<LoginCardStatusCheck />);
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const testValue = "test";

    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe("test");
  });

  test("Button should be diabled when there are no inputs", () => {
    render(<LoginCardStatusCheck />);

    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const logButton = screen.getByRole("button");

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(logButton).toBeDisabled();
  });

  test("Button should be enabled when there are inputs", () => {
    render(<LoginCardStatusCheck />);

    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const logButton = screen.getByRole("button");
    const testValue = "test";

    fireEvent.change(emailInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });

    expect(logButton).toBeEnabled();
  });

  test("Status check function will be invoken on clicking button", async () => {
    axios.post.mockResolvedValueOnce({ data: { error: "test" } });

    render(<LoginCardStatusCheck />);
    const emailInput = screen.getByPlaceholderText("Enter Email");
    const passwordInput = screen.getByPlaceholderText("Enter Password");
    const logButton = screen.getByRole("button");
    const testValue = "test";

    fireEvent.change(emailInput, { target: { value: testValue } });
    fireEvent.change(passwordInput, { target: { value: testValue } });

    fireEvent.click(logButton);

    expect(axios.post).toBeCalledWith(
      "https://trustvault-api.vercel.app/cron/statusCheck",
      {
        email: "test",
        password: "test",
      }
    );
    await waitFor(() => {
      expect(screen.getAllByTestId("afterClick")).toHaveLength(1);
    });
  });
});
