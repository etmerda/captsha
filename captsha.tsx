/*
	  ##  ##
	##########
	  ##  ##
	##########
	  ##  ##

	Captsha
	https://github.com/etmerda/captsha

	This script is licensed under the MPL-2.0 license.
	See LICENSE for more information.
*/

import { Hono } from "hono"

const app = new Hono()

app.get("/", (ctx) => (console.log(ctx.req), ctx.redirect("https://github.com/etmerda/captsha")))

const event_handler = new EventTarget()

// keyed by code id then keyed by job id
const responses: Record<string, Record<string, any>> = {}

app.post(async (ctx) => {
	console.log("Request got", ctx.req.raw)
	if (ctx.req.header("user-agent")?.includes("Roblox")) {
		const body = await ctx.req.json() ?? {}
		if (body.promptId !== "ping") {
			responses[body.promptId][body.jobId] = body.response
			event_handler.dispatchEvent(new CustomEvent("got", { detail: body }))
		}

		return ctx.json(
			await new Promise((resolve) => {
				event_handler.addEventListener("execute", (e) => resolve(e.detail))
				setTimeout(() => resolve({ promptId: "ping" }), 30 * 1000)
			}),
		)
	}
	if (ctx.req.header("user-agent")?.includes("ChatGPT")) {
		console.log("GOT HERE")
		const code = ctx.req.query('code')
		console.log(code)
		const promptId = Math.random().toString(36).slice(2) // Different from UUID so that GPT won't confuse them with jobids
		responses[promptId] ??= {}
		event_handler.dispatchEvent(
			new CustomEvent("execute", { detail: { promptId, code } }),
		)
		const res = await new Promise((resolve) => {
			console.log(responses[promptId])
				const finish = () => {
					resolve(responses[promptId])
					console.log("Sent", responses[promptId])
					delete responses[promptId]
				}
				let timeout = setTimeout(finish, 500)
				event_handler.addEventListener("got", () => {
					clearTimeout(timeout)
					timeout = setTimeout(finish, 500)
				})
		})
		return ctx.json(
			res
		)
	}
})

export default app
