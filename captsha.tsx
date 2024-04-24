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

app.get("/", (ctx) => ctx.redirect("https://github.com/etmerda/captsha"))

const event_handler = new EventTarget()

// keyed by code id then keyed by job id
const responses: Record<string, Record<string, any>> = {}

app.post("/", async (ctx) => {
	const body = await ctx.req.json()
	if (ctx.req.header("user-agent")?.includes("Roblox")) {
		if (body.promptId) {
			responses[body.promptId][body.jobId] = body.response
			event_handler.dispatchEvent(new CustomEvent("got", { detail: body }))
		}

		ctx.json(
			await new Promise((resolve) => {
				event_handler.addEventListener("execute", resolve)
				setTimeout(() => resolve({ promptId: "ping" }), 30 * 1000)
			}),
		)
	}
	if (ctx.req.header("user-agent")?.includes("ChatGPT")) {
		const promptId = Math.random().toString(36).slice(2) // Different from UUID so that GPT won't confuse them with jobids
		responses[promptId] ??= {}
		event_handler.dispatchEvent(
			new CustomEvent("execute", { detail: { promptId, code: body.code } }),
		)
		return ctx.json(
			await new Promise((resolve) => {
				const finish = () => {
					clearTimeout(timeout)
					resolve(responses[promptId])
					delete responses[promptId]
				}
				let timeout = setTimeout(finish, 500)
				event_handler.addEventListener("got", () => {
					clearTimeout(timeout)
					timeout = setTimeout(finish, 500)
				})
			}),
		)
	}
})

export default app
