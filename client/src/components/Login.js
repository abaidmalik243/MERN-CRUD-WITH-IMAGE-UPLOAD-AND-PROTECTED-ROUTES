import React, { Component } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  _changeHandler = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({
      state
    });
  };
  LoginUser = e => {
    e.preventDefault();
    const frm = this.frm.reset();
    const { email, password } = this.state;

    axios.post("/api/user/login", { email, password }).then(res => {
      if (res) {
        toast.success("Login Successfully");
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
         // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      const currentUser={
          decoded:decoded,
          isAuthorized:true
      }
      localStorage.setItem('currentuser',JSON.stringify(currentUser))
        this.props.history.push("/addBook");
      }else{
        toast.error("Invalid User");
      }
    }).catch(err=>{
        toast.error(err);
    });
  };
  render() {
    const { email, password } = this.state;
    return (
      <div className="container jumbotron">
        <div className="col-md-6 col-md-offset-3">
          <form
            method="post"
            onSubmit={this.LoginUser}
            ref={el => (this.frm = el)}
          >
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="form-control"
                value={email}
                onChange={this._changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="text"
                name="password"
                className="form-control"
                value={password}
                onChange={this._changeHandler}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
