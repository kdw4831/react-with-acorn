// App.css 적용하기 (내부 css)
import { Alert, Button, Card, Col, Container, Pagination, Row } from 'react-bootstrap';
import './App.css'

//npm install bootstrap 했기 때문에 import 해서 사용할 수 있다.
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';

//페이징 UI를 만들때 사용할 배열을 리턴해주는 함수
function createArray(start,end){
  const result=[];
  for(let i= start; i<=end; i++){
    result.push(i);
  }
  return result
}


//함수형 component
function App() {
  //출력할 페이지 번호가 들어있는 배열
  const pageNums=createArray(1,5)
  //현재 페이지 번호
  //const currentPage=3
  const[currentPage,setCurrentPage]=useState(3)

  return (
    <Container>
        <h1>인덱스 페이지 입니다.</h1>
        <Row>
          <Col>컬럼1</Col>
          <Col>컬럼2</Col>
          <Col>컬럼3</Col>  
        </Row>
        <Button variant='primary'>primary</Button>
        <Button variant='success' size='lg'>success-lg</Button>  

        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>


        <Alert variant="danger" dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>

        <Pagination>
          <Pagination.Prev/>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item active={true}>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>
          <Pagination.Next/>
        </Pagination>
        <Pagination>
          {pageNums.map(num=><Pagination.Item onClick={()=>{
            setCurrentPage(num)
          }} key={num} active={num===currentPage}>{num}</Pagination.Item>)}
        </Pagination>
    </Container>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;