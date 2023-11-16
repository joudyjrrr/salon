export interface AddNotificationType {
  id?: string;
  title: [
    {
      key: "ar";
      value: string;
    },
    {
      key: "en";
      value: string;
    }
  ];
  body: [
    {
      key: "ar";
      value: string;
    },
    {
      key: "en";
      value: string;
    }
  ];
  notificationType: 0 | 1 | 2;
  customers: {
    userId: string;
    userName: string;
    phoneNumber: number;
  }[];
  country: {
    id: string;
    name: string;
  } | null;
  city: {
    id: string;
    name: string;
  } | null;
  publicUserCity: "Public" | "User" | "City";
  type: number;
}
