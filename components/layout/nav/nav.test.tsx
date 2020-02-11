import React from "react";

import { Nav } from "./nav";
import { render } from "@testing-library/react";

describe("Nav", () => {
  const props = {};

  describe("Nav component", () => {
    describe("user interface", () => {
      it("should display the title", () => {
        const { getByText } = render(<Nav></Nav>);
        expect(getByText(`jiuji theory`)).toBeDefined();
      });
      it("should display one 'video' link", () => {
        const { queryAllByText } = render(<Nav></Nav>);
        expect(queryAllByText("videos")).toHaveLength(1);
      });
      it("should display one 'account' link", () => {
        const { queryAllByText } = render(<Nav></Nav>);
        expect(queryAllByText("account")).toHaveLength(1);
      });
    });
    describe("functions", () => {});
  });
});
