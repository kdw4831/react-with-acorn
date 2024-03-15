import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EditorComponent from "../Pages/EditorComponent";
import Gallery from "../Pages/Gallery";
import GalleryDetail from "../Pages/GalleryDetail";
import Home from "../Pages/Home";
import Member from "../Pages/Member";
import MemberForm from "../Pages/MemberForm";
import MemberUpdateForm from "../Pages/MemberUpdateForm";
import Transition from "../Pages/Transition";
import Book from "../Pages/book";
import Transition2 from "../Pages/transition2";
import Transition3 from "../Pages/Transition3";
import Transition4 from "../Pages/transition4";
import Cafe from "../Pages/Cafe";
import CafeForm from "../Pages/CafeForm";
import CafeDetail from "../Pages/CafeDetail";
import RefTest from "../Pages/RefTest";
import ModuleCss from "../Pages/ModuleCss";

//라우트 정보를 배열에 저장시키기
const routes=[
    {path:"/" , element : <Home/>},
    {path:"/members" , element :<Member/>},
    {path:"/members/new" , element :<MemberForm/>},
    {path:"/members/:num/edit" , element :<MemberUpdateForm/>},
    {path:"/gallery" , element :<Gallery/>},
    {path:"/gallery:num" , element :<GalleryDetail/>},
    {path:"/editor", element:<EditorComponent/>},
    {path:"/book" , element :<Book/>},
    {path:"/transition" , element :<Transition/>},
    {path:"/transition2" , element :<Transition2/>},
    {path:"/transition3" , element :<Transition3/>},
    {path:"/transition4" , element :<Transition4/>},
    {path:"/cafes", element:<Cafe/>},
    {path:"/cafes/new", element:<CafeForm/>},
    {path:"/cafes/:num",element:<CafeDetail/>},
    {path:"/ref_test",element:<RefTest/>},
    {path:"/module_css",element:<ModuleCss/>}
    

  ]




  
//BrowserRouter 를 custom으로 만들기 
const router = createBrowserRouter([{
    path:"/", // 현재 최상위 경로 일때
    element:<App/>, //App Component를 사용하겠다.
    children: routes.map((route)=>{ //자식 컴포넌트 정보 등록
        return {
        index: route.path === "/", // 자식의 path 가 "/"면 페이지 역할을 하게 하기
        path: route.path === "/" ? undefined : route.path, // path에 "/" 두개가 표시되지 않도록
        element: route.element // 어떤 컴포넌트를 활성화 할 것인지
        }
    })
}])


export default router

