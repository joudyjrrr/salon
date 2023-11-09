export interface IPagination<T> {
  pageNumber: number;
  totalPages: number;
  totalDataCount: number;
  data: T[];
}
export interface INameAndId {
  id: string;
  name: string;
}
export interface INameAndIdNumber {
  id: number;
  name: string;
}
export interface IAutoCompleteOption {
  id: string;
  name: string;
}
export interface IPayload {
  EnablePagination?: boolean;
  PageNumber?: number;
  Query?: string;
}
export interface ICity {
  key: string;
  value: string;
}
