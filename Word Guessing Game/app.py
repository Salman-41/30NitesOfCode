from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

# Load words from the word list file
def load_words():
    with open('./word-list.txt', 'r') as f:
        words = [line.strip() for line in f]
    return words

@app.route('/')
def index():
    return render_template('index.html')

# Start a new game
@app.route('/start_game', methods=['POST'])
def start_game():
    words = load_words()
    word = random.choice(words)
    return jsonify({
        'word': word,
        'masked_word': ['_' for _ in word],
        'remaining_chances': 10,
        'game_status': 'playing'
    })

# Guess a letter
@app.route('/guess', methods=['POST'])
def guess():
    data = request.json
    word = data['word']
    guessed_word = data['guessed_word']
    guessed_letter = data['guessed_letter']
    wrong_letters = data['wrong_letters']
    remaining_chances = data['remaining_chances']

    # Check if the guessed letter is in the actual word
    if guessed_letter in word:
        for i in range(len(word)):
            if word[i] == guessed_letter:
                guessed_word[i] = guessed_letter
    else:
        wrong_letters.append(guessed_letter) 
        remaining_chances -= 1

    # Determine game status
    game_status = 'playing'
    if '_' not in guessed_word:
        game_status = 'won'
    elif remaining_chances == 0:
        game_status = 'lost'

    return jsonify({
        'guessed_word': guessed_word,
        'wrong_letters': wrong_letters,
        'remaining_chances': remaining_chances,
        'game_status': game_status
    })

if __name__ == '__main__':
    app.run(debug=True)
