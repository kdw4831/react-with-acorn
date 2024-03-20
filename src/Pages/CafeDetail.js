
// src/pages/CafeDetail.js

import axios from "axios"
import { createRef, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
//css import
import myCss from './css/cafe_detail2.module.css'
//binder import
import binder from 'classnames/bind'
//cx 함수 
const cx=binder.bind(myCss)

//새로운 댓글이 들어가야 되는 인덱스
let commentIndex=0


export default function CafeDetail(){
    // "/cafes/:num" 에서 num 에 해당하는 경로 파라미터 값 읽어오기
    const {num}=useParams()
    //cafe 하나의 정보를 상태값으로 관리 
    const [state, setState]=useState({})
    //검색 키워드 관련 처리 
    const [params, setParams]=useSearchParams({}) 
    //댓글 관련 처리
    const [commentList, setCommentList]=useState([])
    //댓글의 현재 페이지 번호
    const [pageNum, setPageNum]=useState(1)
    //댓글 전체 페이지의 갯수(마지막 페이지 번호)
    const [totalPageCount, setTotalPageCount] = useState(0)
    //현재 로딩중인지 여부 
    const [isLoading, setLoading] = useState(false)

    //console.log(new URLSearchParams(params).toString())

    //삭제 모달을 띄울지 여부를 상태값으로 관리
    const [modalShow, setModalShow]=useState(false)

    //로그인된 사용자명이 store 에 있는지 읽어와 본다. 
    const userName=useSelector(state=>state.userName)

    const navigate=useNavigate()

    useEffect(()=>{
        //서버에 요청을 할때 검색 키워드 관련 정보도 같이 보낸다.
        const query=new URLSearchParams(params).toString()
        axios.get("/cafes/"+num+"?"+query)
        .then(res=>{
            console.log(res.data)
            setState(res.data.dto)
            //댓글 목록도 state 로 관리되도록 한다
            const list=res.data.commentList.map(item=>{
                //각각의 li 요소의 참조값을 담을 ref 방을 추가한다 
                item.ref=createRef()
                return item
            })
            setCommentList(list)
            //전체 댓글 페이지의 갯수
            setTotalPageCount(res.data.totalPageCount)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [num]) //경로 파라미터가 변경될때 서버로 부터 데이터를 다시 받아오도록 한다.

    //댓글 등록 폼에 있는 submit 버튼을 누르면 호출되는 함수 
    const handleSaveSubmit = (e)=>{
        //action 에 명시한 위치로 페이지 이동이 되지 않도록 막기
        e.preventDefault()
        //form 의 action axios 를 이용해서 서버에 요청하기
        const action=e.target.action
        //form 에 입력한 내용을 FormData 객체에 담기 ( input 요소에 name 속성이 반드시 필요!)
        const formData = new FormData(e.target)

        axios.post(action, formData)
        .then(res=>{
            //새로 추가된 댓글 하나가 응답된다. 
            console.log(res.data)
            //새로운 댓글을 commentList 배열의 원하는 인덱스에 끼워 넣는다.
            const newComment= res.data
            newComment.ref=createRef()
            commentList.splice(commentIndex,0,newComment)  // splice는 원본 배열을 변경한다. 
            
            //끼워 놓는 배열의 아이템으로 구성된 새로운 배열로 상태값을 변경한다.
            setCommentList([...commentList])
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const handleUpdateSubmit = (e)=>{
        e.preventDefault()
        const action=e.target.action
        const formData = new FormData(e.target)
        axios.patch(action, formData)
        .then(res=>{
            //res.data 는 수정한 댓글 하나의 정보이다.
            console.log(res.data)
            //수정한 댓글이 화면에 표시 되도록
            const list=commentList.map(item=>{
                //수정한 댓글을 목록에서 찾아서 content 를 수정해준다.
                if(item.num === res.data.num){
                    item.content = res.data.content
                }
                return item
            })
            setCommentList(list)
        })
        .catch(data=>{
            console.log(data)
        })
    }
    const handleDelete = (num, ref)=>{
        axios.delete("/cafes/comments/"+num)
        .then(res=>{
            console.log(ref.current)
            ref.current.innerHTML="<p>삭제된 댓글입니다</p>"
        })
        .catch(error=>{
            console.log(error)
        })
    }

    //댓글 더보기 버튼을 눌렀을때 호출되는 함수
    const handleMore = ()=>{
        //현재 댓글의 페이지가 마지막 페이지 인지 여부를 알아내서
        const isLast = pageNum >= totalPageCount
        //만일 마지막 페이지가 아니라면 바로 다음 댓글 페이지를 요청 
        if(!isLast){
            //로딩 상태로 바꿔준다
            setLoading(true)
            //요청할 댓글의 페이지
            const page=pageNum+1
            axios.get("/cafes/comments?pageNum="+page+"&ref_group="+num)
            .then(res=>{
                console.log(res.data)
                const list=res.data.commentList.map(item=>{
                    item.ref=createRef()
                    return item
                })
                //새로운 댓글 목록을 기존의 댓글 목록과 합친 새로운 배열을 얻어내서 상태값을 변경해 준다.
                setCommentList([...commentList, ...list])
                setTotalPageCount(res.data.totalPageCount)
                //증가된 페이지 번호도 반영해 준다 
                setPageNum(page)
                setLoading(false)
            })
            .catch(error=>{
                console.log(error)
                setLoading(false)
            })

        }else{
            alert("댓글의 마지막 페이지 입니다")
        }
    }

    return (
        <>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cafes">Cafe</Link></li>
                    <li className="breadcrumb-item active">Detail</li>
                </ol>
		    </nav>
		
            { state.prevNum !== 0 ? <Link to={"/cafes/"+state.prevNum+"?"+new URLSearchParams(params).toString()}>이전글</Link> : ""}
            { state.nextNum !== 0 ? <Link to={"/cafes/"+state.nextNum+"?"+new URLSearchParams(params).toString()}>다음글</Link> : ""}
            
            { params.get("condition") &&
                <p>
                    <strong>{params.get("condition")}</strong> 조건
                    <strong>{params.get("keyword")}</strong> 검색어로 검색된 내용 
                </p>
            }
            <h1>글 자세히 보기 페이지</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{state.viewCount}</td>
                    </tr>
                </thead>   
            </table>

            <div className={cx("content")} dangerouslySetInnerHTML={{__html:state.content}}></div>
            
            <h4>댓글을 입력해 주세요</h4>
            <form className={cx("comment-form")}
                action="/cafes/comments" 
                method="post" 
                onSubmit={handleSaveSubmit}>
                <input type="hidden" name="ref_group" defaultValue={state.num}/>
                <input type="hidden" name="target_id" defaultValue={state.writer}/>
                <textarea name="content"></textarea>
                <button type="submit" onClick={()=>{
                    //원글의 댓글은 가장 위에 추가 해야 함으로 
                    commentIndex=0
                }}>등록</button>
            </form>
            {/* 댓글 목록 출력하기 */}
            <div className={cx("comments")}>
                <ul>
                    {
                        commentList.map(item=>(
                            <li key={item.num} 
                                ref={item.ref}
                                className={cx({"indent":item.num !== item.comment_group})}>
                                <svg style={{
                                    display: item.num !== item.comment_group ? 'inline':'none'
                                }}  className={cx('reply-icon')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                                {
                                    item.deleted === "yes" ? <p>삭제된 댓글입니다.</p> :
                                    <>
                                        <dl>
                                            <dt>
                                                { 
                                                    item.profile === null ? <svg className={cx('profile-image')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                                        </svg>
                                                    : <img className={cx('profile-image')} src={`/upload/images/${item.profile}`} alt="프로필 이미지" />
                                                }
                                                <span>{item.writer}</span>

                                                { item.num !== item.comment_group ? <i>@{item.target_id}</i> : null}
                                                <small>{item.regdate}</small>

                                                <Button variant="outline-success" size="sm" className="answer-btn" onClick={(e)=>{                                
                                                    //현재 버튼의 텍스트
                                                    const text=e.target.innerText
                                                    if(text === "답글"){
                                                        e.target.innerText="취소"
                                                        item.ref.current.querySelector("."+cx("re-insert-form"))
                                                            .style.display="flex"
                                                    }else{
                                                        e.target.innerText="답글"
                                                        item.ref.current.querySelector("."+cx("re-insert-form"))
                                                            .style.display="none"
                                                    }

                                                }}>답글</Button>
                                                { item.writer === userName ? <>
                                                    <Button variant="outline-warning" size="sm" className="update-btn" onClick={(e)=>{
                                                        //현재 버튼의 텍스트
                                                        const text=e.target.innerText
                                                        if(text === "수정"){
                                                            e.target.innerText="수정취소"
                                                            item.ref.current.querySelector("."+cx("update-form"))
                                                                .style.display="flex"
                                                        }else{
                                                            e.target.innerText="수정"
                                                            item.ref.current.querySelector("."+cx("update-form"))
                                                                .style.display="none"
                                                        }
                                                    }}>수정</Button>

                                                    <Button variant="outline-danger" size="sm" onClick={()=>{
                                                        handleDelete(item.num, item.ref)
                                                    }}>삭제</Button>
                                                </> : null}
                                            </dt>
                                            <dd><pre>{item.content}</pre></dd>
                                        </dl>
                                        <form action="/cafes/comments"
                                            className={cx("re-insert-form")}
                                            onSubmit={handleSaveSubmit}>
                                            <input type="hidden" name="ref_group" defaultValue={state.num}/>
                                            <input type="hidden" name="target_id" defaultValue={item.writer}/>
                                            <input type="hidden" name="comment_group" defaultValue={item.comment_group}/>
                                            <textarea name="content"></textarea>
                                            <button type="submit" onClick={()=>{
                                                item.ref.current.querySelector("."+cx("re-insert-form"))
                                                    .style.display="none"
                                                item.ref.current.querySelector(".answer-btn")
                                                    .innerText="답글"
                                                // 댓글이 들어가야 하는 인덱스 값을 변수에 저장해 둔다.
                                                commentIndex = commentList.reduce((acc, curr, index)=>{
                                                    // 현재의 댓글이 그룹번호가 버튼이 속한 댓글의 그룹번호와 같다면
                                                    if(curr.comment_group === item.comment_group){
                                                        // 현재 댓글의 인덱스 값을 리턴한다.
                                                        return index
                                                    }else{
                                                        //그 이외의 경우에는 누산된 값을 리턴한다.
                                                        return acc
                                                    }
                                                    
                                                }, 0) + 1
                                                console.log("댓글이 들어가야 되는 인덱스"+commentIndex)
                                            }}>등록</button>
                                        </form>
                                        { item.writer === userName ? 
                                            <form 
                                                className={cx('update-form')}
                                                action={`/cafes/comments/${item.num}`}
                                                onSubmit={handleUpdateSubmit}>
                                                <input type="hidden" name="num" defaultValue={item.num}/>
                                                <textarea name="content" defaultValue={item.content}></textarea>
                                                <button type="submit" onClick={()=>{
                                                    item.ref.current.querySelector("."+cx("update-form")).style.display="none"
                                                    item.ref.current.querySelector("."+cx("update-btn")).innerText="수정"
                                                }}>수정확인</button>
                                            </form>
                                            : null
                                        }
                                    </>
                                }   
                                
                            </li>
                        ))
                    }
                </ul>
            </div>
            {/* display:grid 의 자식요소는 default 값으로 폭을 100% 다 차지 하게 된다 */}
            <div className="d-grid col-md-6 mx-auto">
                <Button variant="success" 
                    onClick={handleMore}
                    disabled={isLoading}
                >
                    { isLoading ?
                        <>
                            <span className="spinner-border spinner-grow-sm"></span>
                            <span className="spinner-grow spinner-grow-sm"></span>
                            <span>로딩중...</span> 
                        </> 
                        
                        : 
                        <span>댓글 더보기</span>
                    }
                </Button>
            </div> 

            <div style={{height:"300px", backgroundColor:"#cecece"}}></div>
        </>
    )
}