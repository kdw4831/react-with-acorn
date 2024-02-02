
//App.css 적용하기
import { Component } from 'react';
import './App.css'



// //함수형 component
// function App() {
  


//   return (
//     <div className='container'>
//       <h1>인덱스 페이지 입니다.</h1>
//     </div>
//   );
// }


class App extends Component{
  //render()함수에서 리턴하는 jsx로 화면 구성이 된다.
  render(){
    return(
      <div className='container'>
        <h1>인덱스 페이지 입니다.</h1>
      </div>
    )
  }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
