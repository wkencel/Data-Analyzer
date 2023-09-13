from fastapi import FastAPI, UploadFile, File
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
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
async def upload(file: UploadFile = File(...)):
    print('at the backend python script')
    print(f"Received file: {file.filename}")
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
    # modData = data1.to_dic()

    # # # Starter code for analyzing .dat files
    # # url = "http://stat4ds.rwth-aachen.de/data/Carbon_West.dat"
    # # Split the values in the input file based on whitespace to properly load the DataFrame
    # # data = pd.read_csv(url, sep=r'\s+', engine='python')

    # print(f"the file itself: {data1}")
    return {'message': f'This is the file from the backend Python server: {data1}'}

result = upload()
print(result)
