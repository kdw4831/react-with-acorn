// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

//함수형 component
function App() {
  //input 요소의 참조값을 활용하기 위해
  let inputFile=useRef()

  const [imageData, setImageData]=useState({})

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      
      <h3>업로드할 이미지 선택</h3>
      <input type="file" accept="image/*" ref={inputFile} />
      <button onClick={()=>{
        console.log(inputFile.current)
        //FormData 객체를 생성해서 
        const formData=new FormData()
        //선택한 파일을 image 라는 파라미터명으로 담는다
        formData.append("image", inputFile.current.files[0])
      
        //axios 를 이용해서 multipart 요청을 보낸다
        axios.post("/image/upload", formData, {
          headers:{
            "Content-Type":"multipart/form-data"
          }
        })
        .then(res=>{
          console.log(res.data)
          //응답받은 데이터를 이용해서 state 변경
          setImageData(res.data)
        })  
        .catch(error=>{
          console.log(error)
        })

      }}>업로드</button>
      <p>업로드 파일명: <strong>{imageData.orgFileName}</strong></p>
      { imageData.saveFileName && <img src={"/upload/images/"+imageData.saveFileName} />}
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;