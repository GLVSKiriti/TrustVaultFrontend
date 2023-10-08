import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PopUp from "./PopUp";
import axios from "axios";
import { DisResProvider } from "../displayvaultcomp/DisResContext";

jest.mock("axios");
const setClickMock = jest.fn();

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("Popup", () => {
  test("In a Popup, password should be rendered and empty initially", () => {
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement.value).toBe("");
  });

  test("In a PopUp, password input should change", () => {
    const testValue = "test";
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    fireEvent.change(passwordElement, { target: { value: testValue } });
    expect(passwordElement.value).toBe("test");
  });

  test("In a popup, button should be disabled if password field is empty", () => {
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    const funcButton = screen.getByTestId("funcButton");
    expect(passwordElement.value).toBe("");
    expect(funcButton).toBeDisabled();
  });

  test("In a popup, button should be enabled if password field is not empty", () => {
    const testValue = "test";
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    const funcButton = screen.getByTestId("funcButton");
    fireEvent.change(passwordElement, { target: { value: testValue } });
    expect(funcButton).not.toBeDisabled();
  });

  test('In a popup, cancel button shoud set isClick to empty string "" ', () => {
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const cancelButton = screen.getByTestId("cancelButton");
    fireEvent.click(cancelButton);
    expect(setClickMock).toHaveBeenCalledWith("");
  });

  test("In a delete popup, deleteVault function is called on click the delete button with correct password", async () => {
    const testValue = "test";
    sessionStorage.setItem("jwt", "token");
    axios.delete.mockResolvedValueOnce({
      data: { message: "Succefully Vault Is Deleted" },
    });
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    const funcButton = screen.getByTestId("funcButton");
    fireEvent.change(passwordElement, { target: { value: testValue } });
    fireEvent.click(funcButton);

    expect(axios.delete).toBeCalledWith(
      `https://trustvault-api.vercel.app/vault/deleteVault/1`,
      {
        headers: {
          Authorization: "token",
        },
        data: {
          password: "test",
        },
      }
    );
    await waitFor(() => {
      expect(setClickMock).toHaveBeenCalledWith("");
    });
  });

  test("In a display popup, displayVault function is called on click the display button with correct password", async () => {
    const testValue = "test";
    sessionStorage.setItem("jwt", "token");
    axios.post.mockResolvedValueOnce({
      data: { v_name: "vaultname", nominee: "mock" }, //mock vault data should be given
    });
    render(
      <DisResProvider>
        <PopUp type="Display" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText(
      "Enter Vault Secret Key"
    );
    const funcButton = screen.getByTestId("funcButton");
    fireEvent.change(passwordElement, { target: { value: testValue } });
    fireEvent.click(funcButton);

    expect(axios.post).toBeCalledWith(
      "https://trustvault-api.vercel.app/vault/displayVault",
      {
        vId: "1",
        vaultSecretKey: "test",
      },
      {
        headers: {
          Authorization: "token",
          "Content-Type": "application/json",
        },
      }
    );
    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("/displayVault");
    });
  });

  test("In a delete/display popup, onClick delete/display button with wrong password", async () => {
    const testValue = "test";
    sessionStorage.setItem("jwt", "token");
    axios.delete.mockRejectedValueOnce({
      response: { status: 401, data: { error: "Wrong Password" } },
    });
    render(
      <DisResProvider>
        <PopUp type="Delete" setClick={setClickMock} v_id="1" />
      </DisResProvider>
    );
    const passwordElement = screen.getByPlaceholderText("Enter Login Password");
    const funcButton = screen.getByTestId("funcButton");
    const errorDiv = screen.getByTestId("errorDiv");
    fireEvent.change(passwordElement, { target: { value: testValue } });
    fireEvent.click(funcButton);

    expect(axios.delete).toBeCalledWith(
      `https://trustvault-api.vercel.app/vault/deleteVault/1`,
      {
        headers: {
          Authorization: "token",
        },
        data: {
          password: "test",
        },
      }
    );
    await waitFor(() => {
      expect(errorDiv.textContent).toBe("Wrong Password");
    });
  });
});
