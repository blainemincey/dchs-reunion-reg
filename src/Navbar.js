import { withAuth } from '@okta/okta-react';
import React, { Component } from 'react';
import { Container, Image, Menu } from 'semantic-ui-react';
import { checkAuthentication } from './helpers';

export default withAuth(class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
        this.checkAuthentication = checkAuthentication.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    async login() {
        this.props.auth.login('/');
    }

    async logout() {
        this.props.auth.logout('/');
    }

    render() {
        return (
            <div>
                <Menu fixed="top" inverted>
                    <Container>
                        <Menu.Item as="a" header href="/">
                            <Image size="mini" src="https://p19cdn4static.sharpschool.com/UserFiles/Servers/Server_127842/Image/logo.jpg" />
                            &nbsp;
                            DCHS Reunion Registration
                        </Menu.Item>
                        {this.state.authenticated === true && <Menu.Item id="profile-button" as="a" href="/profile">Profile</Menu.Item>}
                        {this.state.authenticated === true && <Menu.Item id="logout-button" as="a" onClick={this.logout}>Logout</Menu.Item>}
                        {this.state.authenticated === false && <Menu.Item as="a" onClick={this.login}>Login</Menu.Item>}
                    </Container>
                </Menu>
            </div>
        );
    }
});