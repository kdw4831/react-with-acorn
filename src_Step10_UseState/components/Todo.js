// src/components/Todo.js

import { Component } from "react";

class Todo extends Component{
    //컴포넌트가 활성화 될 때 호출되는 함수
    componentDidMount(){
        //활성화 되는 시점에 하고 싶은 동작이 있으면 여기서 한다
        console.log("componentDidMount()")
        
    }

    render() {
        
        return (
            <div>
                <h3>할 일 목록</h3>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>내용</th>
                            <th>달성</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default Todo