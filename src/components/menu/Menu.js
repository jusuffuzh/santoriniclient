import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { withRouter } from "react-router-dom";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Button = styled.div`
&:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 50px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 80px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200%;
  height: 500px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bot: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */

class Menu extends React.Component {


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {
                                }}
                            >
                                Play
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {
                                    this.props.history.push("/menu/users");
                                }}
                            >
                                User Overview
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {
                                }}
                            >
                                Options
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="100%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(Menu);