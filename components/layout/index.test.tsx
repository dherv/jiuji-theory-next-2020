import React from "react";

import Layout from "./index";
import { render } from "@testing-library/react";

describe("Layout", () => {
  const props = {};

  describe("Layout component", () => {
    test("should display a navigation", () => {
      const { getAllByRole } = render(<Layout />);
      expect(getAllByRole("navigation")).toBeDefined();
    });
    test("should display a main", () => {
      const { getAllByRole } = render(<Layout />);
      expect(getAllByRole("main")).toBeDefined();
    });
  });
});
