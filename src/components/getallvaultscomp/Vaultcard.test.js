import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Vaultcard from "./Vaultcard";
import { DisResProvider } from "../displayvaultcomp/DisResContext";

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
    const setClickMock = jest.fn();
    const setTargetVIdMock = jest.fn();

    render(
      <DisResProvider>
        <Vaultcard
          content={mock_v_name}
          nomineenames={mock_n_name}
          v_id={mock_v_id}
          setClick={setClickMock}
          setTargetVId={setTargetVIdMock}
        />
      </DisResProvider>
    );

    fireEvent.click(screen.getByTestId("vaultcard"));
    expect(setTargetVIdMock).toHaveBeenCalledWith(1);
    expect(setClickMock).toHaveBeenCalledWith("Display");
  });
});
