export default function CsvParser(csv) {
    const dataCSV = csv || [];
    
    const renderData = (csvObj) => {
        console.log(csvObj.csv[0]);
        const columns = csvObj.csv[0] ? Object.keys(csvObj.csv[0]) : []; // Get the column titles from the first row of csvObj
        console.log(`columnheaders: ${columns}`)
        return (
        <table className="table">
            <thead>
                <tr>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
                </tr>
            </thead>
            <tbody>
            {csvObj.csv.map((row, index) => (
                <tr key={index}>
                {columns.map((column, index) => (
                    <td key={index}>{row[column]}</td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
        );
        };

    return (
    <div>
      <h2>CSV raw data</h2>
      {renderData(dataCSV)}
    </div>
  );
    }
