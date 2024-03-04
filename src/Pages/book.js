import { Link, useSearchParams } from "react-router-dom"

export default function Book(){


    //query parameter  값을 읽어올 Hook
    const [params,setParams]=useSearchParams({})
    // params는 object 이고  값을 읽어올때는 .get() 함수를 이용한다.
    console.log(params.get("num"))
    console.log(params.get("name"))    
    return(
        <>
            <h1>Book 목록 입니다</h1>
            <ul>
                <li>
                    <Link to="/book?num=1&name=java">java</Link>
                </li>
                <li>
                    <Link to="/book?num=2&name=python">java</Link>
                </li>
                <li>
                    <Link to="/book?num=3&name=swift">swift</Link>
                </li>
            </ul>
            <button onClick={()=>{
                setParams({num:1, name:"java"})
            }}>java</button>
            <button onClick={()=>{
                setParams({num:2, name:"python"})
            }}>python</button>
            <button onClick={()=>{
                setParams({num:3, name:"swift"})
            }}>swift</button>
            <h1> 책 자세히 보기 페이지</h1>
            <p>Book 번호 : <strong>{params.get("num")}</strong></p>
            <p>Book 이름 :<strong>{params.get("name")}</strong></p>
        </>
    )
}