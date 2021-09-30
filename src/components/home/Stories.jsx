import React, { useContext, useEffect, useState } from "react";
import "./Stories.css";
import { Col, Container, Row } from "reactstrap";
import profile from "../../assets/images/SWALIH-PHOTO.jpg";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import { StateContext } from "../../context/StateProvider";
import { Link } from "react-router-dom";

const Stories = () => {
    const [show, setShow] = useState(false);
    const element = document?.getElementById("story");
    const scroll = element?.scrollWidth;
    const [{ user }, dispatch] = useContext(StateContext);
    console.log(user);
    const scrollRight = () => {
      document?.getElementById("story")?.scrollBy(150, 0);
      setShow(true);
    };
    const scrollLeft = () => {
      element?.scrollBy(-151, 0);
    };

    useEffect(() => {
        console.log(scroll)
        // if (scroll < 50) {
        //   console.log('weweewe');
        //   setShow(false);
        // } else {
        //   setShow(true);
        // }
      });
  
  return (
    <div className="stories">
      {show && (
        <span className="scroll-left">
          <ArrowBackIosSharpIcon onClick={scrollLeft} />
        </span>
      )}
      <div className="story-header" id="story">
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <Link to={{pathname:'/stories/1', stories:[profile, profile, profile, profile]}}>
            <img
              src={profile}
              className="story-image rounded-circle"
              alt="avatar"
            />
          </Link>
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
        <div>
          <img
            src={profile}
            className="story-image rounded-circle"
            alt="avatar"
          />
          <p className="p-0 m-0">name</p>
        </div>
      </div>
      <span className="scroll-right">
        <ArrowForwardIosSharpIcon onClick={scrollRight} />
      </span>
    </div>
  );
};

export default Stories;
