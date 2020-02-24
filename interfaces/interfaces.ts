export interface INote {
  id: number;
  name: string;
  variant?: number;
  categoryId: number;
  positionId: number;
  teacherId: number;
  techniqueId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  noteItems: INoteItem[];
}

export interface INoteItem {
  id: number;
  text: string;
  orderNumber: number;
  noteId: number;
  createdAt: string;
  updatedAt: string;
}

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
