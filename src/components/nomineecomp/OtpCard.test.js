import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import OtpCard from "./OtpCard";
import axios from "axios";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

jest.mock("axios");

describe("OtpCard Component", () => {
  test("Component renders perfectly", () => {
    render(<OtpCard />);
    expect(screen.getByRole("heading").textContent).toBe("Verify Your Mail");
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toBe("Send OTP");
  });

  test("Email/Otp changes on user input and button diabled on empty input", () => {
    const testValue = "test";
    render(<OtpCard />);

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByRole("input");
    expect(buttonElement).toBeDisabled();
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(inputElement.value).toBe("test");
    expect(buttonElement).not.toBeDisabled();
  });

  test("Verify email function is called onClick Send OTP button with valid email structure", async () => {
    axios.post.mockResolvedValueOnce({
      data: { token: "mockToken", message: "OTP sent successfully" },
    });
    const testValue = "test@gmail.com";
    render(<OtpCard />);

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByRole("input");
    fireEvent.change(inputElement, { target: { value: testValue } });
    fireEvent.click(buttonElement);

    expect(axios.post).toBeCalledWith("http://localhost:4000/nominee/email", {
      email: "test@gmail.com",
    });
    await waitFor(() => {
      expect(screen.getByText("OTP sent successfully")).toBeInTheDocument();
    });

    expect(screen.getByRole("heading").textContent).toBe("Verify Your OTP");
    expect(screen.getByPlaceholderText("Enter OTP")).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toBe("Verify OTP");

    expect(screen.getByRole("heading").textContent).not.toBe(
      "Verify Your Mail"
    );
    expect(screen.queryByPlaceholderText("Enter Email")).toBeNull();
    expect(screen.getByRole("button").textContent).not.toBe("Send OTP");
  });

  test("Verify email function is called onClick Send OTP button with invalid email structure", async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { error: "Enter a valid email" },
      },
    });
    const testValue = "test";
    render(<OtpCard />);

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByRole("input");
    fireEvent.change(inputElement, { target: { value: testValue } });
    fireEvent.click(buttonElement);

    expect(axios.post).toBeCalledWith("http://localhost:4000/nominee/email", {
      email: "test",
    });
    await waitFor(() => {
      expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
    });
  });

  test("Verify Otp function is called onClick Verify OTP button with correct OTP", async () => {
    const urlParams = new URLSearchParams();
    urlParams.set("v_id", "2");
    window.history.pushState({}, "", `/nominee/otp?${urlParams.toString()}`);

    axios.post
      .mockResolvedValue({
        data: { message: "Success", description: "Hello , Guys" },
      })
      .mockResolvedValueOnce({
        data: { token: "mockToken", message: "OTP sent successfully" },
      });
    const testEmail = "test@gmail.com";
    const testOtp = "123456";
    render(<OtpCard />);

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByRole("input");
    fireEvent.change(inputElement, { target: { value: testEmail } });
    fireEvent.click(buttonElement);
    expect(axios.post).toBeCalled();
    await waitFor(() => {
      expect(screen.getByText("OTP sent successfully")).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: testOtp } });
    fireEvent.click(buttonElement);

    expect(axios.post).toBeCalledWith(
      "http://localhost:4000/nominee/otpverify",
      {
        otp: "123456",
        v_id: "2",
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "mockToken",
        },
      }
    );
  });

  test("Verify Otp function is called onClick Verify OTP button with wrong OTP", async () => {
    const urlParams = new URLSearchParams();
    urlParams.set("v_id", "2");
    window.history.pushState({}, "", `/nominee/otp?${urlParams.toString()}`);

    axios.post
      .mockRejectedValue({
        response: {
          status: 401,
          data: {
            error: "Wrong OTP",
          },
        },
      })
      .mockResolvedValueOnce({
        data: { token: "mockToken", message: "OTP sent successfully" },
      });
    const testEmail = "test@gmail.com";
    const testOtp = "123456";
    render(<OtpCard />);

    const buttonElement = screen.getByRole("button");
    const inputElement = screen.getByRole("input");
    fireEvent.change(inputElement, { target: { value: testEmail } });
    fireEvent.click(buttonElement);
    expect(axios.post).toBeCalled();
    await waitFor(() => {
      expect(screen.getByText("OTP sent successfully")).toBeInTheDocument();
    });

    fireEvent.change(inputElement, { target: { value: testOtp } });
    fireEvent.click(buttonElement);

    expect(axios.post).toBeCalledWith(
      "http://localhost:4000/nominee/otpverify",
      {
        otp: "123456",
        v_id: "2",
      },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "mockToken",
        },
      }
    );
    await waitFor(() => {
      expect(screen.getByText("Wrong OTP")).toBeInTheDocument();
    });
  });
});
