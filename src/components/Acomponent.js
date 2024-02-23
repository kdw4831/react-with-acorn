import { useSelector } from "react-redux"
import BComponent from "./Bcomponent"

export default function AComponent(){
    const userName=useSelector(state=> state.userName)
    return(
        <div>
            <p>A Component 입니다.</p>
            {userName && <p><strong>{userName}</strong> 로그인 중...</p>}
            <BComponent></BComponent>
        </div>
    )
}