
//App.css 적용하기
import { Component } from 'react';
import './App.css'

//클래스형 component
class App extends Component{
    state={
        msg:""
    }
    //input 요소에 input 이벤트가 일어날 때마다 호출되는 함수
    onInput = (e)=>{
        //입력한 문자열
        const msg=e.target.value
        //state를 변경
        this.setState({
            msg:msg
        })
    }


    //render()함수에서 리턴하는 jsx로 화면 구성이 된다.
    render(){
        return(
        <div className='container'>
            <h1>인덱스 페이지 입니다.</h1>
            <input type="text" />
            <p onClick={this.onInput}>{this.state.msg}</p>
        </div>
        )
    }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
