/**
 * @name dataContext
 * @desc Context container for the data
 */
 import React, { useState, createContext } from 'react'; 

 export type GlobalState = {
  columnOption: string,
  plotType: string,
  fileData: any, 
  setColumnOption: (input: string ) => void;
  setPlotType: (input: string ) => void;
  setFileData: (input: any ) => void;
};

export const initialState: GlobalState = {
  columnOption: '',
  plotType: '',
  fileData: [],
  setColumnOption: () => {},
  setPlotType: () => {},
  setFileData: () => {},
};

export const globalContext = createContext<GlobalState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [columnOption, setColumnOption] = useState<string>('');
  const [plotType, setPlotType] = useState<string>('');
  const [fileData, setFileData] = useState<any>([]);

  return <globalContext.Provider value={{
    columnOption, 
    plotType, 
    fileData,
    setColumnOption, 
    setPlotType, 
    setFileData, 
  }}>{props.children}</globalContext.Provider>
}
