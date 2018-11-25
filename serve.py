from flask import Flask, render_template, send_from_directory, jsonify
import csv

app = Flask(__name__)

locations_file = "PlatformLocations.csv"
time = 0
aircraft_locations = dict()
aircraft_num = 8

with open(locations_file, newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    for row in reader:
        location_id = row[0]+"-"+row[1]
        aircraft_locations[location_id] = {"time": row[0], "id": row[1], "location": row[2], "attitude": row[3], "airspeed": row[4], "fuel": row[7], "name": row[8], "colour": row[9]}
        # print(locations[location_id])

@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('required', path)

@app.route("/")
def hello():
    # return "Hello World!"
    return render_template('index.html', title='Home')

@app.route("/api/locations")
def locations():
    global time
    aircraft_pos = dict()

    for aircraft in range(aircraft_num):
        aircraft += 1
        aircraft_pos[aircraft] = aircraft_locations[str(time) + "-" + str(aircraft)]
        time += 1

    if time 

    return jsonify(aircraft_pos)
