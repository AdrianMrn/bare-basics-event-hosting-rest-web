import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { BrowserRouter, NavLink } from "react-router-dom";
import { withRouter } from 'react-router'
import cookie from 'react-cookies';

import Store from '../Store';

class TopNav extends Component {
    componentDidMount = () => {
        const firstName = cookie.load('firstName');
        if (firstName) {
            const user = this.props.store.get('user');
            this.props.store.set('user')({
                ...user,
                first_name: firstName
            })
        }
    }

    profile = () => {
        this.props.store.set('errorModal')({
            showErrorModal: true,
            alertStyle: 'info',
            errorMessages: ['Download the app to edit your profile!']
            /* TODO: link to google play store */
        });
    }

    render() {
        const firstName = this.props.store.get('user').first_name;
        return (
            <Navbar fixedTop>
                {/* TODO: background-color with app's topnav's color? and text in white?  */}
                <Navbar.Header>
                    <Navbar.Brand>
                        <NavLink to="/" exact>BBEvents</NavLink>
                        {/* TODO: insert logo */}
                    </Navbar.Brand>
                </Navbar.Header>
                {/* <Nav>
                    <NavItem href="#">
                        Explore Events
                    </NavItem>
                </Nav> */}
                {/* TODO: "Get the App!" call to action */}
                {!firstName &&
                    <Nav pullRight>
                        <NavItem href="#" onClick={() => this.props.history.push('/login')}>
                            Log In
                        </NavItem>
                        {/* TODO: "Host your Event" call-to-action button" (links to /register) */}
                    </Nav>
                }
                {!!firstName &&
                    <Nav pullRight>
                        <NavItem href="#" onClick={() => this.props.history.push('/dashboard')}>
                            My Dashboard
                        </NavItem>

                        <NavDropdown title={firstName} id="basic-nav-dropdown">
                            <MenuItem onClick={this.profile}>My Profile</MenuItem>
                            <MenuItem divider />
                            <MenuItem onClick={() => this.props.history.push('/logout')}>Log Out</MenuItem>
                        </NavDropdown>
                    </Nav>
                }
            </Navbar>
        );
    }
}

export default withRouter(Store.withStore(TopNav));
