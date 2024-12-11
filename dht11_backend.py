from flask import Flask, jsonify
from flask_cors import CORS
import Adafruit_DHT
import time

app = Flask(__name__)
CORS(app)

DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 17

@app.route('/realtime', methods=['GET'])
def get_sensor_data():
    paratartalom, homerseklet = Adafruit_DHT.read(DHT_SENSOR, DHT_PIN)
    if paratartalom is not None and homerseklet is not None:
        return jsonify({
            "Homerseklet": round(homerseklet, 1),
            "Paratartalom": round(paratartalom, 1),
            "timestamp": time.time()
        })
    else:
        return jsonify({"Hiba": "Az adatok lekérése nem sikerült."}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)