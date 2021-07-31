import React, { useCallback }  from 'react'
import './contact.css'
import {CONTACT_US} from '../../store/ServerService'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/action'

class Contact extends React.Component{
   
    state={
        orderForm:{
            name:{
                label:'Name',
                elementType:'input',
                elementConfig:{
                    type:'text',
                },
                error:'Name is Required',
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
            
            query:{
                label:'Query',
                elementType:'textarea',
                elementConfig:{
                    type:'text',
                },
                error:'Query of Min 100 Letter is Required',
                validation:{
                  required:true,
                  minlength:100
                             
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
   {
     this.props.changeLoader()
    event.preventDefault();
    CONTACT_US(this.state.orderForm.name.value,this.state.orderForm.email.value,this.state.orderForm.query.value)
    .then(response=>
        {   this.props.changeLoader()
            console.log(response.json())
        })    
    .catch(error=>
        {   this.props.changeLoader()
            console.log(error)
        })    
   }
    render(){
        console.log(this.props.ctr)
        let Array=[];
        
         for(let key in this.state.orderForm)
         {
            Array.push({id:key,config:this.state.orderForm[key]} )
         }
        return(
            <div className='contact background'>
               <div className="center font padding">
                    <div className="underline">
                     Drop a Mail
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                       <div className="form-padding">
                        <form onSubmit={(event)=>this.submit(event)}>
                            { 
                            Array.map((element)=>
                            { 
                                if(element.config.elementType=='input')
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
                                else{
                                    return (
                                    <div key={element.id}>
                                        <div className="label-padding">
                                             <label>{element.config.label}</label>
                                         </div>
                                         <div className="form-center">
                                             <textarea
                                              value={element.config.value} 
                                              onClick={
                                              ()=>this.touched(element.id)} 
                                              onChange={
                                              (event)=>this.inputchangheHandler(event,element.id)    
                                                }
                                              className={(!element.config.touched||element.config.valid)?null:"invalid"}
                                              ></textarea>
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
                              }
                             )
                            } 
                            <button className="btn-4" type="submit">submit</button>
                        </form>
                       </div>
                    </div>
                    <div class ="col-md-6 center display">
                        <img src='/assets/email.png'></img>
                    </div>
                </div>
                 <div>
                     
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
export default connect(mapStateToProps,mapDispatchToProps)(Contact);
