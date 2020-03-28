import React from "react";
import { render, cleanup, wait, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Videos from ".";
import { MockedComponentClass } from "react-dom/test-utils";

describe("Videos component", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
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

  test("should fetch videos on search and replace the default list of videos", async () => {
    window.fetch = fetch();
    const { asFragment, getByRole } = render(<Videos />);

    await wait();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    const firstRender = asFragment();

    fireEvent.click(getByRole("button"));
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
});
