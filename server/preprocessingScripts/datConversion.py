import requests
import csv

# insert .dat url here
url = "https://stat4ds.rwth-aachen.de/data/Students.dat"

# Download the .dat file from the URL
response = requests.get(url)
dat_content = response.text

# Specify the desired CSV file path
csv_file_path = "output.csv"

# Open the CSV file in write mode
with open(csv_file_path, "w", newline="") as csv_file:
    writer = csv.writer(csv_file)

    # Split the lines of .dat file and write them as CSV rows
    for line in dat_content.split("\n"):
        writer.writerow(line.split())

print("Conversion complete. CSV file saved as", csv_file_path)