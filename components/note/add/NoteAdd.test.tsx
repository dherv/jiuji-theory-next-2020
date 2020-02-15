import React from "react";
import NoteAdd from "./index";
import {
  render,
  wait,
  waitForElement,
  getByPlaceholderText,
  cleanup,
  fireEvent,
  getByText
} from "@testing-library/react";

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

    describe("user interface", () => {
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
    });
    describe("events", () => {});
  });
});
