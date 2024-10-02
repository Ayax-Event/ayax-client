import { default as axios, AxiosResponse } from "axios";

export const postLogin = async (
  email: string,
  password: string
): Promise<AxiosResponse> => {
  const response = await axios({
    method: "POST",
    url: "https://fa5d-139-228-111-126.ngrok-free.app/api/login",
    data: { email, password },
  });

  return response;
};
