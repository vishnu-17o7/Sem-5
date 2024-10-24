from flask import Flask, jsonify, request

app = Flask(__name__)

# Mock payment history
payments = []

@app.route('/')
def home():
    return "Welcome to the Payment Service"

@app.route('/process-payment', methods=['POST'])
def process_payment():
    payment_info = request.json
    # Simulate payment processing
    if payment_info['amount'] > 0 and payment_info.get('card_number'):
        transaction_id = "tx_123456"  # Simulated transaction ID
        payments.append({"transaction_id": transaction_id, **payment_info})  # Store payment info
        return jsonify({"status": "success", "transaction_id": transaction_id}), 200
    return jsonify({"status": "failed", "error": "Invalid payment information"}), 400

@app.route('/payments', methods=['GET'])
def get_payments():
    return jsonify(payments), 200  # Return the list of payments

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
