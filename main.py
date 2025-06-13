from flask import Flask, send_from_directory
import os

app = Flask(__name__, static_folder='dist')

@app.route('/')
def index():
    return send_from_directory('dist', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join('dist', path)):
        return send_from_directory('dist', path)
    return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True) 