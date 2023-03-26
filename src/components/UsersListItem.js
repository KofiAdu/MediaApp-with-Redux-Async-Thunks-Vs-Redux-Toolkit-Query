import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";

//takes a prop of the user as an object and displays the details
function UsersListItem({ user }) {
  //delete user
  //add a function, and two variables
  const [doDeleteUser, isDeleting, error] = useThunk(deleteUser);

  const handleClick = () => {
    //made an assumption in the thunk that the function takes an object(user) as param
    doDeleteUser(user);
  };

  //fragments = empty tags
  const header = (
    <>
      <Button className="mr-3" loading={isDeleting} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user</div>}
      {user.name}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      {/* takes the user prop already defined in this component as its prop to get access to it */}
      <AlbumList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
