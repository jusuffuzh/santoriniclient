import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Menu from "../../menu/Menu";
import Users from "../../users/Users"
import Profile from"../../profile/Profile"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
            exact
            path={`${this.props.base}`}
            render={() => <Menu />}
        />
        <Route
            exact
            path={`${this.props.base}/users`}
            render={() => <Users />}
        />
        <Route
            exact
            path={`${this.props.base}/profile`}
            render={() => <Profile />}
        />
        <Route
            path={`${this.props.base}/users/profile`}
            render={() => <Profile />}
        />

      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
