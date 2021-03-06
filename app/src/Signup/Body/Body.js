import React,{Component, component} from 'react'
import './Body.css'
import {Signup} from '../../store/ServerService'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom";
import Swal from 'sweetalert2';
import * as actionTypes from '../../store/action'
class Body extends Component{
    
    state={
        submitted:false,
        orderForm:{ 
           
            name:{
                label:'Name',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                error:'Name is required',
                validation:{
                  required:true,
                },
                valid:false,
                value:'',
                touched:false
            },
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
                  ajax:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/     
                },
                valid:false,
                value:'',
                touched:false,
               
            },
            confirm_password:{
                label:'Confirm Password',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                error:'Password dose not match' ,
                validation:{
                  checkwith:'password'          
                },
                valid:false,
                value:'',
                touched:false,
                
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
         if(rules.checkwith)
         {  
             isValid=(value.trim()==(this.state.orderForm[rules.checkwith].value))&&isValid
         }
         return isValid
    }
    inputchangheHandler=(event,id)=>
    {  
       let UpdatedForm={...this.state.orderForm};
       let updatedElement={...this.state.orderForm[id]}
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
   {
     event.preventDefault();
     this.setState({submitted:true})
     let valid=true;
     const UpdatedForm={...this.state.orderForm};
     for(let key in this.state.orderForm)
     {
         valid=valid&&this.state.orderForm[key].valid;
         let updatedElement={...this.state.orderForm[key]}
         if(!this.state.orderForm[key].valid)
         {
             updatedElement.value="";
             UpdatedForm[key]=updatedElement;
         }
     }
     this.setState({orderForm:UpdatedForm});
     if(valid)
     { this.props.changeLoader();
        
     Signup(this.state.orderForm.name.value,this.state.orderForm.email.value,this.state.orderForm.password.value).then((response)=>
     { 
        this.props.changeLoader();
        response.json().then((response)=>{
            let message="";
            if(response.data)
            {
                message=response.data[0].msg
            }
            else{
                message=response.message
            }
            Swal.fire({
                html:
                    '<div style = "color:black;background:white ; box-shadow:2px 2px 10px black; padding: 10px 10px  ">'+message+'</div> ',
                   showConfirmButton: false,
                     background:"transparent",
                  timer:5000,
           })
            localStorage.setItem("token",response.token);
            if(!response.data)
            {
            this.props.history.replace('/otp');
            }
            
        })
     })
    }

   }
    render()
    {   let Array=[];
        
        for(let key in this.state.orderForm)
        {
           Array.push({id:key,config:this.state.orderForm[key]} )
        }
        return (
            <div className="signup"> 
                <div className="background">
                    <div className="row">
                    <div className="head-display head center">
                                GET YOURSELF REGISTER
                            </div>
                        <div  className="col-lg-6 center remove">
                        <img  className="images display" src='/assets/signup.svg'></img>
                        </div>
                        <div className="col-lg-6">
                            <div className="head-display2 head center">
                                GET YOURSELF REGISTER
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
                                              className={(!this.state.submitted||element.config.valid)?null:"invalid"}
                                             >
                                            </input>
                                         </div>
                                          <div>
                                          <span 
                                          className={(!this.state.submitted||element.config.valid)?"opacity":"error"}
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