import React from 'react';
import './App.css';
import Dot from './components/dots';
import Menu from './components/menu/menu';
import BodyNav from './components/menu/bodyNav';
import { relative } from 'path';
import {Route, Switch} from 'react-router-dom'
import Rule from './components/rule/rule';



function creatDots() {
  const createState = []
  for (let i = 0; i < 10; i++) {
    createState[i] = []
    for (let j = 0; j < 10; j++) {
      createState[i][j] = {color: 'transparent', disabled:false, id:i+'_'+j, opacity: 1}

    }
  }
  return createState
}

class App extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      dots: creatDots(),
      player: 1,
      lines: [],
      menu:false,
      count_player_1:0,
      count_player_2:0,

    }
  }

  playerChanger = ()=>{
    return this.state.player === 1 ? 2 : 1
  }

  colorChange = ()=>{
    return this.state.player === 1 ? 'red' : 'blue'
  }

  logic = () => {
    for (let y0 = 0; y0 < this.state.dots.length; y0 += 1) {
      for (let x0 = 0; x0 < this.state.dots[y0].length; x0 += 1) {
        const dot =  this.state.dots[y0][x0];

        if (dot.color !== 'transparent' /* !dot.disable*/) {
          const needColor = dot.color === 'red' ? 'blue' : 'red';

         function funcIf (y0,x0){
            let resultDy;
            let lengthY;
            let resultDx;
            let lengthX;
            if(y0===0 && x0===0){
              resultDy=0;
              lengthY=2;
              resultDx=0;
              lengthX=2;
            }else if(y0===0 && x0===9){
              resultDy=0;
              lengthY=2;
              resultDx=-1;
              lengthX=1;
            }else if(y0===9 && x0===0){
              resultDy=-1;
              lengthY=1;
              resultDx=0;
              lengthX=2;
            }else if(y0===9 && x0===9){
              resultDy=-1;
              lengthY=1;
              resultDx=-1;
              lengthX=1;
            }else if(y0===0){
              resultDy = 0;
              lengthY=2;
              resultDx=-1;
              lengthX=2;
            }else if(y0===9){
              resultDy=-1;
              lengthY=1;
              resultDx=-1;
              lengthX=2;
            }else if(x0===0){
              resultDy=-1;
              lengthY=2;
              resultDx=0;
              lengthX=2;
            }else if(x0===9){
              resultDy=-1;
              lengthY=2;
              resultDx=-1;
              lengthX=1;
            }else{
              resultDy=-1;
              lengthY=2;
              resultDx=-1;
              lengthX=2;
            }

            return {cycleValueY:resultDy, cycleLengthY:lengthY, cycleValueX:resultDx, cycleLengthX:lengthX}
          };
         const resultFuncIf = funcIf(y0,x0)
          

          out: for (let dy = resultFuncIf.cycleValueY; dy < resultFuncIf.cycleLengthY; dy += 1) {
                 for (let dx = resultFuncIf.cycleValueX; dx < resultFuncIf.cycleLengthX; dx += 1) {


              if (this.state.dots[y0 + dy][x0 + dx].color === needColor) {
                const result = this.rec(needColor, -1, -1,  y0 + dy, x0 + dx, []);
                let a = [false, false, false, false];

                for (let i = 0; i < result.length; i += 1) {
                  const yx = result[i].split('-');

                  if (yx[0] < y0) {
                    a[0] = true;
                  }
                  if (yx[0] > y0) {
                    a[2] = true;
                  }
                  if (yx[1] > x0) {
                    a[1] = true;
                  }
                  if (yx[1] < x0) {
                    a[3] = true;
                  }
                }
                
                if (result && result.length >= 4 && a[0] && a[1] && a[2] && a[3]) {
                  dot.opacity = 0.5
                  // dot.disabled = true;
                  

                  for (let i = 0; i < result.length - 1; i += 1) {
                    this.state.lines.push([result[i].split('-'), result[i + 1].split('-'), needColor]);
                  }

                  this.state.lines.push([result[result.length - 1].split('-'), result[0].split('-'), needColor]);
                  
                  break out;
                  
                }
                
                  
               
              }
           }
          }
         
        }
      }
    }
     

    this.forceUpdate();
  }

  rec = (color, fy, fx, y, x, visited) => {
    visited = [...visited, `${y}-${x}`];

    function funcIfRec (y,x){
      let resultRecY;
      let lengthY;
      let resultRecX;
      let lengthX;
            if(y===0 && x===0){
              resultRecY=0;
              lengthY=2;
              resultRecX=0;
              lengthX=2;
            }else if(y===0 && x===9){
              resultRecY=0;
              lengthY=2;
              resultRecX=-1;
              lengthX=1;
            }else if(y===9 && x===0){
              resultRecY=-1;
              lengthY=1;
              resultRecX=0;
              lengthX=2;
            }else if(y===9 && x===9){
              resultRecY=-1;
              lengthY=1;
              resultRecX=-1;
              lengthX=1;
            }else if(y===0){
              resultRecY = 0;
              lengthY=2;
              resultRecX=-1;
              lengthX=2;
            }else if(y===9){
              resultRecY=-1;
              lengthY=1;
              resultRecX=-1;
              lengthX=2;
            }else if(x===0){
              resultRecY=-1;
              lengthY=2;
              resultRecX=0;
              lengthX=2;
            }else if(x===9){
              resultRecY=-1;
              lengthY=2;
              resultRecX=-1;
              lengthX=1;
            }else{
              resultRecY=-1;
              lengthY=2;
              resultRecX=-1;
              lengthX=2;
            }

            return {cycleValueY:resultRecY, cycleLengthY:lengthY, cycleValueX:resultRecX, cycleLengthX:lengthX}
    };
    const resultFuncIfRec = funcIfRec (y,x)

    for (let dy = resultFuncIfRec.cycleValueY; dy < resultFuncIfRec.cycleLengthY; dy += 1) {
      for (let dx = resultFuncIfRec.cycleValueX; dx < resultFuncIfRec.cycleLengthX; dx += 1) {
        if (dy === 0 && dx === 0) {
          continue;
        }
        if (y + dy === fy && x + dx === fx) {
          return visited;
        }

        if (this.state.dots[y + dy][x + dx].color === color /*&& !this.state.dots[y + dy][x + dx].disabled*/ && visited.indexOf(`${y + dy}-${x + dx}`) === -1) {
          const result = this.rec(color,
            fy === -1 ? y : fy,
            fx === -1 ? x : fx,
            y + dy, x + dx, visited);

          if (result) {
            return result;
          }
        }
      }
    }

    return false;
  }

  onClick(i, j) {
    const change = this.state.dots[i][j]
    change.color = this.colorChange();
    change.disabled= true;


    this.logic();


    this.setState({
      dots: [...this.state.dots],
      player: this.playerChanger(),
    })
    
  }

  menuFunc=()=>{
    this.setState({
      menu: !this.state.menu
    })
  }


  render() {
    console.log(this.state.menu)
    return (
      <div style={{position:relative}}>
        <BodyNav
          open={this.state.menu}
        />
        <Menu
          menuClick={this.menuFunc}
          open={this.state.menu}
        />
      {/* <div id="battlefield">
        
        {this.state.dots.map((row, i) =>
          row.map((cell, j) => (
            <Dot
              onClick={() => this.onClick(i, j)}
              top={i}
              left={j}
              color={this.state.dots[i][j].color}
              disab={this.state.dots[i][j].disabled}
              id={'' + i + '_' + j}
              key={'' + i + j}

            />
          ))
        )}
        <svg viewBox="0 0 500 500" style={{ position: 'absolute', pointerEvents: 'none' }}>
          {this.state.lines.map((line, key) => (
            <line
              key={key}
              x1={line[0][1] * 50}
              y1={line[0][0] * 50}
              x2={line[1][1] * 50}
              y2={line[1][0] * 50}
              strokeWidth={3}
              stroke={line[2]}
            />
          ))}
        </svg>
        </div> */}
        <Switch>
        <Route path='/' exact render={()=>
                <div id="battlefield">
        
                {this.state.dots.map((row, i) =>
                  row.map((cell, j) => (
                    <Dot
                      onClick={() => this.onClick(i, j)}
                      top={i}
                      left={j}
                      color={this.state.dots[i][j].color}
                      disab={this.state.dots[i][j].disabled}
                      id={'' + i + '_' + j}
                      key={'' + i + j}
        
                    />
                  ))
                )}
                <svg viewBox="0 0 500 500" style={{ position: 'absolute', pointerEvents: 'none' }}>
                  {this.state.lines.map((line, key) => (
                    <line
                      key={key}
                      x1={line[0][1] * 50}
                      y1={line[0][0] * 50}
                      x2={line[1][1] * 50}
                      y2={line[1][0] * 50}
                      strokeWidth={3}
                      stroke={line[2]}
                    />
                  ))}
                </svg>
                </div>
        } />
        <Route path="/rule" component={Rule} />
        </Switch>
      </div>
    )
  }
}

export default App;
