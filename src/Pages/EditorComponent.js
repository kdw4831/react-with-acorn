//src/pages/EditorComponent.js

import { useEffect, useRef, useState } from "react"
import { initEditor } from "../editor/SmartEditor"

export default function EditorComponent(){
    const inputTitle=useRef();
    const inputContent=useRef();

    //smartEditor에 작성한 내용을 textarea의 value로 넣어줄 때 필요한 함수가 editorTool이다.
    //ui 업데이트 될때 마다 자주 호출 되는 영역 (시간이 오래 걸리거나 무거운 작업을 하면 좋지 않다.)
    const[editorTool,setEditorTool]=useState([])

    let myName
    useEffect(()=>{
        //initEditor() 함수를 호출하면서 smartEditor로 변환할 textarea 의 id를 전달하면
        //textarea가 SmartEditor로 변경되면서 에디터
        setEditorTool(initEditor("content"))
        myName="김구라"
       
    },[])

    return(
        <>
            <h3>SmartEditor 테스트</h3>
            <form>
                <div>
                    <label htmlFor="title">제목</label>
                    <input ref={inputTitle} type="text" name="title" id="title" />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea ref={inputContent} name="content"   id="content" rows="10" />
                </div>
                <button type="submit" onClick={(e)=>{
                    e.preventDefault();
                    //에디터 tool을 이용해서 SmartEditor에 입력한 내뇽을 textarea의 value 값으로 변환
                    editorTool.exec();
                    //폼 요소의 입력한 내용 읽어오기
                    const title= inputTitle.current.value;
                    const content= inputContent.current.value;
                    alert(content)
                }}>저장</button>
            </form>
        </>
    )
        
}