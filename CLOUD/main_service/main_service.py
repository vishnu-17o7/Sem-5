from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    try:
        # Fetch inventory data
        inventory_response = requests.get('http://inventory-service:5004/inventory/all')
        inventory_response.raise_for_status()
        inventory = inventory_response.json()

        # Fetch products data
        products_response = requests.get('http://product-catalog-service:5001/products')
        products_response.raise_for_status()
        products = products_response.json()

        # Format inventory with product names
        formatted_inventory = []
        for product_id, quantity in inventory.items():
            product_name = next((p['name'] for p in products if p['id'] == product_id), 'Unknown Product')
            formatted_inventory.append({'id': product_id, 'name': product_name, 'quantity': quantity})

        # Fetch orders data
        orders_response = requests.get('http://order-management-service:5002/orders')
        orders_response.raise_for_status()
        orders = orders_response.json()

        # Fetch payments data
        payments_response = requests.get('http://payment-service:5003/payments')
        payments_response.raise_for_status()
        payments = payments_response.json()

        return render_template('index.html', inventory=formatted_inventory, orders=orders, payments=payments)
    except requests.exceptions.RequestException as e:
        return render_template('index.html', error=str(e))

@app.route('/place-order', methods=['POST'])
def place_order():
    data = request.json
    product_id = data['product_id']
    quantity = int(data['quantity'])
    card_number = data['card_number']
    price = float(data['price'])

    inventory_response = requests.get(f'http://inventory-service:5004/inventory/{product_id}')
    if inventory_response.status_code != 200:
        return jsonify({"error": "Product not available"}), 400
    
    available_quantity = inventory_response.json()['quantity']
    if available_quantity < quantity:
        return jsonify({"error": "Insufficient quantity"}), 400

    order_data = {
        "product_id": product_id,
        "quantity": quantity,
        "total_price": price * quantity
    }
    order_response = requests.post('http://order-management-service:5002/orders', json=order_data)
    order = order_response.json()

    payment_data = {
        "amount": order['total_price'],
        "card_number": card_number
    }
    payment_response = requests.post('http://payment-service:5003/process-payment', json=payment_data)
    
    if payment_response.status_code != 200:
        requests.put(f'http://order-management-service:5002/orders/{order["id"]}/status', json={"status": "payment_failed"})
        return jsonify({"error": "Payment failed"}), 400

    # Update inventory
    inventory_update = {str(product_id): quantity}
    requests.post('http://inventory-service:5004/inventory/update', json=inventory_update)

    # Update order status
    requests.put(f'http://order-management-service:5002/orders/{order["id"]}/status', json={"status": "completed"})

    return jsonify({"message": "Order placed successfully", "order_id": order['id']}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
