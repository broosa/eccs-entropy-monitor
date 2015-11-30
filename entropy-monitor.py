import sys
import os

import flask

from datetime import datetime

from flask import Flask, render_template, request, url_for

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/entropy")
def api_get_entropy():
    with open("/proc/sys/kernel/random/entropy_avail", "r") as input_file:
        try:
            entropy_available = int(input_file.readline())
        except:
            entropy_available = -1

    timestamp = datetime.now().isoformat("T")

    return flask.jsonify(timestamp=timestamp, entropy=str(entropy_available))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=1985)
