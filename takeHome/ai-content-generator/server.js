const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

app.post('/generate', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.post('/completions', {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error('Error generating text:', error.response ? error.response.data : error.message);
    res.status(500).send('Error generating text');
  }
});

app.post('/summarize', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await openai.post('/completions', {
      model: 'text-davinci-003',
      prompt: `Summarize the following text: ${text}`,
      max_tokens: 100,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error('Error summarizing text:', error.response ? error.response.data : error.message);
    res.status(500).send('Error summarizing text');
  }
});

app.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    const response = await openai.post('/completions', {
      model: 'text-davinci-003',
      prompt: `Translate the following text to ${targetLanguage}: ${text}`,
      max_tokens: 150,
    });
    res.json(response.data.choices[0].text);
  } catch (error) {
    console.error('Error translating text:', error.response ? error.response.data : error.message);
    res.status(500).send('Error translating text');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
