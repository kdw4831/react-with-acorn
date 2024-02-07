// MyNameComponent.js

import { Component } from "react";


class MyName extends Component{
    
    render(){
        //부모 Component에서 전달한 값(properties)
        const name=this.props.name
        return(
            <p>
                내이름은 : <strong>{name}</strong>입니다
                <button onClick={()=>{
                    //부모 Component에서 전달할 함수 호출하기
                    this.props.action() 
                }}>눌러보셈</button>
            </p>
        )
            
    }
}

export default MyName