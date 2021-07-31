import React,{Component, component} from 'react'
import './body.css'
import Navbar from'../Navbar/Navbar'
import Child from './govtSchoolitem/body'
import { connect } from 'react-redux'
import {getOrginization} from '../store/ServerService'
import * as actionTypes from '../store/action'
import Dropdown from 'react-bootstrap/Dropdown'
class Body extends Component{
    state=
    {
        location:""
    }
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
    location=(location)=>
    {
       this.setState({location:location})
    }

    render()
       { 
        const n=this.number();   
        const L=n+8;
        const A=this.props.ctr
        console.log(this.props.ctr);
        return (
            <div className="govt">
                <Navbar></Navbar>
                <div className="layer"></div>
                <div className="upper">
                  <div className="name1">
                        <span className="rotate">G</span>
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
                        <span>S</span>
                        <span>C</span>
                        <span>H</span>
                        <span>O</span>
                        <span>O</span>
                        <span>L</span>
                        <span>S</span>
                  </div>
                </div>
                <div className="bg">
                <Dropdown id="border">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                <Dropdown.Item onClick={()=>this.location("Meerut")}>Meerut</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.location("Muzaffarnagar")}>Muzaffarnage</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.location("Mumbai")}>Mumbai</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.location("Delhi")}>Delhi</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.location("Chennai")}>Chennai</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.location("")}>ALL</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                {A.map(order=>(
                   <Child location={this.state.location} element={order}></Child>
                ))}
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