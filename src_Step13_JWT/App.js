// App.css 적용하기 (내부 css)
import axios from 'axios';
import './App.css'
import { useEffect, useState } from 'react';

/*
  - CORS 를 우회하기 위한 설정
  package.json 파일에 "proxy":"요청할 서버url" 설정을 하면 자동으로 proxy 서버가 운영된다.

  "proxt":"http://localhost:9000/boot11"

  설정이 되어 있는 상태에서
  axios.post("/auth") 요청을 하면

  React 서버에 http://localhost:3000/auth 요청이 되고
  해당 요청을 proxy 서버가 받아서 http://localhost:9000/boot11/auth 요청을 한다음
  응답받은 데이터가 axios 로 다시 전달된다. 
*/

/*
  axios 기본 요청 경로에 package.json에 설정된 "homepage":"/boot11" 컨텍스트 경로를
  읽어와서 넣어주는 작업을 한다.
  개발할 때는 homepage 설정을 넣지 말고 build 할때만 넣어서 build 해야한다.
*/ 
axios.defaults.baseURL=process.env.PUBLIC_URL

//함수형 component
function App() {
  /*
    const [state,setState]=useState(state의 초기값)
  */
  const [notice,setNotice]= useState([])

  // useEffect(함수, 빈 배열) 함수는 Component가 활성화 될때 한번만 호출된다.(개발환경은 2번)
  useEffect(()=>{
    //UI에 출력할 데이터를 서버로부터 받아온다.
    axios.get("/notice",{
      headers:{
        Authorization:localStorage.token
      }
    })
    .then(res=>{
      console.log(res.data)
      //응답된 데이터를 이용해서 상태값을 변경한다.(UI는 자동으로 업데이트 된다.)
      setNotice(res.data)
    })
  },[])
  
  return (
    <div className="container">
        <h1>인덱스 페이지 입니다</h1>
        <button onClick={()=>{
          // object 를 전달하면 json 문자열이 서버에 전송되고 ContentType:application/json 설정도 axios 가 해준다.
          axios.post("/auth", {
            userName:"aa",
            password:"aa"
          })
          .then(res=>{
            console.log(res.data)
            //응답 받은 JWT 를 localStorage 에 저장하기(웹브라우저의 저장장치)
            localStorage.token="Bearer+"+res.data
          })
        }}>JWT 토큰 발급받기</button>

        <button onClick={()=>{
          axios.get("/ping", {headers:{Authorization:localStorage.token}})
          .then(res=>{
            console.log(res.data)
          })    
        }}>ping 요청하기</button>

        <h3>공지 사항 입니다</h3>
        {/*페이지 로딩 시점에 공지사항이 출력되도록 프로드래밍 해보세요 */}
        <ul>  
          {
            notice.map(item=><li>{item}</li>)
          }
        </ul>
    </div>      
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할 수 있다. (src/index.js)
export default App;