import React,{Component, component} from 'react'
import Navbar from '../Navbar/Navbar'
import Body from './Body/Body'
class Login extends Component{
    render()
    {
        return (
            <div>
            <Navbar></Navbar>
            <Body></Body>
            </div>
        )
    }
}
export default Login