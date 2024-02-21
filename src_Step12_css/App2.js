import 'bootstrap/dist/css/bootstrap.css'

//classnames를 import 해서 cn이라는 이름으로 사용할 준비
import cn from 'classnames'

import binder from 'classnames/bind'
import Study from './components/study'

//함수형 component
function App2() {
    const styles={
        aaa:"btn",
        bbb:"btn-success"
    }
    const cx=binder.bind(styles)

    return (
        <div className="container">
            <h1>인덱스 페이지 입니다</h1>   
            <button className={cn('btn','btn-success')}>버튼 1</button>
            <button className={cn('btn',{'btn-success': true})}>버튼 1</button>
            <button className={cn(['btn','btn-success'])}>버튼3</button>
            <button className={cx(['aaa','bbb'])}>버튼3</button>
            <Study/>
        </div>
    );
}
  
  //외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
  export default App2;