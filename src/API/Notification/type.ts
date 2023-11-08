export interface setNotificationCpType {
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
  customers: string[];
  cityId: string;
  type: number;
}

export interface getNotificationCpType {
  id: string;
  title: {
    key: string;
    value: string;
  }[];
  body: {
    key: string;
    value: string;
  }[];
  createdAt: string;
}
