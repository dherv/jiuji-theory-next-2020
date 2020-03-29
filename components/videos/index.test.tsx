import React from "react";
import {
  render,
  cleanup,
  wait,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Videos from ".";
import { TestUtils } from "../../test/test.utils";

describe("Videos component", () => {
  const props = {};
  const fetch = () =>
    jest.fn().mockImplementation((url: String) => {
      const fetch = Promise.resolve({
        ok: true,
        json() {
          return [
            { youtubeId: "1", title: "test1", description: "testDescription1" },
            { youtubeId: "2", title: "test2", description: "testDescription2" }
          ];
        }
      });
      return fetch;
    });

  describe("list mode", () => {
    afterEach(() => {
      cleanup();
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
    window.fetch = fetch();
    test("should fetch and display a list of videos ", async () => {
      const { asFragment, getByText } = render(<Videos />);
      await wait(() => {
        expect(getByText("test1")).toBeDefined();
        expect(getByText("test2")).toBeDefined();
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(asFragment()).toMatchSnapshot();
      });
    });

    test("should display a select on page when clicking add button", async () => {
      window.fetch = fetch();
      const { queryByLabelText } = render(<Videos />);
      await wait(() => {
        expect(queryByLabelText("selectVideoNotes")).toBeNull();
      });
    });
  });

  describe("search mode", () => {
    afterAll(() => {
      cleanup();
      jest.resetAllMocks();
      jest.clearAllMocks();
    });
    test("should fetch videos on search and replace the default list of videos", async () => {
      window.fetch = fetch();
      const { asFragment, queryByText } = render(<Videos />);

      await wait();
      expect(window.fetch).toHaveBeenCalledTimes(1);
      const firstRender = asFragment();

      fireEvent.click(queryByText("search"));
      await wait(() => {
        expect((window.fetch as jest.Mock).mock.calls[0][0]).toBe(
          "http://localhost:9000/videos"
        );
        expect((window.fetch as jest.Mock).mock.calls[1][0]).toBe(
          "http://localhost:9000/videos/search"
        );
      });

      expect(firstRender).not.toEqual(asFragment());
      expect(asFragment()).toMatchSnapshot();
    });

    test("should display one add button per video on search list", async () => {
      const { queryAllByText, queryByText } = render(<Videos />);
      fireEvent.click(queryByText("search"));
      await wait(() => {
        expect(queryAllByText("+")).toHaveLength(2);
      });
    });

    test("should display a list of notes when clicking a video + button", async () => {
      const { asFragment, queryByText, queryAllByText } = render(<Videos />);
      const firstRender = asFragment();
      fireEvent.click(queryByText("search"));
      await wait();

      window.fetch = TestUtils.mockFetch([
        { id: 1, name: "note1" },
        { id: 2, name: "note2" }
      ]);
      fireEvent.click(queryAllByText("+")[0]);
      await wait(() => {
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect((window.fetch as jest.Mock).mock.calls[0][0]).toBe(
          "http://localhost:9000/notes"
        );
        expect(queryAllByText("note1")).toHaveLength(1);
        expect(queryAllByText("note2")).toHaveLength(1);
      });
      expect(firstRender).not.toEqual(asFragment());
      expect(asFragment()).toMatchSnapshot();
    });

    test("should save the video with the selected notes", async () => {
      const {
        asFragment,
        queryByText,
        queryAllByText,
        queryByLabelText
      } = render(<Videos />);

      const firstRender = asFragment();

      // open search page
      fireEvent.click(queryByText("search"));
      await wait();

      // click on + button of a video
      window.fetch = TestUtils.mockFetch([
        { id: 1, name: "note1" },
        { id: 2, name: "note2" }
      ]);
      fireEvent.click(queryAllByText("+")[0]);
      await wait();

      // select a note
      fireEvent.change(queryByLabelText("Choose related notes:"), {
        target: { value: 1 }
      });

      // save the video selected with the note
      fireEvent.click(queryByText("save"));

      // the select should disappear
      await waitForElementToBeRemoved(() =>
        queryByLabelText("Choose related notes:")
      );
      expect(queryByLabelText("Choose related notes:")).not.toBeInTheDocument();

      // /POST videos should have been called with the video and notes (here mock video is empty)
      await wait(() => {
        expect((window.fetch as jest.Mock).mock.calls[1][0]).toBe(
          "http://localhost:9000/videos"
        );
        expect(
          JSON.stringify((window.fetch as jest.Mock).mock.calls[1][1])
        ).toEqual(
          JSON.stringify({
            method: "POST",
            body: '{"notes":[{"id":1,"name":"note1"}]}',
            headers: new Headers()
          })
        );
      });

      expect(firstRender).not.toEqual(asFragment());
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
