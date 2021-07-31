import React,{Component, component} from 'react'
import './Body.css'
import {login} from '../../store/ServerService'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom"
import * as actionTypes from '../../store/action'
import Swal from 'sweetalert2';

class Body extends Component{
    state={
        orderForm:{ 
            email:{
                label:'Email',
                elementType:'input',
                elementConfig:{
                    type:'email',
                },
                error:' Valid Email is Required',
                validation:{
                  required:true,
                  ajax:/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
                },
                valid:false,
                value:'',
                touched:false
            },
            
            password:{
                label:'Password',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                error:'Enter Your Password',
                validation:{
                  required:true,
                             
                },
                valid:false,
                value:'',
                touched:false
            },
     } 
    }
    Checkvalidation=(value,rules)=>
    {
         let isValid=true;
         if(rules.required)
         {              
           isValid=value.trim()!=='' && isValid ;
         }
         if(rules.ajax)
         {
            isValid=value.trim().match(rules.ajax) && isValid ;
         }
         if(rules.minlength)
         {
           isValid=value.trim().length>=rules.minlength && isValid;
         }
         return isValid
    }
    inputchangheHandler=(event,id)=>
    {
       const UpdatedForm={...this.state.orderForm};
       const updatedElement={...this.state.orderForm[id]}
       updatedElement.value=event.target.value;
       updatedElement.valid=this.Checkvalidation(event.target.value,updatedElement.validation)
       UpdatedForm[id]=updatedElement;
       this.setState({orderForm:UpdatedForm})
       
    } 
    touched=(id)=>
   {
    const UpdatedForm={...this.state.orderForm};
    const updatedElement={...this.state.orderForm[id]}
    updatedElement.touched=true;
    UpdatedForm[id]=updatedElement;
    this.setState({orderForm:UpdatedForm})
   }
   submit=(event)=>
   { event.preventDefault();
      this.props.changeLoader()
      login(this.state.orderForm.email.value,this.state.orderForm.password.value)
      .then((response)=>
      {
          response.json().then((response)=>
         { this.props.changeLoader()
            if(response.message)
            {   let message=response.message
                if(response.message==="Please Verify Yourself First")
                {
                    this.props.history.replace('/otp');
                   
                }
                Swal.fire({
                    html:
                        '<div style = "color:black;background:white ; box-shadow:2px 2px 10px black; padding: 10px 10px  ">'+message+'</div> ',
                       showConfirmButton: false,
                         background:"transparent",
                      timer:5000,
               })
            }
            else{
                localStorage.setItem("token",response.token);
                this.props.history.replace('/')
            }
         }
          )
      })
   }
    render()
    {   let Array=[];
        
        for(let key in this.state.orderForm)
        {
           Array.push({id:key,config:this.state.orderForm[key]} )
        }
        return (
            <div className="login"> 
                <div className="background">
                    <div className="row">
                    <div className="head-display head center">
                               Login Yourself
                            </div>
                        <div  className="col-lg-6 center remove">
                        <img  className="images display" src='/assets/login.svg'></img>
                        </div>
                        <div className="col-lg-6">
                        <div className="head-display2 head center">
                                Login Yourself
                            </div>
                        <div className="form-padding">
                        <form onSubmit={(event)=>this.submit(event)}>
                            { 
                            Array.map((element)=>
                            { 
                                
                                    return(
                                        <div key={element.id}>
                                         <div className="label-padding">
                                             <label>{element.config.label}</label>
                                         </div>
                                         <div className="form-center">
                                            <input 
                                             value={element.config.value} 
                                              onClick={
                                              ()=>this.touched(element.id)} 
                                              onChange={
                                              (event)=>this.inputchangheHandler(event,element.id)    
                                              }             
                                              className={(!element.config.touched||element.config.valid)?null:"invalid"}
                                             >
                                            </input>
                                         </div>
                                          <div>
                                          <span 
                                          className={(!element.config.touched||element.config.valid)?"opacity":"error"}
                                         >{element.config.error}
                                         </span>
                                          </div>
                                         </div>
                                    )
                                }
                                
                              
                             )
                            } 
                            <button className="btn-4" type="submit">submit</button>
                        </form>
                       </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        ctr:state.loader   
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        changeLoader:()=>dispatch({type:actionTypes.CHANGE_LOADER}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Body))