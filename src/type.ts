import {
  CompositeNavigationProp,
  NavigationProp,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AxiosResponse } from "axios";

// Define the RootStackParamList
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  // Add other routes as needed
};

type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, "Login">,
  NavigationProp<Record<string, object | undefined>>
>;

export type NavigationProps = {
  navigation: LoginScreenNavigationProp;
};

export type AuthScreenViewProp = {
  name?: string;
  setName?: (value: string) => void;
  username?: string;
  setUsername: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  categoryName?: string;
  categoryId?: string;
};

export interface Ticket {
  _id: string;
  type: string;
  price: number;
}

export interface EventData {
  eventName: string;
  eventDate: string;
  tags: string[];
  tickets: Ticket[];
  location: {
    latitude: number;
    longitude: number;
  };
  creator: {
    profilepict: string;
    username: string;
  };
  description: string;
  images: string[];
  thumbnail: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    username: string;
  };
}

export type ApiResponse<T> = AxiosResponse<T>;
