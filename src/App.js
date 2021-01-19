import React, { useState , Effect, useEffect} from 'react';
import './App.css';




function App() {
  return (
    <div>
      <h1>react exam</h1>
      <FunComp myNumber={2}></FunComp>
      <ClassComp myNumber={2}></ClassComp>
    </div>
  );
}

function FunComp(props){
  var numState = useState(props.myNumber); // state를 사용하기 위해 useState를 사용하여 첫번째 매개변수에 값을 전달함! 그러면 값을 사용하면서 setState 를 사용할수 있게 됨
  var number = numState[0]; //상태값
  var numset = numState[1]; // 상태값을 바꾸고 다시 랜더될수 있는 함수.!

  // var nowState = useState(Date);
  // var now = nowState[0];
  // var nowSet = nowState[1];

  var [now,nowSet] = useState((new Date).toString());


  useEffect(function(){
    console.log("userEffect")

    return function(){
      console.log("cleanUp")
    }
  },[number]); //없으면 무조건! 있으면 저게 변경되었을때만 useEffect가 동작됨!
  
  //userEffect 는 여러개 있어도 됨!
  //,[]  두번째 매개변수에 빈배열을 넣으면 최초 1회만 생성이 되고 그다음에는 실행안된다.
  // class 의 componentDidMount 처럼 동작함!
  // 거기 안에 있는 return 은 마지막에만 한번 실행되기 때문에 will un mount 처럼 동작될것이다!!!!

  



  console.log("render")
  return (
    
    <div class="container">
      <h2>this is function react!</h2>
      <p>
        {number}
      </p>
      <p>
        {now}
      </p>      
      <p>
          <input type="button" value="랜덤" onClick={function(){
            numset(
              Math.random()
            );
          }}></input>
          <input type="button" value="날짜변경" onClick={function(){
              nowSet(
                (new Date).toString()
            );
          }}></input>    
        </p>      
    </div>
  );
}

class ClassComp extends React.Component{
  
  // state를 변경하면 자동으로 render를 발생할수 있게 state에 넣어둠.!?
  state = {
    number:this.props.myNumber,
    now:Date()
  }

  componentWillMount(){
    console.log("%ccomponentDidMount","color:red");
    // 화면이 그려지기 전에 동작해야 할 것!
  }

  componentDidMount(){
    console.log("%ccomponentDidMount","color:red");    
    // 화면이 다 그려지고 나서 동작해야 할것!
  }

  shouldComponentUpdate(){
    return true; // 랜더를 호출해야 한다.
  }

  componentWillUpdate(){ // 오와우! 최초 랜더 후에 동작할 라이프 사이클 들..
    console.log("%ccomponentWillUpdate","color:red");
  }

  componentDidUpdate(){
    console.log("%ccomponentDidUpdate","color:red");
  }  

  render(){
    console.log("%crender","color:red");    
    return (
      <div class="container">
        <h2>this is class react</h2>
        <p>{this.state.number}</p>
        <p>{this.state.now}</p>
        <p>
          <input type="button" value="랜덤숫자" onClick={function(){
            this.setState(
              {
                number:Math.random()
              }
            )
          }.bind(this)}></input>
          <input type="button" value="날짜변경" onClick={function(){
            this.setState(
              {
                now:Date()
              }
            )
          }.bind(this)}></input>          
        </p>

        
      </div>
    )
  }
}


export default App;
