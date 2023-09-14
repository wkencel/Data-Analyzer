import axios from "axios";

const GenerateChart = (csv) => {

    const handleClick = () => {
        const formData = new FormData();
        formData.append("file", csv);
        const url = "http://localhost:8000/upload";

        axios
            .post(url, formData)
            .then((response) => {
                    console.log(
                    `this is the response from axios: ${response}}`
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            <button onClick={handleClick}>Generate Chart</button>
        </div>
        // This is where we'll put the chart
    )
}

export default GenerateChart;