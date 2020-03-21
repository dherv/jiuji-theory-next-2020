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

const fetchOptions = async <T extends {}>(optionType: string): Promise<T[]> => {
  const url = `/${optionType}`;
  return Api.get<T>(url);
};
const fetchCategories = () => fetchOptions<ICategory>("categories");
const fetchPositions = () => fetchOptions<IPosition>("positions");
const fetchTeachers = () => fetchOptions<ITeacher>("teachers");
const fetchTechniques = () => fetchOptions<ITechnique>("techniques");

const fetchData = (): Promise<{
  categories: ICategory[];
  positions: IPosition[];
  teachers: ITeacher[];
  techniques: ITechnique[];
}> => {
  //TODO: use promise.allSettled once available in typescript
  return Promise.all([
    fetchCategories(),
    fetchPositions(),
    fetchTeachers(),
    fetchTechniques()
  ]).then((data: [ICategory[], IPosition[], ITeacher[], ITechnique[]]) => {
    const [categories, positions, teachers, techniques] = data;
    return { categories, positions, teachers, techniques };
  });
};

const promise = fetchData;

const Note = () => {
  const [categories, setCategories] = useState<ICategory[]>();
  const [positions, setPositions] = useState<IPosition[]>();
  const [teachers, setTeachers] = useState<ITeacher[]>();
  const [techniques, setTechniques] = useState<ITechnique[]>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    promise()
      .then(data => {
        setCategories(data.categories);
        setPositions(data.positions);
        setTeachers(data.teachers);
        setTechniques(data.techniques);
        setLoaded(true);
      })
      .catch(error => console.error(error));
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
