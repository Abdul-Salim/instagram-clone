import React, { useState } from 'react';
import '../style/Messages.css';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import NewMessage from './newMessage';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';
import classnames from 'classnames';
import profile from "../assets/images/SWALIH-PHOTO.jpg";


const Messages = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [active, setActive] = useState('primary');
    const [genral, setGeneral] = useState(false);

    const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);
    }
  
    return (
        <Container className="d-flex justify-content-center">
            <Row className="messages border h-100 mt-3">
                <Col md="12" className="d-flex p-0">
                    <Col md="5" className="chat-list">
                        <div className="chatList-header border-bottom">
                            <div className="d-flex">
                                <p className="p-0 m-0 name">salim.selu</p>
                                <KeyboardArrowDownOutlinedIcon />
                            </div>
                            <div className="float-end">
                                <NewMessage />
                            </div>
                        </div>
                        <div className="chatList-subHeader d-flex align-items-baseline border-bottom">
                            <p className={`m-0 py-2 pt-2 px-4 ${(active === 'primary') && 'active-tab'}`} onClick={() => setActive('primary')}>PRIMARY</p>
                            <p className={`m-0 py-2 pt-2 ms-2 px-4 ${(active === 'general') && 'active-tab'}`} onClick={() => setActive('general')}>GENERAL</p>
                        {/* <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            PRIMARY
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            GENERAL
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Tab 1 Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col>

            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div> */}
                        </div>
                        <div>
                            {
                                (active === 'primary') ? (
                                    <>
                                    <img src={profile} className="img-fluid rounded-circle" width="24" height="24" alt="chat" />
                                    </>

                                ): (
                                    <>
                                    {/* <img src={profile} className="img-fluid rounded-circle" width="24" height="24" alt="chat" /> */}
                                    <p>Salim ssdkksdfjldj</p>
                                    </>
                                )
                            }
                        </div>
                    </Col>
                    <Col className="border-start">
                        <div>
                            <h1>Center</h1>
                        </div>
                    </Col>
                </Col>
            </Row>
        </Container>
    )
}

export default Messages
