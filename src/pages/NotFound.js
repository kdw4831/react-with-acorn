//src/pages/NotFound.js

import { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component{
    render(){
        return(
            <>
            <h3>404 NotFound</h3>
            <p>요청한 페이지는 없는 페이지 입니다.</p>
            <Link to="/">Home페이지로 가기</Link>
            </>
        )
    }
}

export default NotFound