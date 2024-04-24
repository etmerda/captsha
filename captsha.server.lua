local SERVER_URL = "http://localhost:3000" -- Edit this to your Captsha server URL!
--[[
	  ##  ##
	##########
	  ##  ##
	##########
	  ##  ##

	Captsha
	https://github.com/etmerda/captsha

	This script is licensed under the MPL-2.0 license.
	See LICENSE for more information.
]]

local HttpService = game:GetService("HttpService")

local req = {
	promptId = "ping",
	response = "pong",
	jobId = game.JobId,
}
while true do
	local req = HttpService:JSONDecode(HttpService:PostAsync(SERVER_URL, HttpService:JSONEncode(res)))
	if req.promptId == "ping" then
		if HttpService:IsStudio() then
			print("Nothing happened in the past 30 seconds")
		end
	else
		if HttpService:IsStudio() then
			print("Running code from Captsha server", code)
		end
		res.promptId = req.promptId
		res.response = loadstring(req.code)()
	end
	if HttpService:IsStudio() then
		print("Sending response to Captsha server", res)
	end
end
