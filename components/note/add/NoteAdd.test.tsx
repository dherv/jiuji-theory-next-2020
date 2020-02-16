import React from "react";
import NoteAdd from "./index";
import { render, wait, cleanup, fireEvent } from "@testing-library/react";

describe("NoteAdd", () => {
  const props = {};

  describe("NoteAdd component", () => {
    window.fetch = jest.fn().mockImplementation((url: String) => {
      const fetch = Promise.resolve({
        ok: true,
        json() {
          return [
            { id: 1, name: "test1" },
            { id: 2, name: "test2" }
          ];
        }
      });
      return fetch;
    });

    afterAll(() => {
      cleanup();
      jest.resetAllMocks();
    });
    it("should display one form", async () => {
      expect.assertions(1);
      const { getByRole } = render(<NoteAdd />);
      await wait(() => expect(getByRole("form")).toBeDefined());
    });
    it("should display one input text with a placeholder 'name'", async () => {
      expect.assertions(1);
      const { getByPlaceholderText } = render(<NoteAdd />);
      await wait(() => expect(getByPlaceholderText("name")).toBeDefined());
    });
    it("should display 4 NoteAddSelect components", async () => {
      const { getAllByText } = render(<NoteAdd />);
      await wait(() => {
        expect(getAllByText("test1")).toHaveLength(4);
      });
    });
    it("should display the first input of text add", async () => {
      const { getAllByLabelText } = render(<NoteAdd />);
      await wait(() => {
        expect(getAllByLabelText("1 -")).toHaveLength(1);
      });
    });
    it("should store the text of the first on enter click and display the second input", async () => {
      const { getByLabelText, getByDisplayValue } = render(<NoteAdd />);
      await wait(() => {
        const firstInput = getByLabelText("1 -");
        fireEvent.change(firstInput, { target: { value: "23" } });
        expect(getByDisplayValue("23")).toBeTruthy();
        fireEvent.keyDown(firstInput, { key: "Enter", keyCode: 13 });
        expect(getByLabelText("2 -")).toBeTruthy();
      });
    });

    it("should submit the form when clicking submit button", async () => {
      const { getByRole, getByLabelText, queryByLabelText } = render(
        <NoteAdd />
      );
      const firstInput = getByLabelText("1 -");
      fireEvent.change(firstInput, { target: { value: "23" } });
      fireEvent.keyDown(firstInput, { key: "Enter", keyCode: 13 });
      const submitButton = getByRole("button");
      fireEvent.click(submitButton);
      await wait(() => {
        expect(queryByLabelText("2 -")).toBeNull();
      });
    });

    it("should submit the form when clicking submit button", async () => {
      const { getByRole, getByLabelText, queryByLabelText } = render(
        <NoteAdd />
      );
      const firstInput = getByLabelText("1 -");
      fireEvent.change(firstInput, { target: { value: "23" } });
      fireEvent.keyDown(firstInput, { key: "Enter", keyCode: 13 });

      // pressing enter should not submit the form
      expect(queryByLabelText("2 -")).not.toBeNull();

      // submitting the form should clear the first input and remove the others
      const submitButton = getByRole("button");
      fireEvent.click(submitButton);
      await wait(() => {
        expect(queryByLabelText("2 -")).toBeNull();
      });

      // the count should be reset
      fireEvent.change(firstInput, { target: { value: "23" } });
      fireEvent.keyDown(firstInput, { key: "Enter", keyCode: 13 });

      await wait(() => {
        expect(queryByLabelText("2 -")).not.toBeNull();
      });
    });

    it("should update the current selected option when choosing an option in a select", async () => {
      const { getAllByDisplayValue } = render(<NoteAdd />);
      // check the options come from the api. There are 4 selects
      await wait(() => {
        expect(getAllByDisplayValue("test1")).toHaveLength(4);
      });

      fireEvent.change(getAllByDisplayValue("test1")[0], {
        target: { value: 2 }
      });

      await wait(() => {
        expect(getAllByDisplayValue("test2")).toHaveLength(1);
      });
    });
  });
});
