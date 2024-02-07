
//App.css 적용하기
import { Component } from 'react';
import './App.css'
import Child from './components/ChildComponent';
import Contact from './components/ContactComponent';
import MyName from './components/MyNameComponent';

//클래스형 component
class App extends Component{
  //render()함수에서 리턴하는 jsx로 화면 구성이 된다.
  render(){
    const name="원숭이"
    return(
      <div className='container'>
        <h1>인덱스 페이지 입니다.</h1>
        <Child/>
        <Child/>
        <Child/>
        <Contact/>
        {/* MyName Component에 name이라는 property 명으로 string type "김구라" 전달하기 */}
        <MyName name={"김구라"}></MyName>
        <MyName name={"해골"}></MyName>
        <MyName name={"원숭이"}></MyName>
        <MyName name={name}></MyName>
        <MyName name={"덩어리"} action={()=>{
          alert("자식 Component의 버튼이 클릭되었네?")
        }}></MyName>


      </div>
    )
  }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
