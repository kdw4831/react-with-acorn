
//App.css 적용하기
import './App.css'


function App() {
  
  const myName="김구라"
  
  //함수를 미리 망들어 놓고
  const clicked=()=>{
    alert("버튼을 눌렀네")
  }

  const boxStyle={
    width:"100px",
    height:"100px",
    border: "1px solid red",
    backgroundColor:"yellow"
  }


  return (
    <div className="container">
      <h1>React js 입니다.</h1>
      <p>내이름은 <strong>{myName}</strong></p>
      <button onClick={()=>{
        alert("버튼을 눌렀네?")
      }}>눌러보셈</button>
      {/* 만들어 놓은 함수 사용해보기*/ }
      <button onClick={clicked} >눌러보셈 2</button>
      <div style={boxStyle}></div>
    </div>
  );
}

export default App;
