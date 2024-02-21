
import { Alert, Button, Container } from 'react-bootstrap';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';



//함수형 component
function App() {
  const [show,setShow]=useState(false)
  const  menus = [ "라면", "김밥", "떡복기", "짜장면" , "짬뽕"]
  Math.floor(Math.random() * (3));
  return (
    <Container>
      <h1>점심 추천 페이지 입니다.</h1>
      <Button variant='danger' onClick={(e)=>{
          setShow(true)
        }}> 점심 추천</Button>
      <Alert variant="info"  show={show} onHide={()=>{setShow(false)}}  >
        <Alert.Heading>오늘의 점심 메뉴</Alert.Heading>
        {menus[Math.floor(Math.random() * (3))  ]}
      </Alert>  
    </Container>
  );
}


export default App;