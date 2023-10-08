import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import DisResContext from "../components/displayvaultcomp/DisResContext";
import DisplayVault from "./DisplayVault";

jest.mock("axios");

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual(`react-router-dom`),
  useNavigate: () => mockedNavigate,
}));

const dispRes1 = {
  v_id: "1",
  v_name: "Test Vault",
  data: "Test Data",
  nominee: [
    {
      n_name: "Nominee 1",
      n_email: "nominee1@example.com",
      n_ph_no: "1234567890",
    },
    {
      n_name: "Nominee 2",
      n_email: "nominee2@example.com",
      n_ph_no: "9876543210",
    },
  ],
  description: "Test description",
};

const dispRes1New = {
  ...dispRes1,
  v_name: "Test Vault Modified",
  nominee: [
    {
      n_name: "Nominee 2",
      n_email: "nominee2@example.com",
      n_ph_no: "9876543210",
    },
    {
      n_name: "Nominee 3",
      n_email: "nominee3@example.com",
      n_ph_no: "1234567890",
    },
  ],
  vaultSecretKey: "vsk",
};
const fetchedvaultorg = jest.fn();

describe("DisplayVault Page", () => {
  test("DisplayVault page renders perfectly", () => {
    render(
      <DisResContext.Provider value={{ dispRes1 }}>
        <DisplayVault />
      </DisResContext.Provider>
    );

    expect(screen.getByRole("button").textContent).toBe("Edit Vault");
    expect(screen.getByTestId("vName").value).toBe("Test Vault");
    expect(screen.getByText("Test Data")).toBeInTheDocument();
    expect(screen.getAllByTestId("nName")[0].value).toBe("Nominee 1");
    expect(screen.getAllByTestId("nEmail")[0].value).toBe(
      "nominee1@example.com"
    );
    expect(screen.getAllByTestId("nPhNo")[0].value).toBe("1234567890");
    expect(screen.getAllByTestId("nName")[1].value).toBe("Nominee 2");
    expect(screen.getAllByTestId("nEmail")[1].value).toBe(
      "nominee2@example.com"
    );
    expect(screen.getAllByTestId("nPhNo")[1].value).toBe("9876543210");
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("DisplayVault page allows editing on clicking Edit Vault button", () => {
    render(
      <DisResContext.Provider value={{ dispRes1 }}>
        <DisplayVault />
      </DisResContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByRole("button").length).toBe(2); // saveChanges,cancel
    expect(screen.getByText("Add Nominee")).toBeInTheDocument();
    expect(screen.getAllByRole("img").length).toBe(4); // delete nominee icons 2 and 2 from header(profile and logo)
    expect(
      screen.getByPlaceholderText("Enter Vault Secret Key")
    ).toBeInTheDocument();

    const v_name = screen.getByPlaceholderText("Enter Vault Name");
    fireEvent.change(v_name, { target: { value: "Test Vault Modified" } });
    expect(v_name.value).toBe("Test Vault Modified");
    // Elements are editable
  });

  test("DisplayVault page saves changes on clicking saveChanges", async () => {
    sessionStorage.setItem("jwt", "mockToken");
    axios.put.mockResolvedValueOnce({ data: { message: "Success" } });
    render(
      <DisResContext.Provider value={{ dispRes1, fetchedvaultorg }}>
        <DisplayVault />
      </DisResContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    const v_name = screen.getByPlaceholderText("Enter Vault Name");
    const vsk = screen.getByPlaceholderText("Enter Vault Secret Key");
    fireEvent.change(v_name, { target: { value: "Test Vault Modified" } });
    expect(screen.getByText("Save Changes")).toBeDisabled();
    //save changes button diabled if any field is empty
    fireEvent.change(vsk, { target: { value: "vsk" } });
    expect(screen.getByText("Save Changes")).not.toBeDisabled();

    expect(screen.getAllByPlaceholderText("Enter Name")[0]).toBeInTheDocument();
    // Add nominee works fine
    const addNomineeButton = screen.getByText("Add Nominee");
    fireEvent.click(addNomineeButton);
    expect(screen.getAllByPlaceholderText("Enter Name")[2]).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("Enter Mail")[2]).toBeInTheDocument();
    expect(
      screen.getAllByPlaceholderText("Enter Number")[2]
    ).toBeInTheDocument();
    fireEvent.change(screen.getAllByPlaceholderText("Enter Name")[2], {
      target: { value: "Nominee 3" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Enter Mail")[2], {
      target: { value: "nominee3@example.com" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Enter Number")[2], {
      target: { value: "1234567890" },
    });

    // Delete nominee works fine
    fireEvent.click(screen.getAllByTestId("delete")[0]);
    await waitFor(() => {
      expect(screen.queryAllByText("Nominee 1").length).toBe(1); // 1 is due to Nominee 1 heading
    });
    expect(screen.queryByText("nominee1@example.com")).toBeNull();
    expect(screen.queryByText("1234567890")).toBeNull();

    fireEvent.click(screen.getByText("Save Changes"));
    await waitFor(() => {
      expect(axios.put).toBeCalledWith(
        `https://trustvault-api.vercel.app/vault/updateVault/1`,
        dispRes1New,
        {
          headers: {
            Authorization: "mockToken",
            "Content-Type": "application/json",
          },
        }
      );
      expect(fetchedvaultorg).toBeCalledWith(dispRes1New);
    });
  });

  test("DisplayVault page discard changes on clicking Cancel", async () => {
    sessionStorage.setItem("jwt", "mockToken");
    render(
      <DisResContext.Provider value={{ dispRes1, fetchedvaultorg }}>
        <DisplayVault />
      </DisResContext.Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    const v_name = screen.getByPlaceholderText("Enter Vault Name");
    const vsk = screen.getByPlaceholderText("Enter Vault Secret Key");
    fireEvent.change(v_name, { target: { value: "Test Vault Modified" } });
    fireEvent.change(vsk, { target: { value: "vsk" } });
    expect(screen.getAllByPlaceholderText("Enter Name")[0]).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    expect(screen.getByTestId("vName").value).toBe("Test Vault");
    expect(screen.queryByText("Vault Secret Key")).toBeNull();
  });
});
