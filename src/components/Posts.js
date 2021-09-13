import { useRef, useState } from "react";
import { Col, Row } from "reactstrap"
import profile from '../assets/images/SWALIH-PHOTO.jpg'
import '../style/Post.css'
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';

const Posts = () => {

    const [showEmoji, setShowEmoji] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const ref = useRef();

    return (
        <Row>
            <Col>
                <div className="post-container border">
                    <div className="post-header border-bottom d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <img src={profile} className="post-profile rounded-circle" alt="profile" />
                            <p className="post-name">profile_name</p>
                        </div>
                        <MoreHorizIcon className="float-right"/>
                    </div>
                    <div className="post-body">
                        <embed src={profile} className="post-content" />
                    </div>
                    <div className="post-footer">
                        <div className="footer-section-1">
                            <div className="action-icons p-0">
                                <FavoriteBorderOutlinedIcon />
                                <ModeCommentOutlinedIcon />
                                <SendOutlinedIcon />
                            </div>
                            <div className="save">
                                <BookmarkBorderOutlinedIcon />
                            </div>
                        </div>
                        <div className="footer-section-2">
                            <img src={profile} className="rounded-circle" width="30" height="30" alt="profile" />
                            <p>Liked by</p>
                        </div>
                        <div className="footer-section-3">
                            <p className="ml-0">Swalih</p>
                        </div>
                        <div className="footer-section-4 position-relative justify-content-between border-top py-3">
                            <div className="d-flex w-100">
                                <div ref={ref} className="mx-0 px-0">
                                    { showEmoji
                                    ? (
                                        <Picker
                                        style={{ position: 'absolute', bottom: '72px', left: '3px',zIndex: '4000' }} 
                                        set="facebook"
                                        showSkinTones="false"
                                        theme="light"
                                        title=""
                                        emoji=""
                                        perLine={7}
                                        emojiSize={30}
                                        onClick={(emoji) => setNewMessage(`${newMessage} ${emoji.native}`)}
                                        showPreview={false}
                                        />
                                    ) : ''}

                                    <div className="emoji-selector">
                                        <button type="button" onClick={() => setShowEmoji(!showEmoji)} className="smile-emoji">
                                            <InsertEmoticonOutlinedIcon />
                                        </button>
                                    </div>
                                </div>
                                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value) } placeholder="Add a comment" />
                            </div>
                            <div>
                                <button disabled={newMessage.length <=0} className="post">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default Posts
