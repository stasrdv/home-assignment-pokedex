from flask import Flask, jsonify, request
from flask_cors import CORS
import db

app = Flask(__name__)
CORS(app)

DEFAULT_PAGE_SIZE = 5
DEFAULT_CURRENT = 1
DEFAULT_SORT_ORDER = 'asc'


@app.route('/types')
def get_poke_types():
    
    data = db.get()
    types_set = {pokemon['type_one'] for pokemon in data} | {pokemon['type_two'] for pokemon in data}
    unique_types = list(types_set)
    return jsonify(unique_types)


@app.route('/')
def get_pokemon_list():

    page = int(request.args.get('page', DEFAULT_CURRENT))
    page_size = int(request.args.get('page_size', DEFAULT_PAGE_SIZE))
    pokemon_type = request.args.get('poke_type', '')
    sort_order = request.args.get('sort_order', DEFAULT_SORT_ORDER)
    data = db.get()

    filtered_data = [pokemon for pokemon in data if pokemon['type_one'] == pokemon_type or pokemon['type_two'] == pokemon_type] if pokemon_type else data

    reverse = sort_order.lower() == 'desc'
    filtered_data.sort(key=lambda x: x['number'], reverse=reverse)

    start_idx = (page - 1) * page_size
    end_idx = start_idx + page_size

    paginated_data = filtered_data[start_idx:end_idx]

    metadata = {'total_count': len(filtered_data)}

    return jsonify({'list': paginated_data, 'metadata': metadata})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
