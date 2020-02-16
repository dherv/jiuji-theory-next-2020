import { FC } from "react";
import Nav from "./Nav";
import { StyledLayout, StyledMainContainer } from "./index.styled";

const Layout: FC<{}> = ({ children }) => {
  return (
    <StyledLayout>
      <header>
        <Nav />
      </header>
      <main>
        <StyledMainContainer>{children}</StyledMainContainer>
      </main>
    </StyledLayout>
  );
};

export default Layout;
