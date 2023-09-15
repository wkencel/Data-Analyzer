import { useState, useCallback, useContext } from "react";
import './styles/App.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import CsvParser from './components/CsvParser'
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "../particles.json";
import Papa from "papaparse";
import ChartOptionDropdown from "./components/chartOptionDropdown.jsx";
import { globalContext } from "./context/dataContext";
import ChatGptMessageBox from "./components/ChatGptMessageBox";
import { plotOptions } from "./Constants/ClientConstants";

function App() {
  const [columnHeaders, setColumnHeaders] = useState([]); // ["column1", "column2", "column3"
  const {
    csvData,
    setCsvData,
    setFileData
  } = useContext(globalContext);  

  const particlesInit = useCallback((main) => {
    loadFull(main);
  }, []);
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileData(file)

    function parseHeaders(data) {
      var headers = [];
      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        for (var key in row) {
          if (headers.indexOf(key) === -1) {
            headers.push(key);
          }
        }
      }
      return headers;
    }
    // Parse the input file to show to the client
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setCsvData(results.data);
        setColumnHeaders(parseHeaders(results.data));
      },
    });
  };
      
  return (
    <div className="App">
      <Particles options={particlesOptions} init={particlesInit} />;
      <div style={{ position: "relative", height: "800px", width: "700px" }}>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{ position: "relative", zIndex: 2 }}
        />
        <div
          style={{ backgroundColor: "black", position: "relative", zIndex: 2 }}
        >
          <ChartOptionDropdown
            options1={columnHeaders}
            options2={plotOptions}
            options3={columnHeaders}
          />
          <ChatGptMessageBox />
          <CsvParser
            csv={csvData}
            style={{ position: "relative", zIndex: 2 }}
          />
        </div>
      </div>
    </div>
  );
}

export default App
