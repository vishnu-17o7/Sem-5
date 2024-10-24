from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock database
orders = []

@app.route('/')
def home():
    return "Welcome to the Order Management Service"

@app.route('/orders', methods=['GET'])
def get_orders():
    return jsonify(orders)

@app.route('/orders', methods=['POST'])
def create_order():
    order = request.json
    order['id'] = len(orders) + 1
    order['status'] = 'pending'
    orders.append(order)
    return jsonify(order), 201

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

@app.route('/orders/<int:order_id>/status', methods=['PUT'])
def update_order_status(order_id):
    order = next((o for o in orders if o['id'] == order_id), None)
    if order:
        order['status'] = request.json['status']
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
