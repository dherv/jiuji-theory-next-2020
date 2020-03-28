import React from "react";
import { render, wait, cleanup, fireEvent } from "@testing-library/react";
import NoteList from "./index";

describe("NoteList", () => {
  const sample = [
    { id: 1, name: "optionsSample1" },
    { id: 2, name: "optionsSample2" }
  ];
  const props = {
    options: {
      categories: sample,
      techniques: sample,
      teachers: sample,
      positions: sample
    }
  };

  describe("NoteList component", () => {
    describe("user interface", () => {
      const sample = [
        {
          id: 5,
          name: "note.test1",
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
              text: "note.noteItems.test1",
              orderNumber: 0,
              noteId: 5,
              createdAt: "2020-02-15T06:37:46.530Z",
              updatedAt: "2020-02-15T06:37:46.530Z"
            }
          ]
        },
        {
          id: 10,
          name: "note.test2",
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
              text: "note.noteItems.test2",
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

      test("should fetch and display notes with the note_items", async () => {
        const { queryByText, getAllByText } = render(<NoteList {...props} />);
        await wait();
        expect(queryByText("note.test1")).toBeDefined();
        expect(queryByText("note.test2")).toBeDefined();
        expect(getAllByText("0 - note.noteItems.test1")).toHaveLength(1);
        expect(getAllByText("0 - note.noteItems.test2")).toHaveLength(1);
      });
      test("should display options for each notes", async () => {
        const { queryByText, getAllByText } = render(<NoteList {...props} />);
        await wait();
        expect(getAllByText("optionsSample1")).toHaveLength(6);
        expect(queryByText("optionsSample2")).toBeNull();
      });
    });
    describe("events", () => {});
  });
});
