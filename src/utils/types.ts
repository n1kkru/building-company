export type TStatus = "Ожидает" | "Готово" | "Отклонено";

export type TNewReport = {
  title: string;
  text: string;
  email: string;
  date: string;
  status: TStatus;
  objectName: string;
};

export type TReport = {
  id: number;
} & TNewReport;

export type TObject = {
  id: number;
  address: string;
  name: string;
  date: string;
  total: number;
};

export type TUser = {
  email: string;
  password: string;
  name: string;
  isManager?: boolean;
};

