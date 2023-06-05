# Scribble

> Transcribe with your own [Deepgram account](https://console.deepgram.com/) with **speaker diarization and word-by-word fidelity**. Then, convert it to the [Podcast Namespace JSON spec](https://github.com/Podcastindex-org/podcast-namespace/blob/main/transcripts/transcripts.md#json).

[scribble.fly.dev](https://scribble.fly.dev/)

## Quick Start

1. Create a free Deepgram account and generate an API key. You’ll get $200 in credit, absolutely free. No credit card needed.
1. Paste your API key and upload your audio to the app.
1. Receive a high-fidelity transcript correctly formatted for the `<podcast:transcript>` tag.
1. Optionally, replace the "Speaker 1", "Speaker 2" labels with actual names.

## Supporting

This is an independent open-source project self-funded by [Nathan Gathright](https://github.com/nathangathright). If you use it in your own work, please consider supporting its ongoing development by using one of the options below:

[Stripe →](https://buy.stripe.com/eVa15scEr1XAgOQ3cc) [Alby →](https://getalby.com/p/nathang)

If you wish to send streaming micropayments over the Lightning network, add the following info to your RSS feed’s [value tag](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#value):

```xml
<podcast:value type="lightning" method="keysend">
   <podcast:valueRecipient name="nathang@getalby.com" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="2yjUCncyVMyWY31einuk" split="100"/>
</podcast:value>
```