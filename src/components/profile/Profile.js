import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import queryString from "query-string";
import {Spinner} from "../../views/design/Spinner";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 1000px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200%;
  height: 850px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
class Profile extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */
    constructor() {
        super();
        this.state = {
            id: null,
            user: null,
            check: null,
            changedUsername: null,
            changedBirthday: null

        };
    }
    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
     */

    async componentDidMount() {
        const x = queryString.parse(this.props.location.search);
        await this.setState({ id: x.id });

        fetch(`${getDomain()}/user/${this.state.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async user => {
                console.log(user);
                this.setState({ user: user });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    edit() {
        fetch(`${getDomain()}/edit/${this.state.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.changedUsername,
                birthday: this.state.changedBirthday
            })
        })
            .then(response => response.json())
            .then(returnedUser => {
                this.props.history.push(`/menu/users`);
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            });
    }

    back() {
        this.props.history.push(`/menu/users`)
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    {!this.state.user ? (
                        <Spinner />
                    ) : (
                    <Form>
                        <h2>Username:</h2>
                        <label>{this.state.user.username}</label>
                        <h2>Online Status:</h2>
                        <label>{this.state.user.status}</label>
                        <h2>Creation Date:</h2>
                        <label>{this.state.user.registrationDate}</label>
                        <h2>Birthday:</h2>
                        <label>{this.state.user.birthday}</label>
                        <h2> </h2>
                        <Label>Enter password to edit profile</Label>
                        <InputField
                            type="password"
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("check", e.target.value);
                            }}
                        />
                        <Label>New Username</Label>
                        <InputField
                            disabled={!(this.state.check === this.state.user.password)  }
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("changedUsername", e.target.value);
                            }}
                        />
                        <Label>New Birthday</Label>
                        <InputField
                            disabled={!(this.state.check === this.state.user.password)  }
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("changedBirthday", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!(this.state.check === this.state.user.password)  }
                                width="50%"
                                onClick={() => {
                                    this.edit()
                                }}
                            >
                                Edit
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.back();
                                }}
                            >
                                Back
                            </Button>
                        </ButtonContainer>
                    </Form>
                        )}
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Profile);
