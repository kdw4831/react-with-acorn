// src/pages/Study.js

import { Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Eng from "./Eng";
import MathCom from "./MathCom";


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
                <ul>
                    <li><NavLink to="/study/math">수학공부</NavLink></li>
                    <li><NavLink to="/study/eng">영어공부</NavLink></li>
                </ul>
                <Routes>
                    <Route path="/math" Component={MathCom}></Route>
                    <Route path="/eng" Component={Eng}></Route>
                </Routes>
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