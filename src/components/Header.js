import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import SendIcon from "@material-ui/icons/Send";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import AddBoxIcon from "@material-ui/icons/AddBox";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/Explore";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import ExploreOutlinedIcon from "@material-ui/icons/ExploreOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import FavoriteIcon from "@material-ui/icons/Favorite";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import profile from "../assets/images/SWALIH-PHOTO.jpg";
import { Link, useLocation } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import "../style/Header.css";
import NewPost from "./modals/new-post";
import ImageUpload from "./modals/ImageUpload";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import { StateContext } from "../context/StateProvider";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [newPost, setNewPost] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [{ user },dispatch] = useContext(StateContext);
  const history = useHistory();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log(user);
    if (user) {
        auth.signOut();
        history.push('/login')
      }
  }

  return (
    <Container fluid className="border-bottom">
      <Row className="w-100">
        <Col className="header d-flex justify-content-between">
          <div className="pl-5">
            <Link to="/">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="insta-log"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="serchContainer">
            <input type="text" className="searchBar" placeholder="Search" />
            <span className="searchIcon">
              <SearchIcon />
            </span>
            {/* <span className="cancelIcon"><CancelIcon /></span> */}
          </div>
          <div className="icons">
            <Link to="/home">
              {location.pathname === "/home" ? (
                <HomeIcon />
              ) : (
                <HomeOutlinedIcon />
              )}
            </Link>
            <Link to="/message">
              {location.pathname === "/message" ? (
                <SendIcon />
              ) : (
                <SendOutlinedIcon />
              )}
            </Link>
            <Link to="#" onClick={() => setNewPost(true)}>
              {newPost ? <AddBoxIcon /> : <AddBoxOutlinedIcon />}
            </Link>
            <Link to="/explore">
              {location.pathname === "/explore" ? (
                <ExploreIcon />
              ) : (
                <ExploreOutlinedIcon />
              )}
            </Link>
            <Link to="/favourite">
              {location.pathname === "/favourite" ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Link>
            <div className={`${open && 'profile-active'} padding-1`}>
              <img
                onClick={handleClick}
                src={profile}
                className="profile-image"
                alt="avatar"
                role="link"
              />
            </div>
            <Menu
              anchorEl={anchorEl}
              open={open}
              classes="profile-dropdown"
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  paddingRight: '20px',
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem className="pe-5">
                <AccountCircleOutlinedIcon className="me-3" fontSize="small" /> Profile
              </MenuItem>
              <MenuItem className="pe-5">
                <TurnedInNotOutlinedIcon className="me-3" fontSize="small" /> Saved
              </MenuItem>
              <MenuItem className="pe-5">
                <Settings className="me-3" fontSize="small" /> Settings
              </MenuItem>
              <MenuItem className="pe-5">
                <SwapHorizIcon className="me-3" fontSize="small" /> Switch Accounts
              </MenuItem>
              <Divider />
              <MenuItem role="link" onClick={() => handleLogout()} className="pe-5 py-0 my-0">
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Col>
      </Row>
      <ImageUpload isOpen={newPost} toggle={() => setNewPost(!newPost)} />
    </Container>
  );
};

export default Header;
