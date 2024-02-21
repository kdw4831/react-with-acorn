import { Component } from 'react'

class App extends Component{
 
  render(){

    let p1
   
    console.log(p1)
    return (
      <div className="container">
        <p ref={ (a)=>{ p1 = a} }>안녕하세요</p>
      </div>
    )
    
  }
}

export default App;