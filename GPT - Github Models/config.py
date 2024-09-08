import os
from dotenv import load_dotenv

load_dotenv()  # This loads the variables from .env

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    GITHUB_TOKEN = os.environ.get('GITHUB_TOKEN')
    OPENAI_BASE_URL = "https://models.inference.ai.azure.com"