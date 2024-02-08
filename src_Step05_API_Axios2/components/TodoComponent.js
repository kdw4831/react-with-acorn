import axios from "axios"
import { Component } from "react"


//axios base url 설정하기
axios.defaults.baseURL="http://localhost:4000"

class Todo extends Component{
    state={
      todos:[]
    }

    //Todo 컴포넌트가 준비 되었을 때 호출되는 함수
    componentDidMount(){
      this.getTodos()
    }

    getTodos=()=>{
      axios.get("http://localhost:4000/todos")
      .then(res=>{
        console.log(res.data)
        //서버로부터 응답받은 할일 목록을 이용해서 상태값을 변경(UI에 자동 반영)
        this.setState({
          todos:res.data
        })
      })
    }
    


    //체크박스를 체크 혹은 체크 해제 했을 때 호출되는 함수
    handleChange =(id, isChecked)=>{
      // id는 체크한 아이템의 id, isChecked는 체크 여부
      const newArray = this.state.todos.map(item=>{
        //만일 현재 item의 id가 체크한 item의 아이디와 같다면
        if(item.id === id){
          //complete는 변경해준다.
          item.complete=isChecked
        }
        return item
      })
      this.setState({
        todos:newArray
      })
      axios.patch("/todos/"+id,{
        complete: isChecked
      })
      .then(res=>{
        console.log(res.data)
      })
    }


     //체크박스를 체크 혹은 체크 해제 했을 때 호출되는 함수
     handleChange2 =(id, isChecked)=>{
      // 서버에서 해당 아이템을 일부 수정(PATCH)하도록 요청한다.
      axios.patch("/todos/"+id,{
        complete: isChecked
      })
      .then(res=>{
        //수정이 끝나면 서버에서 데이터를 다시 요청해서 ui 를 업데이트한다.
        this.getTodos()
      })
    }
   

    render() {
      return (
        <div>
            <h4>할일 목록</h4>
            <table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>달성 여부</th>
                  <th>달성 여부</th>
                </tr>
              </thead>
              <tbody>
              {this.state.todos.map(item=> 
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>
                        <input type="checkbox" checked={item.complete} onChange={(e)=>{
                          /*
                            e.target.checked에는 체크박스 체크 여부가 들어 있다.
                            this. state.todos 배열에서 item.id를 찾아서 
                            e.target.checked 값을 반영한 새로운 배열을 얻어내서 
                            상태값을 변경시킨다.
                          */
                         this.handleChange(item.id, e.target.checked)
                        }}/>
                    </td>
                    <td>
                        <input type="checkbox" checked={item.complete} onChange={(e)=>{
                         
                         this.handleChange2(item.id, e.target.checked)
                        }}/>
                    </td>
                    <td>
                      <button onClick={()=>{
                        axios.delete("/todos/"+item.id)
                        .then(res=>{
                          this.getTodos()
                        })
                      }}>x</button>
                    </td>
                </tr>
              )}
              </tbody>
            </table>
            <input ref={(refValue)=>{
              //input 요소의 참조값을 필드에 저장하기
              this.inputTodo=refValue
            }} type="text" placeholder="할일 입력..." />
            <button onClick={()=>{
              axios.post("/todos",{
                title:this.inputTodo.value,
                complete:false
              })
              .then(res=>{
                this.getTodos()
              })
            }}>추가</button>
        </div>
      )
    }
}

export default Todo;