from openai import OpenAI
import os
from dotenv import load_dotenv  # pip install python-dotenv
import streamlit as st # pip install streamlit

load_dotenv()


client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY")
)

st.title("OPENAI Get Result")

user_input = st.text_input("Enter your message", "Get Any basic details you want.")

if st.button("Get Result"):
    if user_input:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a Basic details Generator that gives small details about anything you want."},
                {"role": "user", "content": user_input}
            ]
        )
        st.text_area("Result", completion.choices[0].message["content"], height=500)
    else:
        st.error("Please enter a message to get the result.")
    
    