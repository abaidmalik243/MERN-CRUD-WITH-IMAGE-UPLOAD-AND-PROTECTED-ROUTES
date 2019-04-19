import React, { Component } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
  

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    _changeHandler = (e) => {
            const state = this.state;
            state[e.target.name] = e.target.value;
            this.setState({
               state
            })


    }
    AddNewUser = (e) => {
        
        e.preventDefault();
        // alert(this.BookName.value);
        const frm =this.frm.reset();
            const { email ,password} = this.state;
            
        axios.post('/api/user/signup',{email , password})
        .then(
            res => {
                if(res){  
                    toast.success('data has been update successfully'); 
                    this.props.history.push("/login");
                }
               
            } ).catch(err=>{
                toast.error(err);
            })
       
    }
    render() {
        const {email , password} = this.state
        return (
            <div className="container jumbotron">
                <div className="col-md-6 col-md-offset-3">
                    <form method="post" onSubmit={this.AddNewUser}
                    ref = {(el) => this.frm = el }
                    >
                        <h1 style={{ textAlign: 'center' }}>Sign UP</h1>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text"
                             name = 'email'   className="form-control"
                             value={email} onChange={this._changeHandler}
                                required />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" name='password'
                                className="form-control" value={password}
                                onChange={this._changeHandler}
                                required />
                        </div>
                        <button type="submit" className="btn btn-primary form-control">SignUp</button>
                        <h6>Already Sign Up then go to Loging:<a href="/login">Login</a></h6>
                    </form>
                </div>
            </div>
        )
    }
}
export default SignUp;