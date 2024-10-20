from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from pockit_assistant import PockitAssistant

app = Flask(__name__)
CORS(app)

pockit_assistant = PockitAssistant()

# For testing only use a simple chat html
@app.route('/')
def index():
    return render_template('chat.html')

@app.route('/ask-pockit', methods=['GET','POST'])
def chatPockit():
    prompt = request.form['msg']
    prompt += "\n\nFormatting is very important, so return your responses formatted appropriately. To achieve this, in your responses, formatted elements specifically must be in HTML. Specifically, only format the following in HTML: 1. Unordered lists, 2. Ordered lists, 3. Bold text, 4. Links, 5. Italic text"
    response = pockit_assistant.run_assistant(prompt)
    return response

############# NOT USED BELOW THIS POINT

# Enhanced Assistant Tests
@app.route('/get-allocations', methods=['GET','POST'])
def getPocketAllocations():
    living_expenses = 0.32
    emergency_savings = 0.16
    savings_and_investments = 0.12
    splurge_money = 0.4

    return f"{{'living_expenses':'{living_expenses}'," \
           f" 'emergency_savings': {emergency_savings}," \
           f" 'savings_and_investments': '{savings_and_investments}'," \
           f" 'splurge_money': {splurge_money}}}"

@app.route('/submit-allocations', methods=['GET','POST'])
def submitPocketAllocations():
    # Extract query parameters (for GET requests)
    new_living_expenses = request.args.get('living_expenses', default=0, type=float)
    new_emergency_savings = request.args.get('emergency_savings', default=0, type=float)
    new_savings_and_investments = request.args.get('savings_and_investments', default=0, type=float)
    new_splurge_money = request.args.get('splurge_money', default=0, type=float)

    print("LE:", new_living_expenses, " ES:", new_emergency_savings, " SI:", new_savings_and_investments, " SP:",
          new_splurge_money)

    return f"{{'living_expenses':'{new_living_expenses}'," \
           f" 'emergency_savings': {new_emergency_savings}," \
           f" 'savings_and_investments': '{new_savings_and_investments}'," \
           f" 'splurge_money': {new_splurge_money}}}. Reallocation completed"


if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host="0.0.0.0", port=5050, debug=True)