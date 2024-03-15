// src/pages/Cafe.js

import { Button } from "@mui/material";
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
        // 검색 조건과 키워드를 상태값으로 관리 
        const [searchState, setSearchState]=useState({
            condition:"",
            keyword:""
        })

        useEffect(()=>{
            console.log(searchState)
        },[searchState])
    
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
           //검색 기능과 관련된 query 문자열 읽어오기
           const query=new URLSearchParams(searchState).toString()
           axios.get("/cafes?pageNum="+pageNum+"&"+query)
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

        /*
            1.Cafe 컴포넌트가 활성화 되는 시점에 1번 호출된다.
            2.params가 변경이 될때마다 호출된다.  

        */ 
    
        useEffect(()=>{
            //query 파라미터 값을 읽어와 본다
            let pageNum=params.get("pageNum")
            //만일 존재 하지 않는다면 1 페이지로 설정
            if(pageNum==null)pageNum=1
            //해당 페이지의 내용을 원격지 서버로 부터 받아온다 
            refresh(pageNum)
        }, [params]) // params 가 변경되었을때도 다시 받아오도록 한다 
      
        //검색 select, input요소에 변화가 생겼을 때 호출되는 함수
        const handleSearchChange=(e)=>{
            setSearchState({
                ...searchState,
                [e.target.name]:e.target.value
            })
            //검색 버튼 누르지 않고 바로 검색되기를 원한다면  여기에 
            updateNavigate()
        } // 이거 유심히 봐바

        //navigate() 함수를 호출해서 위치를 변경하는 함수
        const updateNavigate=(pageNum=1)=>{
            //검색조건에 맞는 query 문자열 얻어내기
            const query= new URLSearchParams(searchState).toString()
            navigate(`/cafes?pageNum=${pageNum}&${query}`)
        }


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
                                <tr key={item.num}>
                                    <td>{item.num}</td>
                                    <td>
                                        <Link to={`/cafes/${item.num}?condition=${searchState.condition}&keyword=${searchState.keyword}`}>{item.title}</Link>
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
              <Pagination.Item onClick={()=>updateNavigate(pageInfo.startPageNum-1)} disabled={pageInfo.startPageNum === 1}>&laquo;</Pagination.Item> 
              {
                pageArray.map(item=>(<Pagination.Item onClick={()=>updateNavigate(item)} key={item} active={pageInfo.pageNum===item}>{item}</Pagination.Item>))
              }
              <Pagination.Item onClick={()=>updateNavigate(pageInfo.endPageNum+1)} disabled={pageInfo.endPageNum >= pageInfo.totalPageCount}>&raquo;</Pagination.Item> 
            </Pagination>  

            <label htmlFor="search">검색 조건 </label>
            <select id="search" name="condition" value={searchState.condition} onChange={handleSearchChange}>
                <option value="">선택</option>
                <option value="title_content">제목+내용</option>
                <option value="title">제목</option>
                <option value="writer">작성자</option>
            </select>
            <input type="text" placeholder="검색어..." name="keyword" value={searchState.keyword} onChange={handleSearchChange}/>
            <button onClick={()=>updateNavigate()}>검색</button>
            <Button onClick={()=>{
                setSearchState({condition:"", keyword:""})
                navigate("/cafes")
            }}>Reset</Button>
            <p><strong>{pageInfo.totalRow}</strong>개의 글이 있습니다</p>
        </>
    )
}