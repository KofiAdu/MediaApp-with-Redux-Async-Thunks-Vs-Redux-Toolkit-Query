import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import UsersListItem from "./UsersListItem";
import Skeleton from "./Skeleton";
import { useThunk } from "../hooks/use-thunk";

function UsersList() {
  //loading components
  //calling the new hook on fetchUsers thunk
  //new variables can be named however
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  const [doAddUsers, isCreatingUser, creatingUserError] = useThunk(addUser);

  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  // const [creatingUserError, setCreatingUserError] = useState(null);

  //no longer needed because dispatch is called in the custom hook
  // const dispatch = useDispatch();

  //useSelctor gives us access to the state components
  //destructuring out the data we need access to
  const { data } = useSelector((state) => {
    return state.users;
  });

  //need the thunk to run the first time the component is rendered
  useEffect(() => {
    // //settiing loading to true before users are displayed
    // setIsLoadingUsers(true);
    // //calling the thunk
    // dispatch(fetchUsers())
    //   //using .unwrap() to call another promise when the request fails
    //   .unwrap()
    //   .catch((err) => setLoadingUsersError(err))
    //   .finally(() => setIsLoadingUsers(false));

    //doFetchUsers is now the main fucntion to call
    doFetchUsers();
  }, []);

  const handleAddUser = () => {
    // //before calling dispatch
    // setIsCreatingUser(true);
    // dispatch(addUser())
    //   .unwrap()
    //   .catch((err) => setCreatingUserError(err))
    //   .finally(() => setIsCreatingUser(false));

    doAddUsers();
  };

  let content;
  if (isLoadingUsers) {
    //show skeletons when page is loading
    //takes a prop (time)
    //and a className prop to determine the hieght and width
    content = <Skeleton times={4} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching Data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleAddUser}>
          + Add User
        </Button>
        {creatingUserError && "Error Creating User"}
      </div>
      {/* this way the header is always visible */}
      {content}
    </div>
  );
}

export default UsersList;
