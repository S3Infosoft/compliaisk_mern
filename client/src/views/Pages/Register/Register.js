import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { withRouter, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import isEmpty from "is-empty";

const spanStyles = {
  color: "#FF0000",
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      error: {},
      userImage: "",
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onImageChange = (e) => {
    this.setState({ userImage: e.target.files[0] });
  };

  onScreenChange = () => {
    this.props.history.push("/login");
  };

  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    formData.append("password2", this.state.password2);
    formData.append("image", this.state.userImage);

    // const newUser = {
    //   name: this.state.name,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2,
    //   userImage: this.state.userImage,
    // };

    // console.log(newUser);

    this.props.registerUser(formData, this.props.history);

    if (!this.state.userImage) {
      this.setState({
        error: { userImage: "Upload your pic" },
      });
    }

    // setTimeout(function () {
    //   if (
    //     Object.entries(this.state.error).length > 0 ||
    //     Object.entries(this.state.errors).length > 0
    //   ) {
    //     this.setState({
    //       error: {},
    //       errors: {},
    //     });
    //   }
    // }, 30000);
  };

  render() {
    const { errors, error } = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={this.onSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.onChange}
                        value={this.state.name}
                        error={errors.name}
                        id="name"
                        type="text"
                        className={classnames("", {
                          invalid: errors.name,
                        })}
                        placeholder="Username"
                        autoComplete="username"
                      />
                      <span className="red-text" style={spanStyles}>
                        {errors.name}
                      </span>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="text"
                        className={classnames("", {
                          invalid: errors.email,
                        })}
                        placeholder="Email"
                        autoComplete="email"
                      />
                      <span className="red-text" style={spanStyles}>
                        {errors.email}
                      </span>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password,
                        })}
                        placeholder="Password"
                        autoComplete="new-password"
                      />
                      <span className="red-text" style={spanStyles}>
                        {errors.password}
                      </span>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={this.onChange}
                        value={this.state.password2}
                        error={errors.password2}
                        id="password2"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password2,
                        })}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                      />
                      <span className="red-text" style={spanStyles}>
                        {errors.password2}
                      </span>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      {/* <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-cloud-upload"></i>
                        </InputGroupText>
                        <label
                          htmlFor="userImage"
                          style={{ paddingLeft: "10px"}}
                        >
                          Upload Your Profile pic
                        </label>
                      </InputGroupAddon> */}
                      <span>
                        <Input
                          onChange={this.onImageChange}
                          // value={this.state.userImage}
                          error={error.userImage}
                          id="userImage"
                          type="file"
                          className={classnames("", {
                            invalid: errors.userImage,
                          })}
                          placeholder="upload your image"
                          // style={{visibility: "hidden"}}
                        />
                      </span>
                      <span className="red-text" style={spanStyles}>
                        {error.userImage}
                      </span>
                    </InputGroup>
                    <Button color="success" block>
                      Create Account
                    </Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12">
                      <Button
                        className="btn-facebook mb-1"
                        block
                        onClick={this.onScreenChange}
                      >
                        <span>Login Page</span>
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook mb-1" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
