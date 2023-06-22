import { render, screen, fireEvent } from "@testing-library/react";
import DropDownItem from "./DropDownItem";
import "@testing-library/jest-dom";
import axios from "axios";

jest.mock("axios");

describe("DropDownItem", () => {
  test("Nominees list is rendering when hovers on nominee Item", () => {
    const nomineenames = [
      { n_name: "nom1" },
      { n_name: "nom2" },
      { n_name: "nom3" },
    ];
    const usernamelogo = "usernamelogo";

    render(
      <DropDownItem
        image={usernamelogo}
        content="Nominees"
        n_name={nomineenames}
      />
    );
    const container = screen.getByTestId("dropDownItem");

    fireEvent.mouseOver(container);
    expect(screen.getAllByTestId("nominee")).toHaveLength(3);

    fireEvent.mouseLeave(container);
    expect(screen.queryAllByTestId("nominee")).toHaveLength(0);
  });

  test("should call deleteVault function onClick if content is delete", () => {
    const deletelogo = "deletelogo";
    sessionStorage.setItem("jwt", "mockToken");

    const promptMock = jest.spyOn(window, "prompt");
    promptMock.mockReturnValueOnce("password");

    axios.delete.mockResolvedValueOnce({
      data: { message: "Deleted successfully" },
    });

    render(<DropDownItem image={deletelogo} content="Delete" v_id="12" />);
    const container = screen.getByTestId("dropDownItem");

    fireEvent.click(container);

    expect(axios.delete).toBeCalledWith(
      `http://localhost:4000/vault/deleteVault/12`,
      {
        headers: {
          Authorization: "mockToken",
        },
        data: {
          password: "password",
        },
      }
    );
  });
});
