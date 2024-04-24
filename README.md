<h1 align="center">
  Captsha
</h1>
<div align="center"><strong align="center">Completely Automated Private Tacticalmanx75 to tell Skids and Humans Apart</strong></div>
<div align="center" aria-hidden>　</div>

Captsha is a [ChatGPT Action](https://platform.openai.com/docs/actions/introduction) that allows you to remotely control Roblox servers.

## Installation

### Web Server

```
git clone https://github.com/etmerda/captsha --depth 1
cd captsha
bun i
bun start
```

A .env file will be created `WRITE_KEY` defined. Copy the key for later, we will use it when creating the GPT!

### Roblox Game

1. [Enable `HttpService`](https://create.roblox.com/docs/reference/engine/classes/HttpService#HttpEnabled)
2. [Enable `loadstring`](https://create.roblox.com/docs/reference/engine/classes/ServerScriptService#LoadStringEnabled).
3. Add [the script](./loader.lua) to your game.

### GPT

> [!WARNING]
> 
> [ChatGPT Plus](https://openai.com/chatgpt/pricing) is required to create GPTs.

*todo*
