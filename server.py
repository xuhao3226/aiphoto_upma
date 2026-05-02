import sys
sys.path.insert(0, '/Users/deman/Library/Python/3.9/lib/python/site-packages')

from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import base64
import os
from rembg import remove

os.environ['HOME'] = '/tmp/rembg_cache'
os.environ['XDG_CACHE_HOME'] = '/tmp/rembg_cache'

app = Flask(__name__)
CORS(app)

@app.route('/remove-background', methods=['POST'])
def remove_background():
    try:
        data = request.get_json()
        image_data = data.get('image')

        if not image_data:
            return jsonify({'error': 'No image data provided'}), 400

        if image_data.startswith('data:image'):
            image_data = image_data.split(',')[1]

        input_image = base64.b64decode(image_data)

        output_image = remove(input_image)

        result_base64 = base64.b64encode(output_image).decode('utf-8')

        return jsonify({
            'success': True,
            'image': f'data:image/png;base64,{result_base64}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)