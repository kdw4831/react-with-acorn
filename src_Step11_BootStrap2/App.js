


//설치되어 있는 부트스트랩 import 하기 (모든 component가 사용할 수 있다)
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

//함수형 component
function App() {
  const [show,setShow]=useState(true)

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
      
      <label>
        <input type="checkbox" checked={show} onChange={(e)=>{
          //체크박스의 체크 상태를 state에 반영할 수 있다.
          setShow(e.target.checked)
        }}/>
      </label>
      <br />
      {show &&  <button className='btn btn-primary'>버튼</button>}
      <Button variant ='success' >버튼</Button>

      { show &&
      <Alert variant="success" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert>
      }

    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;