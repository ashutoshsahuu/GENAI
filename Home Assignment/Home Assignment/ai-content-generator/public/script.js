async function generateText() {
  const prompt = document.getElementById('prompt').value;
  const response = await fetch('/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prompt })
  });
  const data = await response.text();
  document.getElementById('result').innerText = data;
}

async function summarizeText() {
  const text = document.getElementById('text').value;
  const response = await fetch('/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  });
  const data = await response.text();
  document.getElementById('result').innerText = data;
}

async function translateText() {
  const text = document.getElementById('translate-text').value;
  const targetLanguage = document.getElementById('language').value;
  const response = await fetch('/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, targetLanguage })
  });
  const data = await response.text();
  document.getElementById('result').innerText = data;
}
