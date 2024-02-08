// src/pages/Study.js

import { Link, useNavigate, useParams } from "react-router-dom";

const { Component } = require("react");


function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
  }
  

class Study extends Component{
    componentDidMount(){
        console.log("Study component mounted!")
    }
    componentWillUnmount(){
        console.log("Study component will unmount!")
    }
    render(){
        
        return (
            <>
                <h3>Study 페이지 입니다</h3>
                <p>열심히 공부해 보아요</p>
                <Link to="/">Home</Link> 
                <button onClick={()=>{
                    //javascript 로 이동하기
                    this.props.navigate("/")
                }}>Home</button>    
            </>
        )
    }
}

export default withNavigation(Study)