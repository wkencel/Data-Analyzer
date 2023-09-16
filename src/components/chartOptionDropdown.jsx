import React from "react";
import { globalContext } from "../context/dataContext";
import axios from "axios";

const ChartOptionDropdown = ({ options1, options2, options3 }) => {
    const { 
        columnOption, 
        plotType,
        fileData,
        category,
        setColumnOption,
        setPlotType,
        setCategory
    } = React.useContext(globalContext);   
    console.log(`options from globalContext: ${columnOption}, `)

    const handleColumnChange = (e) => {
        setColumnOption(e.target.value)
    };

    const handlePlotTypeChange = (e) => {
        setPlotType(e.target.value);
    };
    
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Selected columnOption submitted: ${columnOption}`);
        console.log(`Selected plotType submitted: ${plotType}`);
    };

    // append information to formData and send to backend
    const generateChart = () => {
        const formData = new FormData();
        // error handling
        // if (columnOption === category) console.error("columnOption and category cannot be the same");
        formData.append("file", fileData);
        formData.append("columnHeader", columnOption);
        formData.append("plotType", plotType);
        formData.append("category", category);
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

    const Category = () => {
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <p> by </p>
                <select
                id="columnHeader"
                value={category}
                onChange={handleCategoryChange}
                style={{ margin: "10px" }}
                >
                <option value="">Select a category</option>
                {options3.map((option, index) => (
                    <option key={index} value={option}>
                    {option}
                    </option>
                ))}
                </select>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="columnHeader">Column:</label>
                <select
                    id="columnHeader"
                    value={columnOption}
                    onChange={handleColumnChange}
                    style={{ margin: "10px" }}
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
                {plotType === "box plot" ? <Category /> : null}
                <br />
                <button
                style={{ border: "1px solid white", margin: "10px" }}
                onClick={generateChart}
                >
                    Generate Chart
                </button>
            </form>
        </div>
    );
};
        
export default ChartOptionDropdown;
