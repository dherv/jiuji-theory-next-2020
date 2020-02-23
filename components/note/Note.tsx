import { SCNote as SC } from "./Note.styled";
import Api from "../../api/Api";
import { useEffect, useState } from "react";
import {
  ICategory,
  IPosition,
  ITeacher,
  ITechnique
} from "../../interfaces/interfaces";
import NoteAdd from "./add";
import NoteList from "./list";

const fetchOptions = async (optionType: string) => {
  const url = `/${optionType}`;
  return await Api.get(url);
};
const fetchCategories = () => fetchOptions("categories");
const fetchPositions = () => fetchOptions("positions");
const fetchTeachers = () => fetchOptions("teachers");
const fetchTechniques = () => fetchOptions("techniques");

const fetchData = (): any => {
  //TODO: use promise.allSettled once available in typescript
  return Promise.all([
    fetchCategories(),
    fetchPositions(),
    fetchTeachers(),
    fetchTechniques()
  ])
    .then(([categories, positions, teachers, techniques]) => {
      return { categories, positions, teachers, techniques };
    })
    .catch(error => console.error(error));
};

const promise = fetchData;

const Note = () => {
  const [categories, setCategories] = useState<ICategory>();
  const [positions, setPositions] = useState<IPosition>();
  const [teachers, setTeachers] = useState<ITeacher>();
  const [techniques, setTechniques] = useState<ITechnique>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    promise().then(data => {
      console.log({ data });
      setCategories(data.categories);
      setPositions(data.positions);
      setTeachers(data.teachers);
      setTechniques(data.techniques);
      setLoaded(true);
    });
    return () => {};
  }, []);
  return (
    loaded && (
      <SC.Container>
        <NoteAdd
          options={{ categories, positions, teachers, techniques }}
        ></NoteAdd>
        <NoteList
          options={{ categories, positions, teachers, techniques }}
        ></NoteList>
      </SC.Container>
    )
  );
};

export default Note;
