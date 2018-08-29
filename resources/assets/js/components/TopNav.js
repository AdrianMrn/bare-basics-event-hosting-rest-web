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
        this.props.store.set('appModal')({
            showAppModal: true
        });
    }

    render() {
        const firstName = this.props.store.get('user').first_name;
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <NavLink to="/" exact>
                        <img className="bb-logo" src="/images/textlogo.png" />
                    </NavLink>
                </Navbar.Header>

                {!firstName &&
                    <Nav pullRight>
                        <NavItem href="#" onClick={() => this.props.history.push('/login')}>
                            Log In
                        </NavItem>
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
