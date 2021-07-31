import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {Otp, resendOtp} from "../store/ServerService"
import './otp.css'
import { Form } from "react-bootstrap";
import Swal from 'sweetalert2';
class otp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      error:0
    };
    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.value.match(/^[0-9]{4}$/))
    {
      this.setState({error:0})
    }
  }
  performVerify = async event => {
    console.log(event)
    event.preventDefault();
    console.log(!this.state.otp.match(/^[0-9]{4}$/))

    if(!this.state.otp.match(/^[0-9]{4}$/))
    {
        this.setState({error:1})
    }
    else{
      this.setState({error:0})
    Otp(this.state.otp).then(response=>
      {
        response.json().then((response)=>
        {
          if(response.message!="Invalid Otp")
          {
              this.props.history.replace('/');
          }
          Swal.fire({
            html:
                '<div style = "color:black;background:white ; box-shadow:2px 2px 10px black; padding: 10px 10px  ">'+response.message+'</div> ',
               showConfirmButton: false,
                 background:"transparent",
              timer:5000,
       })
        }
        );
      })
  }
 }
 performresend=(event)=>
 {
  event.preventDefault();
  // resendOtp().then(response=>
  //   {
  //     console.log(response.json());
  //   })
 }
  render() {
    return (
        <div className="otp">
        <div className="col-xs-12 container">
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 box">       
                <h3 className="text-center"><b>Verify Your Credentials</b></h3>
                <div>
                <form  className="myform">
                    <div >
                        <div className="form-group center">
                            <div>
                            <input
                               type="text"
                               name="otp"
                               placeholder="Enter the digits"
                               onChange={this.onchange}
                            />           
                           </div>
                            <span 
                            className="help-block"
                            style={{color:"red",opacity:this.state.error}}>Enter valid otp
                            </span>
                            <div
                            className="help-block"
                            style={{color:"#262537"}}>OTP will expire in <span style={{color:"red"}}>1:10</span> minutes</div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-6">
                          <button className="btn-4 " type="submit" onClick={event => this.performVerify(event)}>
                            Verify
                          </button>
                      </div>
                      <div className="col-xs-6">
                          <button className="btn-4" type="button" onClick={event => this.performresend(event)}>
                            Resend Otp
                          </button>
                      </div>
                    </div>
                    </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    );
}}
export default withRouter(otp);

