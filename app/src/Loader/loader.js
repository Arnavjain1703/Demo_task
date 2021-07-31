import React,{Component} from 'react'
import './loader.css'
import {connect} from 'react-redux';
class Loader extends Component
{    state=
    {
        loder:false
    }
    render()
    {   
        return (
            <div>
            <div className={this.props.ctr?"Lshow":"Lunshow"}>
            <div className="loader-background">
            </div>
            <div className="loader" id="loader-7">
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
export default connect(mapStateToProps,{})(Loader)
