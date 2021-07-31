import React,{Component, component} from 'react'
import './body.css'
import Navbar from'../Navbar/Navbar'
import Child from './nongovtorgitem/body'
import { connect } from 'react-redux'
import {getOrginization} from '../store/ServerService'
import * as actionTypes from '../store/action'
class Body extends Component{
    componentDidMount()
    {   this.props.changeLoader()
        getOrginization().then(response=>
            {
                response.json().then(response=>{
                const array=response.message;
                this.props.Setorg(array)
                })
                this.props.changeLoader()
               
            })
    }
    number(n=0)
    {
       return 0;
    }

    render()
       { 
        const n=this.number();   
        const L=n+8;
        const A=this.props.ctr.slice(n,L)
        console.log(this.props.ctr);
        return (
            <div className="govt">
                <Navbar></Navbar>
                <div className="layer"></div>
                <div className="upper">
                  <div className="name1">
                        <span className="rotate">N</span>
                        <span>O</span>
                        <span>N</span>
                        <span>-</span>
                        <span>G</span>
                        <span>O</span>
                        <span>V</span>
                        <span>E</span>
                        <span>R</span>
                        <span>N</span>
                        <span>M</span>
                        <span>E</span>
                        <span>N</span>
                        <span>T</span>
                  </div>
                  <div className="name2">
                        <span>O</span>
                        <span>R</span>
                        <span>G</span>
                        <span>A</span>
                        <span>N</span>
                        <span>I</span>
                        <span>S</span>
                        <span>A</span>
                        <span>T</span>
                        <span>I</span>
                        <span>O</span>
                        <span>N</span>
                  </div>
                </div>
                <div className="bg">
                {A.map(order=>(
                   <Child element={order}></Child>
                ))}
                 <button className="btn btn-success">+</button>
            </div>
           
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return {
        ctr:state.goveSchools
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        Setorg:(array)=>dispatch({type:actionTypes.SCHOOLS,array:array}),
        changeLoader:()=>dispatch({type:actionTypes.CHANGE_LOADER}),
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Body);