//import automatically generated hook
import {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
} from "../store/rtkqapis/albumsApi";
import Skeleton from "./Skeleton";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import AlbumListItem from "./AlbumListItem";

//takes a user prop to display content relating to the user
function AlbumList({ user }) {
  //call query hook
  //destructure with 3 variables: data=actual api data, error=for errors, isLoading= boolean( true/false)
  //also need to specify which users al bums being found, so the hook takes that ser object as a paramter
  //the same user param we passed in the albumsApi query
  const { data, error, isLoading } = useFetchAlbumsQuery(user);

  //addAlbum is the mutation function
  //results(can be named anything) contains all the data return
  //that is where we get access to the isLoading variable
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;

  if (isLoading) {
    //Skeleton takes a times prop
    content = <Skeleton className="h-10 w-full" times={2} />;
  } else if (error) {
    content = <div>Error loading albums</div>;
  } else {
    //map over the data annd fro each album we create an expandable panel
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumList;
