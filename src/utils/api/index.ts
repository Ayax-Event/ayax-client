import { default as axios, AxiosResponse } from "axios";
import { base_url } from "@env";

export const postLogin = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const response = await axios({
    method: "POST",
    url: `${base_url}/api/login`,
    data: { email, password },
  });

  return response;
};

export const postRegister = async (
  email: string,
  password: string,
  name: string,
  username: string
): Promise<AxiosResponse> => {
  const response = await axios({
    method: "POST",
    url: `${base_url}/api/register`,
    data: { email, password, name, username },
  });

  return response;
};

export const getAllEvents = async (page) => {
  const response = await axios({
    method: "GET",
    url: `${base_url}/api/event?page=${page}`,
  });

  return response;
};

export const getAllCategory = async () => {
  const response = await axios({
    method: "GET",
    url: `${base_url}/api/list-category`,
  });

  return response;
};

export const getCurrentUser = async (token) => {
  const response = await axios({
    method: "GET",
    url: `${base_url}/api/current-user`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};
