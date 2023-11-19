export interface getAllFQA {
  id: string;
  question: string;
  answer: string;
}

export interface setFQA {
  id?: string;
  question: {
    key: string;
    value: string;
  }[];
  answer: {
    key: string;
    value: string;
  }[];
}
