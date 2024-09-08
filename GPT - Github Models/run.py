from flask import Flask, render_template, request, jsonify
from openai import OpenAI
from config import Config
import os

app = Flask(__name__)
app.config.from_object(Config)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    selected_model = data['model']
    
    # Default OpenAI configuration for GPT-4o
    client = OpenAI(
        base_url=app.config['OPENAI_BASE_URL'],
        api_key=app.config['GITHUB_TOKEN'],
    )

    if selected_model == "gpt-4o-mini":
        client = OpenAI(
            base_url="https://models.inference.ai.azure.com",
            api_key=os.environ["GITHUB_TOKEN"],
        )
    
    # Generate the response based on the selected model
    response = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a helpful assistant.",
            },
            {
                "role": "user",
                "content": user_message,
            }
        ],
        model=selected_model,
        temperature=1,
        max_tokens=4096,
        top_p=1
    )
    
    return jsonify({'response': response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True)
