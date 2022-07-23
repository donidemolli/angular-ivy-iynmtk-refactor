export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Demographic {
  state: string;
  city: string;
  year: Number;
  population: Number;
}

export interface chartDataSeries {
  type: string;
  name: string;
  data: any;
}
