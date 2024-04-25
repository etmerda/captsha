local SERVER_URL = "https://americas-practical-illustrated-prepared.trycloudflare.com/" -- Edit this to your Captsha server URL!
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
local RunService = game:GetService("RunService")

local req = {
	promptId = "ping",
	jobId = if RunService:IsStudio() then "Studio" else game.JobId,
}
while true do
	local res = HttpService:JSONDecode(HttpService:PostAsync(SERVER_URL, HttpService:JSONEncode(req)))
	req.promptId = res.promptId
	if res.promptId ~= "ping" then
		local run, syntax_error = loadstring(res.code)
		print(run, syntax_error, typeof(syntax_error))
		if syntax_error then
			req.response = { error = syntax_error }
			continue
		end
		local success, response = pcall(run)
		if success then
			req.response = response
		else
			req.response = { error = response }
		end
	end
	if RunService:IsStudio() then
		print("Sending response to Captsha server", req)
	end
end
