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

export const getAllEvents = async (page, filter) => {
  try {
    let query = `?page=${page}`;

    if (filter) {
      query += `&filter_categoryId=${filter}`;
    }

    console.log("Query:", query);

    const response = await axios.get(`${base_url}/api/event${query}`);

    return response.data; // Assuming you want to return just the data part of the response
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
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

export const getEventDetail = async (eventId) => {
  const response = await axios({
    method: "GET",
    url: `${base_url}/api/event/${eventId}`,
  });

  return response;
};
