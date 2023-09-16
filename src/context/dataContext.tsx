/**
 * @name dataContext
 * @desc Context container for the data
 */
 import React, { useState, createContext } from 'react'; 

 export type GlobalState = {
  columnOption: string,
  plotType: string,
  fileData: any, 
  category: string,
  csvData: any,
  setColumnOption: (input: string ) => void;
  setPlotType: (input: string ) => void;
  setFileData: (input: any ) => void;
  setCategory: (input: string ) => void;
  setCsvData: (input: any ) => void;
};

export const initialState: GlobalState = {
  columnOption: '',
  plotType: '',
  fileData: [],
  category: '',
  csvData: [],
  setColumnOption: () => {},
  setPlotType: () => {},
  setFileData: () => {},
  setCategory: () => {},
  setCsvData: () => {},
};

export const globalContext = createContext<GlobalState>(initialState)

export const ContextProvider: React.FC = (props: any) => {
  
  const [columnOption, setColumnOption] = useState<string>('');
  const [plotType, setPlotType] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [fileData, setFileData] = useState<any>([]);
  const [csvData, setCsvData] = useState<any>([]);

  return <globalContext.Provider value={{
    columnOption, 
    plotType, 
    fileData,
    category,
    csvData,
    setColumnOption, 
    setPlotType, 
    setFileData, 
    setCategory,
    setCsvData
  }}>{props.children}</globalContext.Provider>
}
