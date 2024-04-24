<h1 align="center">
  Captsha
</h1>
<div align="center"><strong align="center">Completely Automated Private Tacticalmanx75 to tell Skids and Humans Apart</strong></div>
<div align="center" aria-hidden>　</div>

Captsha is a [ChatGPT Action](https://platform.openai.com/docs/actions/introduction) that allows you to remotely control Roblox servers.

## Installation

```
git clone https://github.com/etmerda/captsha --depth 1
cd captsha
bun i
bun start
```

A .env file will be created `WRITE_KEY` defined. Copy the key for later, the GPT will use it for authentication.

Replace `https://localhost:3000` in `./captsha.openapi.json` with the URL of your web server, 

Then, in your Roblox game:

1. [Enable `HttpService`](https://create.roblox.com/docs/reference/engine/classes/HttpService#HttpEnabled)
2. [Enable `loadstring`](https://create.roblox.com/docs/reference/engine/classes/ServerScriptService#LoadStringEnabled).
3. Add [the script](./captsha.server.lua) to your game and change `SERVER_URL` to the URL of your web server.


### GPT

> [!WARNING]
> 
> [ChatGPT Plus](https://openai.com/chatgpt/pricing) is required to create GPTs.
