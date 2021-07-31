import React,{Component, component} from 'react'
import './body.css'
class Body extends Component{
    render()
    {   console.log(this.props.element.image)
        return (
            <div className="school-item">
                <div className="width">
                <div className="card">
                 <div className="image">
                    <img src={this.props.element.image}></img>
                  </div>  
                    <div className="center name">
                        {this.props.element.name}
                    </div>
                    <div className="center address">
                        {this.props.element.address}
                    </div>
                    <div className="center description">
                      <textarea>{this.props.element.description}</textarea>
                    </div>
                    <button className="btn-4">Read More</button>
                 
                 </div>
                </div>
            </div>
        );
    }

}
export default Body