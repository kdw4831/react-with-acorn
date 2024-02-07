//src/App2.js

import { Component } from "react";
import List from './components/ListComponent';


class App2 extends Component{
    //상태값 관리
    state={
        friends:["김구라","해골","원숭이","주뎅이","덩어리"],
        animals:["dog","cat","elemphant"]
    }
    render(){
        /*
        //ajax 요청을 통해서 서버로부터 받아온 데이터라고 생각하자
        const data=[]
        //상태값 변경하기
        this.setState({
            friends:data //friends 라는 방에 새로운 배열로 덮어쓰기
        })*/
        console.count("App2 render()") // 몇번 호출됬는지 찍어보는 함수  
        return(
            <div className="container">
                <h1>친구목록</h1>
                <input ref={(refValue)=>{
                    // 함수에 전달되는 참조값을 필드에 저장하기(필드를 미리 정의하지 않아도 된다.)
                    this.inputName=refValue
                }} type="text" placeholder="친구 이름 입력" />
                <button onClick={()=>{
                    //1. input 요소에 입력한 문자열을 읽어와서
                    const name=this.inputName.value
                    //2. 해당 문자열이 추가된 새로운 문자열을 얻어내서
                    const newArray=[...this.state.friends,name]
                    //const newArray2=this.state.friends.concat(name)
                    //3. state를 업데이트 한다.
                    this.setState({
                        ...this.state, // 기존의 state 값을 일단 펼쳐 놓고     /*원하는 값을 수정할 때 자주사용*/
                        friends:newArray// 수정할 state만 수정한다.
                    })

                }}>추가</button>
                <List list={this.state.friends} onDelete={(idx)=>{
                    //idx 번째 인덱스가 제거된 새로운 배열을 얻어내서
                    const newArray=this.state.friends.filter((item,index) =>index!==idx) // index와 idx가 같으면 제거된 새로운 아이템이 나온다.
                    // 상태값으로 관리하고 있는 friends에 덮어쓰기
                    this.setState({
                        ...this.state, // 기존의 state 값을 일단 펼쳐 놓고     /*원하는 값을 수정할 때 자주사용*/
                        friends:newArray// 수정할 state만 수정한다.
                    })
                }}></List>

                <h1>동물목록 출력하기</h1>
                <input ref={(refValue)=>{
                    this.inputAnimals= refValue
                }} type="text" placeholder="동물 이름 출력..." />
                <button onClick={()=>{
                    const animals= this.inputAnimals.value
                    const newArray=[...this.state.animals,animals]
                    this.setState({
                        ...this.state,
                        animals: newArray
                    })
                }}>추가</button>   
                <List list={this.state.animals} onDelete={(idx)=>{
                    this.setState({
                        ...this.state,
                        animals:this.state.animals.filter((item,index)=> index !==idx)
                    })
                }}></List>
            </div>
        )
    }
}
export default App2