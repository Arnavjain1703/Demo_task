import React,{Component} from 'react'
import './search-item.css'
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
class SearchItem extends Component
{
    replace=(replace)=>
    {
        console.log(replace)
       this.props.history.push(replace);
       
    }
    render()
    {
       
        return(
            <div className="search-item">
                  <div className="Container">
                      <div className="image center">
                        <img className={this.props.class} src={this.props.image}></img>
                      </div>
                        <div className="center font2">
                            <p><u>{this.props.name}</u></p>
                        </div>
                      <div>
                      <p className="para">
                         {this.props.para}
                      </p>
                      </div>
                      <div>
                      <button onClick={()=>this.replace(this.props.replace)} className="btn-4">More</button>
                      </div>
                  </div>
            </div>
        )
    }

}
export default withRouter(SearchItem);