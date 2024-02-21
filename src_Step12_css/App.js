/*
  특정 component에만 적용될 외부 css파일을 만들때는 xxx.moudle.css 형태로 만들어야한다.
  import  된 myCss는 object이다.
  -object의 구조
  {클래스명:"변형된 클래스명",...}
*/ 
import './App.css'
import Play from './components/play';


//함수형 component
function App() {

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      <Play></Play>
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;