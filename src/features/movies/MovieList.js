import { Movie } from "./Movie";

export default function MovieList({ movieList, deleteHandler, editHandler }) {
  return (
    <>
      <div>
        {movieList.map((movie) => (
          <Movie
            key={movie._id}
            movie={movie}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
    </>
  );
}
