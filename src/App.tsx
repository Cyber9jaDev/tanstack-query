import { FormEvent, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, getPosts } from "./utils/api";
import { PostsResponseHttpData } from "./types/user.type";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Use this to invalidate queries and mutations
  const queryClient = useQueryClient();

  // Get Posts
  // Destructure
  const { data: postsData, error: postsError, isLoading: isPostsLoading } = useQuery<PostsResponseHttpData[]>({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  // const createPostMutation = useMutation({
  const { mutate: createPostMutation } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPost,
    onSuccess: () => {
      console.log("isCreatePostSuccess - Refetching Posts");
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
    },
  });



  if (postsError && !isPostsLoading) {
    return <div>Something went wrong while fetching users</div>;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    createPostMutation({ title, body, userId: 11232433232 });
    setBody("");
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" value={title} id="title" />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input onChange={(e) => setBody(e.target.value)} type="text" name="body" value={body} id="body" />
        </div>

        <button>Create Post</button>
      </form>

      <div>
        {!isPostsLoading && postsData && postsData.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
