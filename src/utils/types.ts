export type TStatus = "Ожидает" | "Готово" | "Отклонено";

export type TNewReport = {
  title: string;
  text: string;
  email: string;
  date: string;
  status: TStatus;
  object: TObject | undefined;
};

export type TReport = {
  id: number;
} & TNewReport;

export type TNewObject = {
  address: string;
  name: string;
  date: string;
};

export type TObject = TNewObject & {
  total: number;
  id: number;
};

export type TUser = {
  email: string;
  password: string;
  name: string;
  isManager: boolean;
};

export type TGridReports = {
  id: number;
  title: string;
  text: string;
  email: string;
  date: string;
  status: TStatus;
  objectName: string;
};
