import { Col, Container, Row } from "reactstrap";
import profile from "../assets/images/SWALIH-PHOTO.jpg";
import "../style/home.css";
import ArrowForwardIosSharpIcon from "@material-ui/icons/ArrowForwardIosSharp";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
import { useContext, useState } from "react";
import { useEffect } from "react";
import Posts from "./Posts";
import { StateContext } from "../context/StateProvider";
import Stories from "./home/Stories";
import { Link } from "react-router-dom";

const Home = () => {
  const [show, setShow] = useState(false);
  const element = document?.getElementById("story");
  const scroll = element?.scrollLeft;
  const [{ user }, dispatch] = useContext(StateContext);
  console.log(user);
  const scrollRight = () => {
    document?.getElementById("story")?.scrollBy(150, 0);
    setShow(true);
  };
  const scrollLeft = () => {
    element?.scrollBy(-150, 0);
  };

  useEffect(() => {
    if (scroll >= 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [scroll]);
  return (
    <Container fluid className="d-flex justify-content-center home p-0">
      <Row className="w-100 mb-5 d-flex justify-content-between home-main">
        <Col className="p-0">
          <div className="story-container d-flex">
            <Stories />
          </div>
          <Posts />
        </Col>
        <Col className="p-0">
          <div className="home-right">
            <div className="owner">
                <div>
                    <img src={profile} alt="profile" className="img-fluid rounded-circle" />
                    <span className="name">
                        <strong>salim.selu</strong>
                        <p>Salim Selu</p>
                    </span>
                </div>
                <button className="switch-button" onClick="">Switch</button>
            </div>
            <div className="suggestions">
                <p>Suggestions for you</p>
                <Link to="/">See All</Link>
            </div>
            <div className="suggestions-list mt-2">
                <div className="item">
                    <div>
                        <img src={profile} alt="profile" className="img-fluid rounded-circle" />
                        <span className="name">
                            <strong>Name.name</strong>
                            <p>Reason 1324</p>
                        </span>
                    </div>
                    <button className="switch-button ms-5" onClick="">Follow</button>
                </div>
            </div>
            <div className="suggestions-list mt-2">
                <div className="item">
                    <div>
                        <img src={profile} alt="profile" className="img-fluid rounded-circle" />
                        <span className="name">
                            <strong>Name.name</strong>
                            <p>Reason 1324</p>
                        </span>
                    </div>
                    <button className="switch-button ms-5" onClick="">Follow</button>
                </div>
            </div>
            <div className="suggestions-list mt-2">
                <div className="item">
                    <div>
                        <img src={profile} alt="profile" className="img-fluid rounded-circle" />
                        <span className="name">
                            <strong>Name.name</strong>
                            <p>Reason 1324</p>
                        </span>
                    </div>
                    <button className="switch-button ms-5" onClick="">Follow</button>
                </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
