import { FC } from "react";
import Nav from "./Nav";
import { SCLayout as SC } from "./index.styled";

const Layout: FC<{}> = ({ children }) => {
  return (
    <SC.Layout>
      <header>
        <Nav />
      </header>
      <main>
        <SC.MainContainer>{children}</SC.MainContainer>
      </main>
    </SC.Layout>
  );
};

export default Layout;
