import { useQuery } from "@tanstack/react-query";
import "./App.css";
import { getUsers } from "./utils/api";
import { UserResponseHttpData } from "./types/user.type";

function App() {
  // const getUsersQuery = useQuery<UserResponseHttpData[]>({
  const {
    data: usersData,
    error: usersError,
    isLoading: isUsersLoading,
  } = useQuery<UserResponseHttpData[]>({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  if (usersError && !isUsersLoading) {
    return <div>Something went wrong while fetching users</div>;
  }

  return (
    <>
      {!isUsersLoading && usersData ? (
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
      )}
    </>
  );
}

export default App;
