import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Field, Form, Formik, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import MovieList from "../features/movies/MovieList";
import { selectMovie, addMovie } from "../features/movies/movieSlice";
import { nanoid } from "@reduxjs/toolkit";

const MovieSchema = Yup.object().shape({
  _id: Yup.string(),
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  year: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Year Required"),
  director: Yup.string().required("Required"),
  phoneNo: Yup.string().required("Required"),
});

export default function MovieListPage() {
  let movieList = useSelector(selectMovie);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  let [movieFormData, setMovieFormData] = useState({
    title: "",
    year: "",
    director: "",
    phoneNo: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewMovieHandler = (movie) => {
    console.log("new movie");
    dispatch(addMovie(movie));
    handleClose();
  };
  const deleteHandler = (movie) => {
    console.log("delete", movie);
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const editHandler = (movie) => {
    console.log("edit", movie);
    let newFormData = {
      title: movie.title,
      year: movie.year,
      director: movie.director.name,
      phoneNo: movie.director.phoneNo,
    };
    setMovieFormData(newFormData);
    handleShow();
  };
  //const { submitForm } = useFormikContext();
  console.log("use", useFormikContext());
  const handleSubmit = () => {
    console.log("submit form");
    //submitForm();
  };

  function formValueToMovie(values) {
    let movie = {
      _id: nanoid,
      title: values.title,
      year: values.year,
      director: {
        name: values.director,
        phoneNo: values.phoneNo,
      },
    };
    return movie;
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        New
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={movieFormData}
            validationSchema={MovieSchema}
            onSubmit={(values) => {
              console.log("Form value ", values);

              let movie = formValueToMovie(values);
              addNewMovieHandler(movie);
              // addOrUpdateHandler(movie);
            }}
          >
            <Form className="row">
              <div className={"mb-3 input-group"}>
                <label htmlFor="title" className={"form-label col-2"}>
                  Title
                </label>
                <Field
                  id="title"
                  name="title"
                  placeholder="Jane"
                  className={"form-control col-4"}
                />
              </div>
              <div className={"mb-3 input-group"}>
                <ErrorMessage
                  name="title"
                  component="span"
                  className={"alert alert-danger col-4 offset-md-2"}
                />
              </div>

              <div className={"mb-3 input-group"}>
                <label htmlFor="title" className={"form-label col-2"}>
                  Year
                </label>
                <Field
                  id="year"
                  name="year"
                  placeholder="1990"
                  className={"form-control col-4"}
                />
              </div>
              <div className={"mb-3 input-group"}>
                <ErrorMessage
                  name="year"
                  component="span"
                  className={"alert alert-danger col-4 offset-md-2"}
                />
              </div>

              <div className={"mb-3 input-group"}>
                <label htmlFor="director" className={"form-label col-2"}>
                  Director
                </label>
                <Field
                  id="director"
                  name="director"
                  className={"form-control col-4"}
                />
              </div>
              <div className={"mb-3 input-group"}>
                <ErrorMessage
                  name="phoneNo"
                  component="span"
                  className={"alert alert-danger col-4 offset-md-2"}
                />
              </div>

              <div className={"mb-3 input-group"}>
                <label htmlFor="phoneNo" className={"form-label col-2"}>
                  Phone No
                </label>
                <Field
                  id="phoneNo"
                  name="phoneNo"
                  className={"form-control col-4"}
                />
              </div>
              <div className={"mb-3 input-group"}>
                <ErrorMessage
                  name="phoneNo"
                  component="span"
                  className={"alert alert-danger col-4 offset-md-2"}
                />
              </div>
              <div className={"mb-3 input-group"}>
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  Save
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <MovieList
        movieList={movieList}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
}
