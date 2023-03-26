import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";

//will need an album as a prop since the album has a list of photos
function PhotosList({ album }) {
  //always call the fetch function with the prop the component takes
  //destructuring isFetching this time and not isLoading
  const { data, isFetching, error } = useFetchPhotosQuery(album);

  const [addPhoto, results] = useAddPhotoMutation();

  const handleAddPhoto = () => {
    //always add the prop
    //because the endpoint has been built to accept that prop
    addPhoto(album);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-8 w-8" times={3} />;
  } else if (error) {
    content = <div>Error Fetching photos...</div>;
  } else {
    content = data.map((photo) => {
      //key prop because we're building a list
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }
  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3>Photos In {album.title}</h3>
        <Button loading={results.isLoading} onClick={handleAddPhoto}>
          {" "}
          + Add Photo
        </Button>
      </div>
      <div className="mx-8 flex flex-row flex-wrap justify-center">
        {content}
      </div>
    </div>
  );
}

export default PhotosList;
