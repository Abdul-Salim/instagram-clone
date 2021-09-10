import React, { useState } from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import AddBoxIcon from '@material-ui/icons/AddBox';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreIcon from '@material-ui/icons/Explore';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import profile from '../assets/images/SWALIH-PHOTO.jpg'
import { Link, useLocation } from 'react-router-dom';
import CancelIcon from '@material-ui/icons/Cancel';
import '../style/Header.css';
import NewPost from './modals/new-post';

const Header = () => {
    const location = useLocation();
    const [newPost, setNewPost] = useState(false);

    return (
        <Container fluid className="border-bottom">
            <Row className="w-100">
                <Col className="header d-flex justify-content-between">
                    <div className="pl-5">
                        <Link to="/">
                            <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta-log" className="img-fluid" />
                        </Link> 
                    </div>
                    <div className="serchContainer">
                        <input type="text" className="searchBar" placeholder="Search" />
                        <span className="searchIcon"><SearchIcon /></span>
                        {/* <span className="cancelIcon"><CancelIcon /></span> */}
                    </div>
                    <div className="icons" >
                        <Link to="/home">
                            {location.pathname === "/home" ? <HomeIcon /> :
                            <HomeOutlinedIcon />}
                        </Link>
                        <Link to="/message">
                            {location.pathname === "/message" ? <SendIcon /> :
                            <SendOutlinedIcon />}
                        </Link>
                        <Link to="#" onClick={() =>setNewPost(true)}>
                            {newPost ? <AddBoxIcon /> :
                            <AddBoxOutlinedIcon />}
                        </Link>
                        <Link to="/explore">
                            {location.pathname === "/explore" ? <ExploreIcon /> :
                            <ExploreOutlinedIcon />}
                        </Link>
                        <Link to="/favourite">
                            {location.pathname === "/favourite" ? <FavoriteIcon /> :
                            <FavoriteBorderOutlinedIcon />}
                        </Link>

                        <img src={profile} className="profile-image rounded-circle" alt="avatar" />
                    </div>
                </Col>
            </Row>
            <NewPost isOpen={newPost} toggle={() => setNewPost(!newPost)} />
        </Container>
    )
}

export default Header
