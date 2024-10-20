import json
from openai import OpenAI
import requests

class PockitAssistant():

    def __init__(self):
        API_KEY = "TYPE YOUR KEY HERE"
        self.client = OpenAI(api_key=API_KEY)
        self.thread = self.client.beta.threads.create()
        self.LOCALHOST = 'http://localhost:8888/pockit-prep'

    def run_assistant(self, prompt):

        # Example function
        def get_pocket_allocations():
            api_url = self.LOCALHOST+"/rest_api/get-allocations.php"

            # params = {
            #     'param1': 'value1',
            #     'param2': 'value2'
            # }

            # Send a GET request to the API
            response = requests.get(api_url)

            # Parse the JSON response
            data = response.json()

            living_expenses = float(data['living_expenses'])
            emergency_savings = float(data['emergency_savings'])
            savings_and_investments = float(data['savings_and_investments'])
            splurge_money = float(data['splurge_money'])

            return f"{{'living_expenses':'{living_expenses}'," \
                   f" 'emergency_savings': {emergency_savings}," \
                   f" 'savings_and_investments': '{savings_and_investments}'," \
                   f" 'splurge_money': {splurge_money}}}"

        def get_pocket_amounts():
            api_url = self.LOCALHOST+"/rest_api/get-pocket-amounts.php"

            # Send a GET request to the API
            response = requests.get(api_url)

            # Parse the JSON response
            data = response.json()

            living_expenses_amount = float(data['living_expenses_amount'])
            emergency_savings_amount = float(data['emergency_savings_amount'])
            savings_and_investments_amount = float(data['savings_and_investments_amount'])
            splurge_money_amount = float(data['splurge_money_amount'])

            return f"{{'living_expenses_amount':'{living_expenses_amount}'," \
                   f" 'emergency_savings_amount': {emergency_savings_amount}," \
                   f" 'savings_and_investments_amount': '{savings_and_investments_amount}'," \
                   f" 'splurge_money_amount': {splurge_money_amount}}}"

        def get_boc_investment_products():
            description = "BOC eTrader, an electronic margin trading platform, provides clients with direct access to “live” prices for the execution of instant delivery transactions (FX Spot) and mor"
            link = "https://www.bankofcyprus.com/en-gb/Personal/investments/markets-hedging/boc-etrader/"

            return f"{{'investment_product_description':'{description}'," \
                   f" 'investment_product_link': {link}}}"

        def change_pocket_allocations(living_expenses,emergency_savings,savings_and_investments,splurge_money):

            api_url = self.LOCALHOST+"/rest_api/submit-allocations.php"

            params = {
                'living_expenses': living_expenses,
                'emergency_savings': emergency_savings,
                'savings_and_investments': savings_and_investments,
                'splurge_money': splurge_money
            }

            # Send a GET request to the API
            response = requests.get(api_url, params=params)

            # Parse the JSON response
            data = response.json()

            new_living_expenses = float(data['living_expenses'])
            new_emergency_savings = float(data['emergency_savings'])
            new_savings_and_investments = float(data['savings_and_investments'])
            new_splurge_money = float(data['splurge_money'])

            print("LE:",new_living_expenses," ES:",new_emergency_savings," SI:",new_savings_and_investments," SP:",new_splurge_money)

            return f"{{'living_expenses':'{living_expenses}'," \
                   f" 'emergency_savings': {emergency_savings}," \
                   f" 'savings_and_investments': '{savings_and_investments}'," \
                   f" 'splurge_money': {splurge_money}}}. Reallocation completed"

        # "What is my current percentage allocation for each of my four pockets?
        # "Can you reallocate my pockets 25% each?", # TODO CHANGE THIS
        message = self.client.beta.threads.messages.create(
          thread_id=self.thread.id,
          role="user",
          content=prompt,
        )

        run = self.client.beta.threads.runs.create_and_poll(
            thread_id=self.thread.id,
            assistant_id="ENTER THE ASSISTANT ID",
        )


        # Define the list to store tool outputs
        tool_outputs = []

        try:
            # Loop through each tool in the required action section
            for tool in run.required_action.submit_tool_outputs.tool_calls:
                # get data from the weather function
                if tool.function.name == "get_pocket_allocations":

                    # # Load the arguments passed by the assistant
                    # args = json.loads(tool.function.arguments)
                    # location = args.get('location')
                    # unit = args.get('unit', 'Celsius')  # Default to Celsius if no unit provided

                    # Call your function with the location and unit
                    pockets = get_pocket_allocations()

                    tool_outputs.append({
                        "tool_call_id": tool.id,
                        "output": pockets
                    })
                elif tool.function.name == "change_pocket_allocations":

                    # Load the arguments passed by the assistant
                    args = json.loads(tool.function.arguments)
                    living_expenses = args.get('living_expenses')
                    emergency_savings = args.get('emergency_savings')
                    savings_and_investments = args.get('savings_and_investments')
                    splurge_money = args.get('splurge_money')

                    # Call your function with the location and unit
                    pockets = change_pocket_allocations(living_expenses, emergency_savings, savings_and_investments, splurge_money)

                    tool_outputs.append({
                        "tool_call_id": tool.id,
                        "output": pockets
                    })
                elif tool.function.name == "get_boc_investment_products":
                    print("here")
                    boc_inv = get_boc_investment_products()
                    print(boc_inv)

                    tool_outputs.append({
                        "tool_call_id": tool.id,
                        "output": boc_inv
                    })
                elif tool.function.name == "get_pocket_amounts":
                    pockets = get_pocket_amounts()
                    print(pockets)
                    tool_outputs.append({
                        "tool_call_id": tool.id,
                        "output": pockets
                    })
        except Exception as e:
            print(f"An error occurred: {e}")

        # Submit all tool outputs at once after collecting them in a list
        if tool_outputs:
            try:
                run = self.client.beta.threads.runs.submit_tool_outputs_and_poll(
                    thread_id=self.thread.id,
                    run_id=run.id,
                    tool_outputs=tool_outputs
                )
                print("Tool outputs submitted successfully.")
            except Exception as e:
                print("Failed to submit tool outputs:", e)
        else:
            print("No tool outputs to submit.")


        # TODO Run status could be delayed. Maybe add in loop
        if run.status == 'completed':
            print("run status: ", run.status)
            messages = self.client.beta.threads.messages.list(thread_id=self.thread.id)
            #print(messages.to_json(indent=2))
            message_content = messages.data[0].content[0].text
            print(message_content.value)
            return message_content.value
        else:
            print("run status: ", run.status)
            #print(run.last_error.message)
            return "There has been an issue. Please try again in a minute :("


if __name__ == '__main__':
    assistant = PockitAssistant()
    while True:
        prompt = input("GRAPSE: ")
        assistant.run_assistant(prompt)
