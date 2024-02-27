// src/pages/Member.js


import axios from "axios";
import { useEffect, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Fab, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";



export default function Member() {
  //회원 목록 상태값 관리 
  const [members, setMembers] = useState([])

  const refresh = () => {
    axios.get("/members")
      .then(res => {
        //응답된 데이터를 이용해서 state를 수정한다
        setMembers(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  //Member Component가 활성화 되는 시점에 회원 목록 요청하기
  useEffect(() => {
    refresh()
  }, [])
  //삭제 버튼을 눌렀을 때 호출되는 함수
  const handleDelete = (num) => {
    axios.delete("/members/" + num)
      .then(res => {
        //화면 refresh
        console.log(res.data)
        if (res.data.isSuccess) {
          refresh()
        }

      })
      .catch(error => console.log(error))
  }

  //페이지 이동하기 위한 함수
  const navigate = useNavigate()
  return (
    <>


      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon onClick={()=>{navigate("/members/new")}} />
      </Fab>
    
      <h1>회원목록입니다</h1>
      <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>주소</TableCell>
              <TableCell>수정</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {members.map(item => <tr key={item.num}>
            <TableCell component="th" scope="row">{item.num}</TableCell>
            <TableCell align="left">{item.name}</TableCell>
            <TableCell align="left">{item.addr}</TableCell>
        
            <TableCell>
              <button onClick={() => {
                navigate(`/members/${item.num}/edit`)
              }}>수정</button>
              {/* link일때 */}
              {/* <Link to={`/members/${item.num}/edit`}>수정</Link> */}
            </TableCell>
            <TableCell>
              <Button variant="outlined" startIcon={<DeleteIcon /> } onClick={() => handleDelete(item.num)}>삭제</Button>
          
            </TableCell>
          </tr>)}
        </TableBody>  
      </Table>
    </>
  )
}