from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock inventory
inventory = {
    1: 10,  # Product ID: Quantity
    2: 15,
    3: 20
}

@app.route('/')
def home():
    return "Welcome to the Inventory Service"

@app.route('/inventory/all', methods=['GET'])
def get_inventory():
    return jsonify(inventory)

@app.route('/inventory/<int:product_id>', methods=['GET'])
def check_inventory(product_id):
    if product_id in inventory:
        return jsonify({"product_id": product_id, "quantity": inventory[product_id]})
    return jsonify({"error": "Product not found in inventory"}), 404

@app.route('/inventory/update', methods=['POST'])
def update_inventory():
    updates = request.json
    for product_id, quantity in updates.items():
        if int(product_id) in inventory:
            inventory[int(product_id)] -= quantity
    return jsonify({"status": "Inventory updated successfully"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004)
