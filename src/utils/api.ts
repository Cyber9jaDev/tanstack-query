import { CreatePostRequestBody } from "../types/user.type";

export const getPosts = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return Promise.reject("Error occured");
};

export const createPost = async (body: CreatePostRequestBody) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (response.ok) {
    const result = await response.json();
    return result;
  }
  return Promise.reject("Error occured");
};
