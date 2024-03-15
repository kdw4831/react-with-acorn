//src pages/ModuleCss.js

//모듈css import
import myCss from './css/custom.module.css'
//import 한 css를 바인딩할 수  있는 객체 import
import binder from 'classnames/bind'
//바인딩해서 cx라는 이름으로 사용하기
const cx=binder.bind(myCss)

export default function ModuleCss(){
    return(
        <>
        <h1>Moudle Css 테스트</h1>
        <p>특정 component에서만 동작하는 css 정의 하고 사용하기 </p>
        <p className={cx('bg-yellow')}> p1 입니다 </p>
        <p className={cx({'bg-yellow':true})}> p2 입니다 </p>
        <p className={cx({'bg-yellow':false})}> p3 입니다 </p>
        <p className={cx('bg-yellow','big-font')}> p4 입니다 </p>
        <p className={cx('bg-yellow','big-font','bold-font')}> p5 입니다 </p>
        <p className={cx({
            'bg-yellow':true,
            'big-font':true,
            'bold-font':true 
        })}> p6 입니다 </p>
        <p className={cx(['bg-yellow','big-font','bold-font'])}> p7 입니다 </p> 
        </>
    )
}