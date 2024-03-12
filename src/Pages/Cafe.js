// src/pages/Cafe.js

import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Table } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function Cafe(){
    
        //카페 글목록 페이지 정보 
        const [pageInfo, setPageInfo]=useState({
            list:[]
        })
    
        //페이징 UI 를 만들때 사용할 배열
        const [pageArray, setPageArray]=useState([])
        // "/cafes?pageNum=x" 에서 pageNum 을 추출하기 위한 Hook   
        const [params, setParams]=useSearchParams({pageNum:1})
        //페이지를 이동할 Hook
        const navigate=useNavigate()
    
        //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
        function createArray(start, end) {
        const result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
        }
    
        //겔러리 목록 데이터 읽어오는 함수
        const refresh = (pageNum)=>{
            axios.get("/cafes?pageNum="+pageNum)
            .then(res=>{
                console.log(res.data)
                //카페 글목록 출력
                setPageInfo(res.data)
                //페이징 UI 출력
                const result=createArray(res.data.startPageNum, res.data.endPageNum)
                setPageArray(result)
            })
            .catch(error=>{
                console.log(error)
            })
        }
    
        useEffect(()=>{
            //query 파라미터 값을 읽어와 본다
            let pageNum=params.get("pageNum")
            //만일 존재 하지 않는다면 1 페이지로 설정
            if(pageNum==null)pageNum=1
            //해당 페이지의 내용을 원격지 서버로 부터 받아온다 
            refresh(pageNum)
        }, [params]) // params 가 변경되었을때도 다시 받아오도록 한다 
      

    return (
        <>
            <Link to="/cafes/new">새글 작성</Link>
            <h1>Cafe 글 목록 입니다</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            pageInfo.list.map(item=>(
                                <tr>
                                    <td>{item.num}</td>
                                    <td>
                                        <Link to={`/cafes/${item.num}`}>{item.title}</Link>
                                    </td>
                                    <td>{item.writer}</td>
                                    <td>{item.viewCount}</td>
                                    <td>{item.regdate}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <Pagination className="mt-3">
              <Pagination.Item onClick={()=>{
                //refresh(pageInfo.startPageNum-1)
                setParams({pageNum:pageInfo.startPageNum-1})
                }} disabled={pageInfo.startPageNum === 1}>&laquo;</Pagination.Item> 
              {
                pageArray.map(item=>(<Pagination.Item onClick={()=>{
                   setParams({pageNum: item})
                  //refresh(item)
                }} key={item} active={pageInfo.pageNum===item}>{item}</Pagination.Item>))
              }
              <Pagination.Item onClick={()=>{
                //refresh(pageInfo.endPageNum+1)
                setParams({pageNum:pageInfo.endPageNum+1})
                }} disabled={pageInfo.endPageNum >= pageInfo.totalPageCount}>&raquo;</Pagination.Item> 
            </Pagination>  
        </>
    )
}