import React,{Component} from 'react';
import './donation.css'
import Navbar from '../Navbar/Navbar'
import {paytm} from '../store/ServerService'
class Donation extends Component{
   
    constructor(props) {
        super(props);
    
        this.state=
        {
            CALLBACK_URL:"",
            CHANNEL_ID:"",
            CHECKSUMHASH:"",
            CUST_ID:"skjdfvn",
            EMAIL:"",
            INDUSTRY_TYPE_ID:"",
            MID:"",
            MOBILE_NO:"",
            ORDER_ID:"",
            TXN_AMOUNT:"",
            WEBSITE:"",
    
        }
    
        this.submit = this.submit.bind(this);
    }
    submit()
    {   
        console.log("helo");
        paytm().then((response)=>
            {response.json().then((response)=>
            {  console.log(response)
               this.setState({CALLBACK_URL:response.CALLBACK_URL})
               this.setState({CHANNEL_ID:response.CHANNEL_ID})
               this.setState({CHECKSUMHASH:response.CHECKSUMHASH})
               this.setState({CUST_ID:response.CUST_ID})
               this.setState({EMAIL:response.EMAIL})
               this.setState({INDUSTRY_TYPE_ID:response.INDUSTRY_TYPE_ID})
               this.setState({ MID:response.MID})
               this.setState({MOBILE_NO:response.MOBILE_NO})
               this.setState({ ORDER_ID:response.ORDER_ID})
               this.setState({TXN_AMOUNT:response.TXN_AMOUNT})
               this.setState({ WEBSITE:response.WEBSITE})
            },
            )
        }
        )
    }
    render()
    {   
        let Array=[];
        
        for(let key in this.state)
        {
           Array.push({id:key,config:this.state[key]} )
        }
        return (
            <div className="donation">
                <Navbar></Navbar>
               <div className="row">
                   <div className="col-md-6 image">
                        <img src="/assets/donation.svg"></img>
                   </div>
                   <div className="col-md-6 ">
                        <button onClick={this.submit}>donate</button>
                   </div>
                     <form ref="form" action="https://securegw.paytm.in/order/process" method="POST">
                         {
                              Array.map((element)=>
                              {
                                  return(
                                  <input type="text" name={element.id} value={element.config} key={element.id}></input>
                                  )
                              }
                            )

                         }
                         <button type="submit">submit</button>
                     </form>
               </div>
            </div>
        )
    }
}
export default Donation

