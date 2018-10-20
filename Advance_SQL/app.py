import numpy as np
import pandas as pd
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Measurement = Base.classes.measurement
Station = Base.classes.station

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/temperature<br/>"
    )


@app.route("/api/v1.0/precipitation")
def precipitation():
    """Return rain for dates betwee 2016-08-24 and 2017-08-23"""
    # Query all passengers
    results = session.query(Measurement.date, Measurement.prcp).\
    filter(Measurement.date >= '2016-08-24').filter(Measurement.date <= '2017-08-23').\
    order_by(Measurement.date).all()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/stations")
def stations():
    """Return a list of Stations"""
    # Query all station
    results = list(np.ravel(session.query(Station.station).all()))

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


@app.route("/api/v1.0/temperature")
def temperature():
    """Return temperature for dates betwee 2016-08-24 and 2017-08-23"""
    # Query all temperature
    results = session.query(Measurement.date, Measurement.tobs).\
    filter(Measurement.date >= '2016-08-24').filter(Measurement.date <= '2017-08-23').\
    order_by(Measurement.date).all()

    # Convert list of tuples into normal list
    all_names = list(np.ravel(results))

    return jsonify(all_names)


if __name__ == '__main__':
    app.run(debug=True)