import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import CircularProgress from "@mui/material/CircularProgress";
import { Spinner } from "reactstrap";

const ButtonWithLoader = (props) => {
  const { text, isLoading, styleClass, loaderColor, type, ...otherProps } =
    props;
  return (
    <button className={styleClass} type={type} {...otherProps}>
      {isLoading ? (
        <>
          <Spinner animation="border" size="sm" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </>
      ): (
          ''
      )}
      {' '}{text}
    </button>
  );
};
export default ButtonWithLoader;
