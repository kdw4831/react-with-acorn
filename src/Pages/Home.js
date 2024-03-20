//src/pages/Home.js

import axios from "axios"
import { useEffect, useState } from "react"
import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const nums =[1,2,3,4,5]

// acc => 누산된 값 일 수도 있고 object일 수도 있다 map, reduce 이런식으로 하거나
//filter, map reduce를 연속적으로 동작할 때도 있다. reducer 유용한 함수래  
const reducer = (acc,curr, index)=>{
    acc = acc+curr
    return acc
}
// 배열.reducer(리듀서 함수, acc의 초기값) 
const result= nums.reduce(reducer,0)
console.log(result)

const names=["kim","lee","kim","park","kim","lee"]
const result2=names.reduce((acc,curr,index)=>{
    if(acc[curr] === undefined){
        acc[curr]=0
    }
    acc[curr]+=1
    return acc
},{})
console.log(result2)

export default function Home(){

    const [notice,setNotice] =useState([])

    //redux store로 부터 로그인 여부 얻어오기
    const isLogin = useSelector(state=>state.isLogin) 

    useEffect(()=>{
        console.log("Home.js의 useEffect()에 전달할 함수 호출됨!")
        if(!isLogin)return
        //공지사항 받아오기
        axios.get("/notice")
        .then(res=>setNotice(res.data))
        .catch(error=>console.log(error))
    }, [isLogin ])  //state로 관리되는 값이 변경되었을 때 useEffect() 안에 전달된 함수가 호출되게 하기

    return(
        <>
            <h1>인덱스 페이지 입니다.</h1>
            <p>로그인 여부 {JSON.stringify(isLogin)}</p>
            <ul>
                <li><Link to="/editor">smartEditor 테스트</Link></li>
                <li><Link to="/book">query Param 테스트</Link></li>
                <li><Link to="/transition">react 트렌지션 테스트</Link></li>
                <li><Link to="/transition2">react 트렌지션 테스트2</Link></li>
                <li><Link to="/transition3">react 트렌지션 테스트3</Link></li>
                <li><Link to="/transition4">react 트렌지션 테스트4</Link></li>
                <li><Link to="/ref_test">Ref 테스트</Link></li>
                <li><Link to="/module_css">module_css 테스트하기</Link></li>
                
            </ul>

            <h2>공지사항</h2>
            <ListGroup as="ol" numbered>

            {notice.map((item,index)=> <ListGroup.Item key={index}>{item}</ListGroup.Item>)}
            </ListGroup>
            
        </>
    )
}