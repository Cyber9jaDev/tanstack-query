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