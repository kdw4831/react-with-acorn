
//App.css 적용하기
import { Component } from 'react';
import './App.css'
import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Study from './pages/Study';
import Play from './pages/Play';
import NotFound from './pages/NotFound';
import Todo from './pages/Todos';

//클래스형 component
class App extends Component{
  //render()함수에서 리턴하는 jsx로 화면 구성이 된다.
  render(){
    return(
      <div className='container'>
        <h1>React Router를 이용한 SPA 테스트</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/study">Study</Link></li>
          <li><Link to="/play">Play</Link></li>
          <li><Link to="/todos">Todos</Link></li>
        </ul>
        <Routes>
          <Route path='/' Component={Home}></Route>
          <Route path='/study' Component={Study}></Route>
          <Route path='/play' Component={Play}></Route> 
          <Route path='/todos' Component={Todo}></Route> 
          <Route path='/*' Component={NotFound}></Route>

        </Routes>
      </div>
    )
  }
}

//외부에서 App.js를 import하면 App 함수를 사용할 수 있다 (src/index.js)
export default App;
