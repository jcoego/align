import React, {useEffect, useState, useCallback, useReducer}  from 'react';

import {setRandomCell} from './utils/utils'

const defaultState = {
  boardSize : 5, 
  availableSteps: 2,
  showTable: false, 
  selectedCell: {row: 0, col:0},
  nSteps:0,
  selectedCellHis:[]
}

const cellStyle = {
  border: '1px solid grey',
  padding: '20px'
}

const cellStyleSelected = {
  ...cellStyle,
  backgroundColor:'red'
}


function App() {

  const [state, setState] = useState(defaultState);
  const [activeCellHis, setActiveCellHis] = useState([])

  const handleOnChange = ({name='',value=''}) => {
    setState({...state,[name]:+value})
  }

  const handleClick = () =>{
    let selectedCellAux = setRandomCell(+state.boardSize);
    setState({...state, showTable: true, selectedCell: selectedCellAux});
  }

  console.log('stateHIS',state.selectedCellHis)

  const handleKeyPress  = useCallback((e) =>{
   
    switch(e.key){
      case 'ArrowUp':
        setState(prevState => {
          if(prevState.selectedCell.row === 0) return prevState;
          let selectCellAux = {...prevState.selectedCell, row: +prevState.selectedCell.row-1}
          let end = !!(+prevState.nSteps +1 >= +prevState.availableSteps) 
          return {...prevState, 
            selectedCell: selectCellAux,
            selectedCellHis: [...prevState.selectedCellHis, selectCellAux],
            showTable: !end,
            nSteps: !end ? +prevState.nSteps +1 : +prevState.nSteps
          }
        })
        break;
      case 'ArrowRight':
        setState(prevState => {
          if(prevState.selectedCell.col === prevState.boardSize -1) return prevState;
          let selectCellAux =  {...prevState.selectedCell, col: +prevState.selectedCell.col+1}
          let end = !!(+prevState.nSteps +1 >= +prevState.availableSteps) 
            return {...prevState, 
              selectedCell:selectCellAux,
              selectedCellHis: [...prevState.selectedCellHis, selectCellAux],
              showTable: !end,
              nSteps: !end ? +prevState.nSteps +1 : +prevState.nSteps
            }
          })
        break;
      case 'ArrowDown':
        setState(prevState => {
          if(prevState.selectedCell.row === prevState.boardSize -1) return prevState;
            let selectCellAux = {...prevState.selectedCell, row: +prevState.selectedCell.row+1}
            let end = !!(+prevState.nSteps +1 >= +prevState.availableSteps) 
            return {...prevState, 
              selectedCell: selectCellAux,
              selectedCellHis: [...prevState.selectedCellHis, selectCellAux],
              showTable: !end,
              nSteps: !end ? +prevState.nSteps +1 : +prevState.nSteps
            }
          })
        break;
      case 'ArrowLeft':
        setState(prevState => {
          if(prevState.selectedCell.col === 0) return prevState;
          let selectCellAux = {...prevState.selectedCell, col: +prevState.selectedCell.col-1}
          let end = !!(+prevState.nSteps +1 >= +prevState.availableSteps) 
          return {...prevState, 
            selectedCell: selectCellAux,
            selectedCellHis: [...prevState.selectedCellHis, selectCellAux],
            showTable: !end,
            nSteps: !end ? +prevState.nSteps +1 : +prevState.nSteps
          }
        })
        break;
    }

  },[])

  useEffect(()=>{
    if(!state.showTable) return;
    document.addEventListener('keydown',handleKeyPress)
    return ()=>{
      document.removeEventListener('keydown',handleKeyPress)
    }
  },[state.showTable])



  let arrOfCells = []
  for(let i=0; i< state.boardSize ; i++){
    arrOfCells.push(i)
  }


  return (
    <div  style={{padding:'20px'}}>
       <div>
           <div>
             Check board size
             <input type="text" value={state.boardSize} 
                onChange={e => handleOnChange({name:'boardSize', value:e.target.value})} 
              />
           </div>
           <div>
             Number of available steps
             <input type="text"  value={state.availableSteps} 
                onChange={e => handleOnChange({name:'availableSteps', value:e.target.value})} 
              />
           </div>
           <button onClick={e => handleClick()}>OK</button>
           <br />
           <br/>
           {
             state.showTable ? (
              <table onKeyPress={e => console.log('hi')} >
                {
                  arrOfCells && arrOfCells.map((index)=>(
                    <tr>
                      {
                        arrOfCells && arrOfCells.map((index1) =>(
                          <th style={state.selectedCell.row===index && state.selectedCell.col===index1 ?  
                            cellStyle :cellStyleSelected}>
                            </th>
                        ))
                      }
                    </tr>
                  ))
                  
                }
            </table>) : (
             <>
             
              <ul>
               
                {
                  state.selectedCellHis && state.selectedCellHis.map((cell)=>(

                    <li>{`Row: ${cell.row}-Col:${cell.col}`}</li>
                  ))

                }
                </ul>
              </>
              
            )
           }
           
           
        </div>

    </div>
  );
}

export default App;
