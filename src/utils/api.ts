import { TNewReport, TObject, TReport, TUser } from "./types";

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

export const postReportApi = (newReport : TNewReport) =>
  fetch(`${BASE_URL}/reports`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      ...newReport
    })
  }).then((data) => {
    if (data) return data;
    return Promise.reject(data);
  });



export type TAuthResponse = {
  token: string;
  data: TUser;
};

export const registerUserApi = (data: TUser) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data) return data;
      return Promise.reject(data);
    });


export const getUserApi = () =>
  fetch(`${URL}/auth/user`, {
    headers: {
      authorization: localStorage.getItem('accessToken')
    } as HeadersInit
  });

export const logoutApi = () =>
  fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  }).then((res) => checkResponse<{}>(res));
