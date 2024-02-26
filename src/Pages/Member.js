//src/pages/Member.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Member(){
    //회원 목록 상태값 관리
    const[members, setMembers] = useState([]) 
    
    //Member Component가 활성화 되는 시점에 회원 목록 요청하기 
    useEffect(()=>{
        axios.get("/members")
        .then(res=>{
            //응답된 데이터를 이용해서 state를 수정한다.
            setMembers(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])

    return (
        <>
            <Link to="/members/new"> 회원추가</Link>
            <h1>회원 목록입니다.</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(item=>
                    <tr key={item.num}>
                        <th>{item.num}</th>
                        <th>{item.name}</th>
                        <th>{item.addr}</th>
                    </tr>)}     
                </tbody>
            </table>
        </>
    )

}