import { Col, Container, Row } from "reactstrap"
import profile from '../assets/images/SWALIH-PHOTO.jpg'
import '../style/home.css'
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import ArrowBackIosSharpIcon from '@material-ui/icons/ArrowBackIosSharp';
import { useContext, useState } from "react";
import { useEffect } from "react";
import Posts from "./Posts";
import { StateContext } from "../context/StateProvider";

const Home = () => {

    const [show, setShow] = useState(false);
    const element = document?.getElementById('story');
    const scroll = element?.scrollLeft;
    const [{ user },dispatch] = useContext(StateContext);
    console.log(user);
    const scrollRight = () => {
        document?.getElementById('story')?.scrollBy(150,0);
        setShow(true)
    }
    const scrollLeft = () => {
        element?.scrollBy(-150,0)
    }

    useEffect(() => {
        console.log('hi')
        if (scroll >=0 ) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [scroll])
    return (
        <Container fluid className="home">
            <Row className="mb-5">
                <Col className="">
                    <div className="story-container d-flex">
                        {show && <span className="scroll-left">
                            <ArrowBackIosSharpIcon  onClick={scrollLeft} />
                        </span>}
                        <div className="story-header" id="story">
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            <div>
                                <img src={profile} className="story-image rounded-circle" alt="avatar" />
                                <p>name</p>
                            </div>
                            {/* <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" />
                            <img src={profile} className="story-image rounded-circle" alt="avatar" /> */}
                        </div>
                        <span className="scroll-right">
                            <ArrowForwardIosSharpIcon onClick={scrollRight} />
                        </span>
                    </div>
                    <Posts />
                </Col>
                <Col>
                    <div className="border mt-4">
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
