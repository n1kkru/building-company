import { TUpdateStatus } from "../state/reportsSlice";
import {
  TFileResponse,
  TNewObject,
  TNewReport,
  TObject,
  TReport,
  TStatus,
  TUser,
} from "./types";

const BASE_URL = "https://3ed8cab4c3743da5.mokky.dev";

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getObjectsApi = () =>
  fetch(`${BASE_URL}/objects`)
    .then((res) => checkResponse<TObject[]>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getReportsApi = () =>
  fetch(`${BASE_URL}/reports`)
    .then((res) => checkResponse<TReport[]>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getReportByIdApi = (number: number) =>
  fetch(`${BASE_URL}/reports/${number}`)
    .then((res) => checkResponse<TReport>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const getFilesApi = (id: number) =>
  fetch(`${BASE_URL}/uploads/${id}`)
    .then((res) => checkResponse<TFileResponse>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export const postReportApi = (newReport: TNewReport) =>
  fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ...newReport,
    }),
  }).then((data) => {
    if (data) return data;
    return Promise.reject(data);
  });

export const postObjectApi = (newObject: TNewObject) =>
  fetch(`${BASE_URL}/objects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ...newObject,
      total: 0,
    }),
  }).then((data) => {
    if (data) return data;
    return Promise.reject(data);
  });

export const postFilesApi = (file: FormData) =>
  fetch(`${BASE_URL}/uploads`, {
    method: "POST",
    body: file,
  }).then((data) => {
    if (data.ok) return data.json();
    return Promise.reject(data);
  });

export type TAuthResponse = {
  token: string;
  data: TUser;
};

export const registerUserApi = (data: TUser) =>
  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...data, isManager: false }),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  fetch(`${BASE_URL}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });

type TUserResponse = {
  email: string;
  name: string;
  id: number;
};

export const getUserApi = () =>
  fetch(`${BASE_URL}/auth_me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    } as HeadersInit,
  }).then((data) => checkResponse<TUser>(data));

export const updateReportStatusApi = (data: TUpdateStatus) =>
  fetch(`${BASE_URL}/reports/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ status: data.status }),
  }).then((res) => checkResponse<{}>(res));

export const updateObjectTotalApi = (object: TObject) =>
  fetch(`${BASE_URL}/objects/${object.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...object, total: object.total + 1 }),
  }).then((res) => checkResponse<{}>(res));
