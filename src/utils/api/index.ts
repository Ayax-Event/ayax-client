import axios, { AxiosResponse } from "axios";
import { LoginResponse, RegisterResponse } from "../../type";

import * as SecureStore from "expo-secure-store";

const getToken = async () => {
  const accessToken = await SecureStore.getItemAsync("token");
  console.log(accessToken);
  return accessToken;
};

export const postLogin = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  const response = await axios.post<LoginResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/api/login`,
    { email, password }
  );
  return response;
};

export const postRegister = async (
  email: string,
  password: string,
  name: string,
  username: string
): Promise<AxiosResponse<RegisterResponse>> => {
  const response = await axios.post<RegisterResponse>(
    `${process.env.EXPO_PUBLIC_API_URL}/api/register`,
    { email, password, name, username }
  );
  return response;
};

export const getAllEvents = async (page, filter) => {
  try {
    let query = `?page=${page}`;

    if (filter) {
      query += `&filter_categoryId=${filter}`;
    }

    console.log("Query:", query);

    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/api/event${query}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getAllCategory = async () => {
  console.log(process.env.EXPO_PUBLIC_API_URL, "<<<<<<<");
  const response = await axios({
    method: "GET",
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/list-category`,
  });

  return response;
};

export const getCurrentUser = async (token) => {
  const response = await axios({
    method: "GET",
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/current-user`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
};

export const postEvent = async (formData) => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/add-event`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    }
  );

  return response;
};

export const getEventDetail = async (eventId) => {
  const response = await axios({
    method: "GET",
    url: `${process.env.EXPO_PUBLIC_API_URL}/api/event/${eventId}`,
  });

  return response;
};

export const createOrder = async (data) => {
  const response = await axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/api/create-order`,
    data
  );

  return response;
};
