export interface SetServiceType {
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  period: {
    ticks: number;
  };
  salonId: string;
  categoryId: string;
  coverImage: string;
  images: string[];
}
