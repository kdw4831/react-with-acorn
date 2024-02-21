//src/components/Fortune.js

import { Component } from "react";


class Fortune extends Component{
    //component가 활성화 될때 호출하는 함수
    componentDidMount(){
        console.log("Fortune이 호출되었습니다.")
    }
    //components가  비활성화 될때 호출하는 함수
    componentWillUnmount(){

        console.log("Fortune이 비활성화 되었습니다.")
    }
    render(){
        return(
            <p>오늘의 운세 입니다.<strong>{this.props.msg}</strong></p>
        )
    }
    
}

export default Fortune