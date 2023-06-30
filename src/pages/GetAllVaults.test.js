import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import GetAllVaults from "./GetAllVaults";
import axios from "axios";
import { DisResProvider } from "../components/displayvaultcomp/DisResContext";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

describe("GetAllVaults", () => {
  beforeEach(() => {
    sessionStorage.setItem("jwt", "token");
    axios.get.mockResolvedValue({
      data: {
        filterData: [
          {
            v_id: 1,
            v_name: "Vault 1",
            n_name: [{ n_name: "Nominee 1" }],
          },
        ],
      },
    });
  });

  test("renders the component and fetches the vault data", async () => {
    render(<GetAllVaults />);
    //use effect calls axios.get on every render
    expect(axios.get).toBeCalledWith(
      "http://localhost:4000/vault/getAllVaults",
      {
        headers: {
          Authorization: "token",
        },
      }
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    waitFor(() => {
      expect(screen.findByText("Vault 1")).toBeInTheDocument();
    });
  });

  test("Navigates to add vault page on click add vault button", () => {
    render(<GetAllVaults />);

    fireEvent.click(screen.getByTestId("addVault"));
    expect(mockedNavigate).toBeCalledWith("/addVault");
  });

  test("Opens display popup when vault card is clicked", async () => {
    render(
      <DisResProvider>
        <GetAllVaults />
      </DisResProvider>
    );

    const vaultCard = await screen.findByText("Vault 1");
    fireEvent.click(vaultCard);
    // Shows a display popup
    expect(
      screen.getByPlaceholderText("Enter Vault Secret Key")
    ).toBeInTheDocument();
  });

  test("opens delete popup when vault card is hovered and then clicked on delete option", async () => {
    render(
      <DisResProvider>
        <GetAllVaults />
      </DisResProvider>
    );

    const vaultCard = await screen.findByText("Vault 1");
    // Vault card is hovered
    fireEvent.mouseOver(vaultCard);
    // clicked delete drop down item
    fireEvent.click(screen.getByText("Delete"));
    // Shows a delete popup
    expect(
      screen.getByPlaceholderText("Enter Login Password")
    ).toBeInTheDocument();
  });
});
