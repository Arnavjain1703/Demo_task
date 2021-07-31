import React,{Component, component} from 'react'
import {storage} from '../firebase/index'
class Orginization extends Component{
    image="";
    inputchangheHandler=(event)=>
    {
        this.image=event.target.files[0]
        
    }
    submit()
    {  
        const upload=storage.ref('images/'+this.image.name).put(this.image);
        upload.on(
            "state_changed",
            snapshot=>{},
            error =>
            {
                console.log(error);
            },
            ()=>
            {
                storage.ref("images").child(this.image.name).getDownloadURL().then(url=>console.log(url))
            }
        )
    }
    render()
    {
        return (
            <div>
              <from >
                 <input
                  onChange={
                    (event)=>this.inputchangheHandler(event)    
                    } 
                 type="file"></input>
                 <button onClick={(event)=>this.submit(event)}>submit</button>
              </from>
            </div>
        )
    }
}
export default Orginization