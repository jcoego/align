import React, {useEffect, useState, useCallback}  from 'react';

import {setRandomCell} from './utils/utils'

const defaultState = {
  boardSize : 5, //TODO: Change to 0
  availableSteps: 0,
  showTable: true, //TODO: Change to false.
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
  const [selectedCell, setSelectedCell] = useState({row:0, col:0})

  const handleOnChange = ({name='',value=''}) => {
    setState({...state,[name]:+value})
  }

  const handleClick = () =>{
    setState({...state, showTable: true});
    let selectedCellAux = setRandomCell(state.boardSize);
    setSelectedCell(selectedCellAux)
  }

  const handleKeyPress  = useCallback((key) =>{
    if(!state.showTable) return;
    alert('hi')
  },[state.showTable])

  useEffect(()=>{
    document.addEventListener('keydown',handleKeyPress)
    return ()=>{
      document.removeEventListener('keydown',handleKeyPress)
    }
  },[])



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
             state.showTable && (
              <table onKeyPress={e => console.log('hi')} >
                {
                  arrOfCells && arrOfCells.map((index)=>(
                    <tr>
                      {
                        arrOfCells && arrOfCells.map((index1) =>(
                          <th style={selectedCell.row===index && selectedCell.col===index1 ?  
                            cellStyle :cellStyleSelected}>
                            </th>
                        ))
                      }
                    </tr>
                  ))
                  
                }
            </table>)
           }
           
           
        </div>

    </div>
  );
}

export default App;
