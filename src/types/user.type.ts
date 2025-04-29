export interface UserResponseHttpData {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface CreatePostRequestBody {
  title: string;
  body: string;
  userId: number;
}

export interface PostsResponseHttpData {
  id: number;
  title: string;
  body: string;
  userId: number;
}