
//App.css 적용하기
import { Component } from 'react';
import './App.css'
/*
    [Restful API 요청 예시]
    GET    /posts    =>  post 목록얻어오기
    GET    /posts/1  =>  post 한개 얻어오기
    POST   /posts    =>  post 추가하기
    PUT    /posts/1  =>  post 전체 수정하기 
    PATCH  /posts/1  =>  post 일부 수정하기
    DELETE /posts/1  =>  post 삭제하기
*/

//클래스형 component
class App extends Component{
  state={
    posts:[]
  }

  //컴포넌트가 사용할 준비가 되면 호출되는 메소드
  componentDidMount(){
   this.getPosts()
  }

  getPosts= ()=>{
       //안드로이드의 onCreate()메소드에서 하는 준비작업을 비슷하게 여기서 하면된다.
       fetch("http://localhost:4000/posts")
       .then(res=>res.json())
       .then(data=>{
         //data는 posts 목록이 들어있는 배열이다. [{},{},{}...]
         console.log(data)
         this.setState({posts:data})
         
       })
  }

  //render()함수에서 리턴하는 jsx로 화면 구성이 된다.
  render(){
    return(
      <div className='container'>
        <h1>인덱스 페이지 입니다.</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>writer</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
          {this.state.posts.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.writer}</td>
                <td><button onClick={()=>{
                  const title =prompt(item.id+ "번글의 수정할 제목 입력...")
                  //서버에 전송할 정보를 object에 일단 담는다
                  const obj={
                    title: title
                  }
                  //object에 담긴 내용을 이용해서 json 문자열을 얻어낸다.
                  const jsonStr=JSON.stringify(obj)
                  // 일부 수정이기 때문에 PATCH 방식 요청을 한다.
                  fetch("http://localhost:4000/posts/"+ item.id,{
                    method:"PATCH",
                    headers:{"Content-Type":"application/json; charset=utf-8"},
                    body:jsonStr
                  })
                  .then(res=>res.json())
                  .then(data=>{
                    this.getPosts()
                  })
                }}>수정</button></td>
                <td><button onClick={()=>{
                  //delete 방식 요청
                  fetch("http://localhost:4000/posts/"+item.id,{
                    method:"DELETE"
                  })                  
                  .then(res=>res.json())
                  .then(data=>{
                    this.getPosts()
                  })
                }}>삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <form action="http://localhost:4000/posts" method='post' onSubmit={(e)=>{
          //폼전송 막기
          e.preventDefault();
          //폼에 입력한 내용을 ajax에 전송

          //요청 url 
          const url=e.target.action;
          //요청 방식
          const method=e.target.method;
          //전송할 폼 데이터
          const formData=new FormData(e.target);
          const queryString=new URLSearchParams(formData).toString();
          //fetch() 함수를 이용해서 전송
          fetch(url, {
              method,
              headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},
              body:queryString
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data);
              alert(data.id+ "번 post로 등록되었습니다.")
              this.getPosts()
          })
          .catch(error=>{
              console.log("에러 발생", error)
          });
        }}>
          <input type="text" name='title' placeholder='제목...' />
          <input type="text" name='writer' placeholder='작성자..' />
          <button type="submit">저장</button>
        </form>
      </div>
    )
  }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
