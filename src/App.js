import React, {useEffect, useState, useCallback, useReducer, useMemo}  from 'react';

import {setRandomCell} from './utils/utils'

const defaultState = {
  boardSize : 5, 
  availableSteps: 2,
  showTable: false, 
  selectedCell: {row: 0, col:0},
  nSteps:0,
  selectedCellHis:[]
}

const cellStyleBase = {
  border: '1px solid grey',
  padding: '20px'
}

const cellStyleColor1 = {
  ...cellStyleBase,
  backgroundColor: 'grey'
}

const cellStyleSelected = {
  ...cellStyleBase,
  backgroundColor:'red'
}

export const getCellInitColor = (col,row)=>{
  if((+col+row)%2 === 0){
    return cellStyleBase
  }else {
    return cellStyleColor1
  }
}




function App() {

  const [state, setState] = useState(defaultState);

  const handleOnChange = ({name='',value=''}) => {
    setState({...state,[name]:+value})
  }

  const handleClick = () =>{
    let selectedCellAux = setRandomCell(+state.boardSize);
    setState({...state, showTable: true, selectedCell: selectedCellAux});
  }


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


  const handleClickStartOver = ()=>{
    setState(defaultState);
  }

/*   let arrOfCells = []
  for(let i=0; i< state.boardSize ; i++){
    arrOfCells.push(i)
  } */

  let arrOfCells = useMemo(()=>{
    let arrOfCellsAux =[]
    for(let i=0; i< state.boardSize ; i++){
      arrOfCellsAux.push(i)
    } 
    return arrOfCellsAux;
  },[state.boardSize])


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
           {!state.showTable && (+state.nSteps +1 < +state.availableSteps) && <button onClick={e => handleClick()}>OK</button>}
           <br />
           <br/>
           {
             state.showTable ? (
              <table >
                <tbody>
                {
                  arrOfCells && arrOfCells.map((index)=>(
                    <tr key={index}>
                      {
                        arrOfCells && arrOfCells.map((index1) =>(
                          <th key={index+''+index1} style={state.selectedCell.row===index && state.selectedCell.col===index1 ?  
                            cellStyleSelected :getCellInitColor(index,index1)}>
                            </th>
                        ))
                      }
                    </tr>
                  ))
                  
                }
              </tbody>
            </table>) : (
             <>
                { +state.nSteps +1 >= +state.availableSteps && (
                  <h2>Thank you. your steps</h2>
                )}
             
              <ul>   
                {
                  state.selectedCellHis && state.selectedCellHis.map((cell)=>(

                    <li key={cell.row+'-'+cell.col}>{`Row: ${cell.row}-Col:${cell.col}`}</li>
                  ))

                }
                </ul>
                { +state.nSteps +1 >= +state.availableSteps && (
                  <button onClick = {e => handleClickStartOver()}>Start over</button>
                )}
              </>
              
            )
           }
           
           
        </div>

    </div>
  );
}

export default App;
