async function postData() {
  try {
    const apiKey = document.querySelector('#apiKey').value;
    
    if (!apiKey) {
      return alert('No API key provided');
    } else {
      localStorage.setItem('DEEPGRAM_API_KEY', apiKey);
    }

    if (!document.querySelector('#fileInput').files[0]) {
      return alert('No file provided');
    }

    if (!document.querySelector('#fileInput').files[0].type.startsWith('audio')) {
      return alert('File must be audio');
    }

    const formData = new FormData();
    formData.append('apiKey', apiKey);
    formData.append('file', document.querySelector('#fileInput').files[0]);

    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    const transcript = await response.json();
    const blob = new Blob([JSON.stringify(transcript, null, 2)], {type : 'application/json'});
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a');
    document.querySelector('form').appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = `${document.querySelector('#fileInput').files[0].name}-transcript.json`;
    a.click();
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.log(error);
    alert(error);
  } finally {
    document.querySelector('#submit').style.display = 'block';
    document.querySelector('#loading').style.display = 'none';
  }
}

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  document.querySelector('#submit').style.display = 'none';
  document.querySelector('#loading').style.display = 'block';
  postData();
});

window.onload = function() {
  const apiKey = localStorage.getItem('DEEPGRAM_API_KEY');
  if (apiKey) {
    document.querySelector('#apiKey').value = apiKey;
  }
};