import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Vaultcard from "./Vaultcard";
import axios from "axios";
import { DisResProvider } from "../displayvaultcomp/DisResContext";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

const mock_v_name = "v_name";
const mock_n_name = [
  { n_name: "nom1" },
  { n_name: "nom2" },
  { n_name: "nom3" },
];
const mock_v_id = 1;

describe("VaultCard", () => {
  test("Every vault is rendered correct", () => {
    render(
      <DisResProvider>
        <Vaultcard
          content={mock_v_name}
          nomineenames={mock_n_name}
          v_id={mock_v_id}
        />
      </DisResProvider>
    );

    const vaultCardElement = screen.getByTestId("vaultcard");
    const vaultNameElement = screen.getByTestId("vaultname");

    expect(vaultCardElement).toBeInTheDocument();
    expect(vaultNameElement.textContent).toBe("v_name");
  });

  test("Every vault on hover shows drop-down items", () => {
    render(
      <DisResProvider>
        <Vaultcard
          content={mock_v_name}
          nomineenames={mock_n_name}
          v_id={mock_v_id}
        />
      </DisResProvider>
    );

    fireEvent.mouseOver(screen.getByTestId("vaultcard2"));
    expect(screen.getByRole("list")).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByTestId("vaultcard2"));
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test("Display vault function invokes on clicking on the vaultcard", () => {
    sessionStorage.setItem("jwt", "mockToken");
    const mockPrompt = jest.spyOn(window, "prompt").mockReturnValueOnce("vsk");
    axios.post.mockResolvedValueOnce({ test: "test" });

    render(
      <DisResProvider>
        <Vaultcard
          content={mock_v_name}
          nomineenames={mock_n_name}
          v_id={mock_v_id}
        />
      </DisResProvider>
    );

    fireEvent.click(screen.getByTestId("vaultcard"));
    expect(axios.post).toBeCalledWith(
      "http://localhost:4000/vault/displayVault",
      {
        vId: 1,
        vaultSecretKey: "vsk",
      },
      {
        headers: {
          Authorization: "mockToken",
          "Content-Type": "application/json",
        },
      }
    );
    expect(mockedNavigate).toBeCalled;
  });
});
