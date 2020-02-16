export interface ICategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPosition {
  id: number;
  name: string;
}

export interface ITechnique {
  id: number;
  name: string;
}

export interface ITeacher {
  id: number;
  name: string;
}

export interface INoteInput {
  orderNumber: number;
  text: string;
}
