from fastapi import FastAPI, UploadFile, File, Form
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import matplotlib.pyplot as plt
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
    # Add any other allowed origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),
    columnHeader: str = Form(...),
    plotType: str = Form(...),
    category: str = Form(...)
):
    # print(f"Received file: {file.filename}")
    print('at the backend python script')
    print(f"Option 1 value: {columnHeader}")
    print(f"Option 2 value: {plotType}")
    # print(f"Option 3 value: {category}")
    # # Step 1: Specify the destination file path on the Python server
    destination_directory = os.getcwd()  # Get the current working directory
    destination_directory = os.path.join(destination_directory, 'csvs')
    os.makedirs(destination_directory, exist_ok=True)  # Create the directory if it doesn't exist
    destination_file_path = os.path.join(destination_directory, file.filename)

    # # Step 2: Save uploaded file to destination directory
    with open(destination_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # # Step 2: Load CSV file into a DataFrame
    csv = pd.read_csv(destination_file_path, sep=',')

    def get_categories(arr):
        arr_types = []
        for element in arr:
            if element not in arr_types:
                arr_types.append(element)
        return arr_types

    # function to choose proper plot library
    def choosePlot(plotType, column, data):
        if plotType == 'line':
            return csv.plot()
    #     elif plotType == 'bar':
    #         return csv.plot.bar()
        elif plotType == 'histogram':
                plt.hist(data[column], bins=10)
                plt.title(file.filename)
                plt.xlabel(columnHeader)
                plt.ylabel("Frequency")
        elif plotType == 'box plot':
            categories = get_categories(csv[category])
            fig, ax = plt.subplots()
            ax.boxplot([data[data[category] == match][columnHeader] for match in categories], labels=categories, vert=False)
            ax.set_xlabel(columnHeader)
            ax.set_ylabel(category)
            ax.set_title(f"{columnHeader} by {category}")

            plt.show()
    #         return csv.plot.box()
    #     elif plotType == 'scatter':
    #         return csv.plot.scatter()
    #     elif plotType == 'pie':
    #         return csv.plot.pie()
        else:
            return

    choosePlot(plotType, columnHeader, csv)

    print(f"data column category {csv[category]}")
    print(f"test: {get_categories(csv[category])}")
    plt.show()

    # # # Starter code for analyzing .dat files
    # # url = "http://stat4ds.rwth-aachen.de/data/Carbon_West.dat"
    # # Split the values in the input file based on whitespace to properly load the DataFrame
    # # data = pd.read_csv(url, sep=r'\s+', engine='python')

    return {'message': f'This is the file from the backend Python server: {csv}'}

result = upload()
print(result)
