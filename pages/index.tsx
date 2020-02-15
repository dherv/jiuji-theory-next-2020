import React from "react";
import Nav from "../components/layout/nav";
import NoteAdd from "../components/note/add";

const Home = () => (
  <>
    <Nav></Nav>
    <main>
      <NoteAdd></NoteAdd>
    </main>
  </>
);

export default Home;
