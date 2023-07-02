import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import VaultDesKeyCard from "./VaultDesKeycard";
import axios from "axios";

jest.mock("axios");

describe("vaultDesKeycard component", () => {
  test("Component rendered perfectly", () => {
    render(
      <VaultDesKeyCard description={"City where we met first"} v_id={1} />
    );

    expect(screen.getAllByRole("heading").length).toBe(2);
    expect(screen.getByText("City where we met first")).toBeInTheDocument();
    expect(screen.getByText("Enter The SecretKey")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Key")).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toBe("Submit");
  });

  test("vaultSecretKey changes on user input and submit button should be diabled for empty input", () => {
    render(
      <VaultDesKeyCard description={"City where we met first"} v_id={1} />
    );
    const testValue = "vsk";

    const inputElement = screen.getByPlaceholderText("Enter Key");
    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(inputElement.value).toBe("vsk");
    expect(submitButton).not.toBeDisabled();
  });

  test("getVaultData function is called onClick submit button with correct key", async () => {
    axios.post.mockResolvedValue({
      data: { vault_data: "I had 1000₹ in locker" },
    });
    const testValue = "vsk";
    render(
      <VaultDesKeyCard description={"City where we met first"} v_id={1} />
    );

    const inputElement = screen.getByPlaceholderText("Enter Key");
    const submitButton = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: testValue } });
    fireEvent.click(submitButton);

    expect(axios.post).toBeCalledWith(
      "http://localhost:4000/nominee/vaultData",
      {
        vault_secret_key: "vsk",
        v_id: 1,
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Vault Data From The User")).toBeInTheDocument();
      expect(screen.getByText("I had 1000₹ in locker")).toBeInTheDocument();
    });
  });

  test("getVaultData function is called onClick submit button with wrong key", async () => {
    axios.post.mockRejectedValue({
      response: { status: 401, data: { error: "Wrong Secret key" } },
    });
    const testValue = "vsk";
    render(
      <VaultDesKeyCard description={"City where we met first"} v_id={1} />
    );

    const inputElement = screen.getByPlaceholderText("Enter Key");
    const submitButton = screen.getByRole("button");

    fireEvent.change(inputElement, { target: { value: testValue } });
    fireEvent.click(submitButton);

    expect(axios.post).toBeCalledWith(
      "http://localhost:4000/nominee/vaultData",
      {
        vault_secret_key: "vsk",
        v_id: 1,
      }
    );

    await waitFor(() => {
      expect(screen.getByText("Wrong Secret key")).toBeInTheDocument();
    });
  });
});
