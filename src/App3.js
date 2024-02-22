// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

//함수형 component
function App3() {
  //input 요소의 참조값을 활용하기 위해
  let inputFile=useRef()
  let inputTitle =useRef()

  const [imageData, setImageData]=useState({})
  const [previewImage, setPreviewImage]=useState(null)
  // 이미지 파일을 선택했을 때 호출되는 함수 
  const handleChange=(e)=>{
    //선택한 파일 얻어내기
    const file=e.target.files[0]
    //선택한 파일로 부터 이미지 로딩하기
    const reader= new FileReader()
    reader.readAsDataURL(file)
    //로딩이 완료되었을 때 호출되는 함수 등록
    reader.onload=(event)=>{
        //읽은 이미지 데이터
        const data=event.target.result
        console.log(data)
        setPreviewImage(data)
    }  
  }
  const previewStyle={
    "width" : "200px",
    borderRadius: "10px" // 여러단어 조합인 경우에는 카멜 케이스로 작성 가능
}



  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      
      <h3>업로드할 이미지 선택</h3>
      <input type="text" placeholder="제목... " ref={inputTitle} />
      <input type="file" accept="image/*" ref={inputFile} onChange={handleChange} />
      <br />
      <img src={previewImage}  style={previewStyle} alt='미리보기 이미지'/>   
      <br />
      <button onClick={()=>{
        //입력한 제목과 이미지 파일을 FormData 객체에 담는다.
        const formData= new FormData()
        formData.append("title", inputTitle.current.value)
        formData.append("image", inputFile.current.files[0])
        axios.post("/image/upload2",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        .then(res=>{
            console.log(res.data)
        })
      }}>업로드</button>
      
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App3;