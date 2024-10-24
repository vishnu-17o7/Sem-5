from flask import Flask, jsonify

app = Flask(__name__)

# Mock database
products = [
    {"id": 1, "name": "Laptop", "price": 999.99, "description": "High-performance laptop"},
    {"id": 2, "name": "Smartphone", "price": 499.99, "description": "Latest model smartphone"},
    {"id": 3, "name": "Headphones", "price": 99.99, "description": "Noise-cancelling headphones"}
]

@app.route('/')
def home():
    return "Welcome to the Product Catalog Service"

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in products if p['id'] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
