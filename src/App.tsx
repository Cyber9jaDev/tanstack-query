import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPost, getPosts, getUsers } from "./utils/api";
import { PostsResponseHttpData, UserResponseHttpData } from "./types/user.type";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Use this to invalidate queries and mutations
  const queryClient = useQueryClient();

  // const getUsersQuery = useQuery<UserResponseHttpData[]>({
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  // const createPostMutation = useMutation({
  const { mutate: createPostMutation, isSuccess: isCreatePostSuccess, isPending: isCreatePostPending } =
    useMutation({
      mutationKey: ["createPost"],
      mutationFn: createPost,
    });

  const {
    data: postsData,
    error: postsError,
    isLoading: isPostsLoading,
    refetch: refetchGetposts
  } = useQuery<PostsResponseHttpData[]>({
    queryKey: ["getPosts"],
    queryFn: getPosts,
  });

  // Invalidate posts and users
  useEffect(() => {
    if(isCreatePostSuccess && isCreatePostPending ){
      console.log("isCreatePostSuccess - Refetching Posts");
      queryClient.invalidateQueries({ queryKey: ["getusers"] });
      queryClient.invalidateQueries({ queryKey: ["getPosts"] });
    }
  }, [])
  

  if (usersError && !isUsersLoading) {
    return <div>Something went wrong while fetching users</div>;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    createPostMutation({
      title,
      body,
      userId: 11232433232,
    });
    setBody("");
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            value={title}
            id="title"
          />
        </div>

        <div>
          <label htmlFor="body">Body</label>
          <input
            onChange={(e) => setBody(e.target.value)}
            type="text"
            name="body"
            value={body}
            id="body"
          />
        </div>

        <button>Create Post</button>
      </form>

      <div>
        {!isPostsLoading &&
          postsData &&
          postsData.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </div>
          ))}
      </div>

      {/* {!isUsersLoading && usersData ? (
        <div>
          {usersData.map((user) => (
            <div key={user.id}>
              <div>
                <b>{user.name}</b>
              </div>
              <div>
                <b>{user.username}</b>
              </div>
              <div>
                <b>{user.email}</b>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading.......</div>
      )} */}
    </div>
  );
}

export default App;
