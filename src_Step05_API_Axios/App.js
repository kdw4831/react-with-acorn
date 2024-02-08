
//App.css 적용하기
import { Component } from 'react';
import './App.css'
import axios from 'axios';
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
       
       axios.get("http://localhost:4000/posts")
       .then(res=>{
        //res.data에 응답한 내용이 들어 있다.
        console.log(res.data)
        this.setState({
          posts:res.data
        })
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
                  const title=prompt(item.id+"번 글의 수정할 제목 입력...")
                  //json 문자열을 요청 body에 담고 싶으면 {} 에담으면된다.
                  axios.patch("http://localhost:4000/posts/"+item.id,{
                    title:title  // 그냥 title 이렇게 해도 됨
                  })
                  .then(res=>{
                    this.getPosts()
                  })

                }}>수정</button></td>
                <td><button onClick={()=>{
                  
                  axios.delete("http://localhost:4000/posts/"+item.id)
                  .then(res=>{
                    this.getPosts()
                  })
                  .catch(error=>{
                    console.log(error)
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

          //axios로 post 방식 요청하기
          axios[method](url,queryString)
          .then(res=>{
            this.getPosts()
          })      
        }}>
          <input type="text" name='title' placeholder='제목...' /><br />
          <input type="text" name='writer' placeholder='작성자..' />
          <button type="submit">저장</button>
        </form>
      </div>
    )
  }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
