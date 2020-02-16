import { FC } from "react";
import Link from "next/link";
import { SCNav as SC } from "./Nav.styled";

const Nav: FC<{}> = () => (
  <SC.Nav>
    <SC.Title>jiuji theory</SC.Title>
    <ul>
      <SC.ListItem>
        <Link href="/about">
          <SC.Link>videos</SC.Link>
        </Link>
      </SC.ListItem>
      <SC.ListItem>
        <Link href="/about">
          <SC.Link>account</SC.Link>
        </Link>
      </SC.ListItem>
    </ul>
  </SC.Nav>
);

export default Nav;
