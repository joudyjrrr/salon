export interface GetAllCategoryType {
  id: string;
  name: {
    key: string;
    value: string;
  }[];
  imageUrl: string;
  parentCategoryId: string;
  type: number;
}
export interface GetCategoryByIdType {
  id: string;
  name: string;
  imageUrl: string;
}
export interface SetCategoryType {
  id: string;
  name: {
    key: string;
    value: string;
  }[];
  image: string;
  type: number;
}
