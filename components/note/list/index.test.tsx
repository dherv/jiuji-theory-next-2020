import React from "react";
import { render, wait, cleanup, fireEvent } from "@testing-library/react";
import NoteList from "./index";

describe("NoteList", () => {
  const props = {};

  describe("NoteList component", () => {
    describe("user interface", () => {
      const sample = [
        {
          id: 5,
          name: "test1",
          variant: null,
          categoryId: 1,
          positionId: 1,
          teacherId: 1,
          techniqueId: 1,
          createdAt: "2020-02-15T06:37:46.502Z",
          updatedAt: "2020-02-15T06:37:46.502Z",
          noteItems: [
            {
              id: 1,
              text: "test",
              orderNumber: 0,
              noteId: 5,
              createdAt: "2020-02-15T06:37:46.530Z",
              updatedAt: "2020-02-15T06:37:46.530Z"
            }
          ]
        },
        {
          id: 10,
          name: "test2",
          variant: null,
          categoryId: 1,
          positionId: 1,
          teacherId: 1,
          techniqueId: 1,
          createdAt: "2020-02-15T06:40:54.530Z",
          updatedAt: "2020-02-15T06:40:54.530Z",
          noteItems: [
            {
              id: 2,
              text: "test",
              orderNumber: 0,
              noteId: 10,
              createdAt: "2020-02-15T06:40:54.579Z",
              updatedAt: "2020-02-15T06:40:54.579Z"
            }
          ]
        }
      ];
      window.fetch = jest.fn().mockImplementation((url: String) => {
        const fetch = Promise.resolve({
          ok: true,
          json() {
            return sample;
          }
        });
        return fetch;
      });

      afterAll(() => {
        cleanup();
        jest.resetAllMocks();
      });

      test("should display a list of items from the api ", async () => {
        const { getByText } = render(<NoteList />);
        await wait(() => {
          expect(getByText("test1")).toBeDefined();
          expect(getByText("test2")).toBeDefined();
        });
      });
      test("should display the number of items ", () => {});
    });
    describe("events", () => {});
  });
});
