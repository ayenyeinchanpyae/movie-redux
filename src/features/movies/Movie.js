import "./Movie.css";

export function Movie({ movie, deleteHandler, editHandler }) {
  return (
    <>
      <div className={"movie"}>
        <div className={"movie-title"}>{movie.title}</div>
        <div className={"movie-body"}>
          <div>Year {movie.year}</div>
          <div>Director {movie.director.name}</div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => editHandler(movie)}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteHandler(movie)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
