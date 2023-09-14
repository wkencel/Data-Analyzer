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
    plotType: str = Form(...)
):
    # print(f"Received file: {file.filename}")
    print('at the backend python script')
    print(f"Option 1 value: {columnHeader}")
    print(f"Option 2 value: {plotType}")
    # # Step 1: Specify the destination file path on the Python server
    destination_directory = os.getcwd()  # Get the current working directory
    destination_directory = os.path.join(destination_directory, 'csvs')
    os.makedirs(destination_directory, exist_ok=True)  # Create the directory if it doesn't exist
    destination_file_path = os.path.join(destination_directory, file.filename)

    # # Step 2: Save uploaded file to destination directory
    with open(destination_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # # Step 2: Load CSV file into a DataFrame
    data1 = pd.read_csv(destination_file_path, sep=',')

    # function to choose proper plot library
    def choosePlot(plotType, column, data):
        if plotType == 'line':
            return data1.plot()
    #     elif plotType == 'bar':
    #         return data1.plot.bar()
        elif plotType == 'histogram':
                plt.hist(data[column], bins=10)
                plt.title(file.filename)
                plt.xlabel(columnHeader)
                plt.ylabel("Frequency")
                return
    #     elif plotType == 'box':
    #         return data1.plot.box()
    #     elif plotType == 'scatter':
    #         return data1.plot.scatter()
    #     elif plotType == 'pie':
    #         return data1.plot.pie()
        else:
            return

    # this is a hardcoded box plot for the housePrices
    # plt.boxplot([data1[data1['new'] == 1]['price'], data1[data1['new'] == 0]['price']], vert=False)
    # plt.yticks([1, 2], ['New', 'Old'])
    # plt.ylabel('House Condition')
    # plt.xlabel('Selling Price (thousands of dollars)')
    # plt.title('Box Plot of Selling Prices of houses in Gaineville, Florida')

    # this currently only works for housePrices, histogram
    choosePlot(plotType, columnHeader, data1)
    # plt.hist(data1['price'], bins=10)

    plt.show()


    # # # Starter code for analyzing .dat files
    # # url = "http://stat4ds.rwth-aachen.de/data/Carbon_West.dat"
    # # Split the values in the input file based on whitespace to properly load the DataFrame
    # # data = pd.read_csv(url, sep=r'\s+', engine='python')

    # print(f"the file itself: {data1}")
    return {'message': f'This is the file from the backend Python server: {data1}'}

result = upload()
print(result)
