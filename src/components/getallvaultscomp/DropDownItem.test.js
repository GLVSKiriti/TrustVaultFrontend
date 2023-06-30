import { render, screen, fireEvent } from "@testing-library/react";
import DropDownItem from "./DropDownItem";
import "@testing-library/jest-dom";

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

  test("should set the isClick and targetVid values onClick if content is delete", () => {
    const deletelogo = "deletelogo";
    const setClickMock = jest.fn();
    const setTargetVIdMock = jest.fn();
    render(
      <DropDownItem
        image={deletelogo}
        content="Delete"
        v_id="12"
        setClick={setClickMock}
        setTargetVId={setTargetVIdMock}
      />
    );

    const container = screen.getByTestId("dropDownItem");

    fireEvent.click(container);

    expect(setTargetVIdMock).toHaveBeenCalledWith("12");
    expect(setClickMock).toHaveBeenCalledWith("Delete");
  });
});
