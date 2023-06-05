const express = require("express")
const fileUpload = require('express-fileupload')
const { Deepgram } = require("@deepgram/sdk")
const app = express()
const port = process.env.PORT || 3000

app.use(fileUpload())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.post('/', async (req, res) => {
  // if no API key is provided, return an error
  if (!req.body.apiKey) {
    return res.status(400).send('No API key provided')
  }

  // if no file is provided, return an error
  if (!req.files || !req.files.file) {
    return res.status(400).send('No file provided')
  }

  // if not audio mimetype, return an error
  if (!req.files.file.mimetype.startsWith('audio')) {
    return res.status(400).send('File must be audio')
  }

  const apiKey = req.body.apiKey
  const deepgram = new Deepgram(apiKey)
  
  const source = {
    buffer: req.files.file.data,
    mimetype: req.files.file.mimetype,
  }

  const options = {
    diarize: true,
    punctuate: true,
    model: "nova",
    language: "en-US",
  }

  try {
    const response = await deepgram.transcription.preRecorded(source, options)
    const words = response.results.channels[0].alternatives[0].words

    let transcript = {
      version: '1.0.0',
      'segments': []
    }

    for (let i = 0; i < words.length; i++) {
      let word = words[i]
      let segment = {
        'speaker': `Speaker ${word.speaker + 1}`,
        'startTime': word.start,
        'endTime': word.end,
        'body': word.punctuated_word
      }
      transcript.segments.push(segment)
    }

    console.log(transcript)
    res.send(transcript)
  }
  catch (error) {
    if (error.startsWith('DG: ')) {
      const splitError = error.split(': ', 2);
      const jsonError = JSON.parse(splitError[1])
      console.log(jsonError)
      res.error = jsonError
    }
    else {
      console.log(error)
      res.send(error)
    }
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})