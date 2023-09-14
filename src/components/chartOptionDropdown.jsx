import React, { useState } from "react";
import { globalContext } from "../context/dataContext";
import axios from "axios";

const ChartOptionDropdown = ({ options1, options2 }) => {
    // const [selectedOption1, setSelectedOption1] = useState("");
    // const [selectedOption2, setSelectedOption2] = useState("");
    const { 
        columnOption, 
        setColumnOption,
        plotType,
        setPlotType,
        fileData,
        setFileData
    } = React.useContext(globalContext);   
    console.log(`options from globalContext: ${columnOption}, `)

    const handleColumnChange = (e) => {
        // setSelectedOption1(e.target.value);
        setColumnOption(e.target.value)
    };

    const handlePlotTypeChange = (e) => {
        // setSelectedOption2(e.target.value);
        setPlotType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the selected options
        // console.log("Selected Option 1:", selectedOption1);
        console.log("Selected Option 1 in context:", columnOption);
        // console.log("Selected Option 2:", selectedOption2);
        console.log("Selected Option 1 in context:", plotType);
    };

    const generateChart = () => {
        const formData = new FormData();
        formData.append("file", fileData);
        formData.append("columnHeader", columnOption);
        formData.append("plotType", plotType);
        const url = "http://localhost:8000/upload";

        axios
            .post(url, formData)
            .then((response) => {
                console.log(
                    `this is the response from axios: ${JSON.stringify(response.data)}`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label htmlFor="columnHeader">Column:</label>
            <select
                id="columnHeader"
                value={columnOption}
                onChange={handleColumnChange}
            >
                <option value="">Select an option</option>
                {options1.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
                ))}
            </select>

            <br />

            <label htmlFor="plotType">Plot Type:</label>
            <select
                id="plotType"
                value={plotType}
                onChange={handlePlotTypeChange}
            >
                <option value="">Select a plot Type</option>
                {options2.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
                ))}
            </select>

            <br />
            <button onClick={generateChart}>Generate Chart</button>
            </form>
        </div>
    );
};

export default ChartOptionDropdown;
