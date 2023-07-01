import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddVault from "./AddVault";
import axios from "axios";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("AddVault Page", () => {
  test("AddVault page renders correctly", () => {
    render(<AddVault />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBe(2); // AddVault and cancel buttons
    expect(screen.getAllByRole("heading").length).toBe(7); // vault name,data,nominee details,nominee 1,vault secret key,description and one heading from header
    expect(screen.getByPlaceholderText("Enter Vault Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Your Data Here")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Number")).toBeInTheDocument();
    expect(screen.getAllByTestId("deleteNominee").length).toBe(1);
    expect(
      screen.getByPlaceholderText("Enter Vault Secret Key")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Describe about the Vault Secret Key/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Add Nominee")).toBeInTheDocument();
  });

  test("Adds a nominee when Add Nominee button is clicked", () => {
    render(<AddVault />);
    const addNomButton = screen.getByText("Add Nominee");
    fireEvent.click(addNomButton);
    const nomineeDetails = screen.getAllByTestId("nomineedetails");
    expect(nomineeDetails.length).toBe(2);
  });

  test("Deletes the nominee whose delete button is clicked", () => {
    render(<AddVault />);
    const addNomButton = screen.getByText("Add Nominee");
    fireEvent.click(addNomButton);

    const nomineeDetails = screen.getAllByTestId("nomineedetails");
    expect(nomineeDetails.length).toBe(2);

    const deleteNomButton = screen.getAllByTestId("deleteNominee")[0];
    fireEvent.click(deleteNomButton);

    const updatedNomineeDetails = screen.getAllByTestId("nomineedetails");
    expect(updatedNomineeDetails.length).toBe(1);
  });

  test("Navigates to getAllVaults page when cancel button is clicked", () => {
    render(<AddVault />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockedNavigate).toBeCalledWith("/getAllVaults");
  });

  test("Calls addVaultAPI when clicked on Add Vault button", async () => {
    sessionStorage.setItem("jwt", "token");
    axios.post.mockResolvedValueOnce({
      data: { message: "Vault added successfully" },
    });
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const testValue = "test";
    render(<AddVault />);
    const vaultName = screen.getByPlaceholderText("Enter Vault Name");
    const data = screen.getByPlaceholderText("Enter Your Data Here");
    const n_name = screen.getByPlaceholderText("Enter Name");
    const n_email = screen.getByPlaceholderText("Enter Mail");
    const n_number = screen.getByPlaceholderText("Enter Number");
    const vsk = screen.getByPlaceholderText("Enter Vault Secret Key");
    const desc = screen.getByPlaceholderText(
      /Describe about the Vault Secret Key/i
    );

    fireEvent.change(vaultName, { target: { value: testValue } });
    fireEvent.change(data, { target: { value: testValue } });
    fireEvent.change(n_name, { target: { value: testValue } });
    fireEvent.change(n_email, { target: { value: testValue } });
    fireEvent.change(n_number, { target: { value: testValue } });
    fireEvent.change(vsk, { target: { value: testValue } });
    fireEvent.change(desc, { target: { value: testValue } });

    const addVaultButton = screen.getByText("Add Vault");
    fireEvent.click(addVaultButton);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:4000/vault/addVault",
      {
        v_name: "test",
        data: "test",
        nomineeDetails: [
          {
            n_name: "test",
            n_email: "test",
            n_ph_no: "test",
          },
        ],
        vaultSecretKey: "test",
        description: "test",
      },
      {
        headers: {
          Authorization: "token",
          "Content-Type": "application/json",
        },
      }
    );

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Vault added successfully");
    });

    expect(mockedNavigate).toBeCalledWith("/getAllVaults");
  });
});
