import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useLocation } from "react-router-dom";
import VaultDataForNom from "./VaultDataForNom";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: () => mockedNavigate,
}));

describe("VaultDataForNom page", () => {
  test("", () => {
    const urlParams = new URLSearchParams();
    urlParams.set("v_id", "2");
    window.history.pushState({}, "", `/nominee/vault?${urlParams.toString()}`);
    useLocation.mockReturnValue({ state: "Test Description" });

    render(<VaultDataForNom />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("v_data_for_nom_page")).toBeInTheDocument();
  });
});
