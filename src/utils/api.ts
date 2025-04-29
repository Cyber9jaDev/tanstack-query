import { CreatePostRequestBody } from "../types/user.type";

export const getUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await response.json();
  return result;
};

export const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const result = await response.json();
  return result;
};

export const createPost = async (body: CreatePostRequestBody) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await response.json();
  return result;
};
