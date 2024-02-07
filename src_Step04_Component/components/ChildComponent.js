import { Component } from "react";

class Child extends Component{
    render(){
        return(
            <div className="child">
                자식 컴포넌트 입니다.
                <button onClick={()=>{
                    alert("버튼을 눌렀네?")
                }}>눌러보셈</button>
            </div>
        )
    }
}


// 파일 import 하는 곳에 위에 정의된 클래스를 default로 넘겨주기
export default Child