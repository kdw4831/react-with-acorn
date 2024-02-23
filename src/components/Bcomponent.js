import { useDispatch, useSelector } from "react-redux"

export default function BComponent(){
    const userName= useSelector(state=> state.userName)
    const dispatch=useDispatch();
    return(
        <div>
            <p>B Component 입니다.</p>
            {userName && <button onClick={()=>{
                  dispatch({
                    type:"UPDATE_USER",
                    payload:null   //숫자일수도 오브젝트일수도 어레이 일수도
                  })
            }}>userName 삭제</button>}
        </div>
    )
}