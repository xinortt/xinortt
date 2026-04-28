--[[
	NPCService (ModuleScript) — ReplicatedStorage.Modulars
	Client-only dialog copy, RichText, optional per-line animation metadata.

	Placeholders in any Text string:
	  [Player], [PlayerName], [PlayerUsername] -> replaced with the local player's display name (client).

	NPCClient uses:
	  - ProximityGreetings: shown when ProximityPrompt opens (no NPC name; player-focused).
	  - NPCS[key].Option_1.Messages: main pitch lines (may include NPC name).
	  - FarewellMessages: head text when player picks Option_3 (goodbye), then client tweens out.
	  - PlayerReplies: JobUI option labels only.
]]

export type MessageEntry = {
	Id: number?,
	Text: string,
	-- When true, NPCClient may play AnimationId on the dialog model's Humanoid (stub until you add real ids).
	Animation: boolean?,
	AnimationId: string?,
}

export type DialogOption = {
	RichText: boolean?,
	Messages: { MessageEntry }?,
}

export type GreetingPack = {
	RichText: boolean?,
	Messages: { MessageEntry }?,
}

export type PlayerReplyLine = {
	RichText: boolean?,
	Text: string,
}

export type NPCProfile = {
	[string]: DialogOption | PlayerReplyLine?,
}

export type DialogIdInfo = {
	Key: string,
	RoleHint: string,
}

local NPCService = {}

NPCService.ByDialogId = {
	[1] = { Key = "Merry", RoleHint = "JobGiver" },
} :: { [number]: DialogIdInfo }

function NPCService.GetNpcKeyFromDialogId(id: number): string?
	local row = NPCService.ByDialogId[id]
	return row and row.Key or nil
end

function NPCService.GetDialogIdInfo(id: number): DialogIdInfo?
	return NPCService.ByDialogId[id]
end

local C_HI = "#7EC8E3"
local C_BODY = "#E8E8E8"
local C_NAME = "#5EC8FF"
local C_A = "#7EC8E3"
local C_B = "#E88A7A"
local C_C = "#C4A7E7"
local C_MISSION = "#FFD966"
local C_BYE = "#FFB86C"

-- Replace player placeholders (call from client with local Player).
function NPCService.SubstitutePlayer(text: string, displayName: string): string
	return text
		:gsub("%[Player%]", displayName)
		:gsub("%[PlayerName%]", displayName)
		:gsub("%[PlayerUsername%]", displayName)
end

-- Lines shown right after ProximityPrompt (no "Merry" / NPC name - greeting to the player only).
NPCService.ProximityGreetings = {
	Merry = {
		RichText = true,
		Messages = {
			{ Id = 1, Text = string.format(
				'<font color="%s">Hey [Player]!</font> <font color="%s">Good to see you - need anything today?</font>',
				C_HI, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 2, Text = string.format(
				'<font color="%s">Oh, hi [Player]!</font> <font color="%s">You caught me in a good mood.</font>',
				C_HI, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 3, Text = string.format(
				'<font color="%s">Hey there, [Player]!</font> <font color="%s">Want to chat for a second?</font>',
				C_HI, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 4, Text = string.format(
				'<font color="%s">Hi [Player]!</font> <font color="%s">Welcome back - what brings you here?</font>',
				C_HI, C_BODY), Animation = false, AnimationId = "" },
		},
	},
} :: { [string]: GreetingPack }

function NPCService.GetRandomProximityGreeting(npcKey: string): MessageEntry?
	local pack = NPCService.ProximityGreetings[npcKey]
	if not pack or not pack.Messages or #pack.Messages == 0 then
		return nil
	end
	return pack.Messages[math.random(1, #pack.Messages)]
end

function NPCService.GetProximityGreetingRichText(npcKey: string): boolean
	local pack = NPCService.ProximityGreetings[npcKey]
	return (pack and pack.RichText) ~= false
end

-- Head textbox when player leaves via Option_3 (English, player name).
NPCService.FarewellMessages = {
	Merry = {
		RichText = true,
		Messages = {
			{ Id = 1, Text = string.format(
				'<font color="%s">Bye, [Player]!</font> <font color="%s">Come back anytime.</font>',
				C_BYE, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 2, Text = string.format(
				'<font color="%s">See you, [Player]!</font> <font color="%s">Stay safe out there.</font>',
				C_BYE, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 3, Text = string.format(
				'<font color="%s">Take care, [Player]!</font> <font color="%s">I\'ll be here if you need me.</font>',
				C_BYE, C_BODY), Animation = false, AnimationId = "" },
			{ Id = 4, Text = string.format(
				'<font color="%s">Later, [Player]!</font> <font color="%s">Thanks for stopping by.</font>',
				C_BYE, C_BODY), Animation = false, AnimationId = "" },
		},
	},
} :: { [string]: DialogOption }

function NPCService.GetRandomFarewell(npcKey: string): MessageEntry?
	local pack = NPCService.FarewellMessages[npcKey]
	if not pack or not pack.Messages or #pack.Messages == 0 then
		return nil
	end
	return pack.Messages[math.random(1, #pack.Messages)]
end

function NPCService.GetFarewellRichText(npcKey: string): boolean
	local pack = NPCService.FarewellMessages[npcKey]
	return (pack and pack.RichText) ~= false
end

NPCService.NPCS = {
	Merry = {
		Option_1 = {
			RichText = true,
			Messages = {
				{ Id = 1, Text = string.format(
					'<font color="%s">Hi, I\'m Merry!</font> <font color="%s">Need a <font color="%s">[Mission]</font> today?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
				{ Id = 2, Text = string.format(
					'<font color="%s">Heya!</font> <font color="%s">I\'m <b>Merry</b> - got a minute for a <font color="%s">[Mission]</font>?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
				{ Id = 3, Text = string.format(
					'<font color="%s">Merry here!</font> <font color="%s">You look busy... still want a <font color="%s">[Mission]</font>?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
				{ Id = 4, Text = string.format(
					'<font color="%s">Oh!</font> <font color="%s">It\'s <b>Merry</b>. Fancy a silly little <font color="%s">[Mission]</font>?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
				{ Id = 5, Text = string.format(
					'<font color="%s">Hi hi~</font> <font color="%s">Merry\'s the name. Want me to toss you a <font color="%s">[Mission]</font>?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
				{ Id = 6, Text = string.format(
					'<font color="%s">Yo!</font> <font color="%s"><b>Merry</b> reporting in. <font color="%s">[Mission]</font> on your mind?</font>',
					C_NAME, C_BODY, C_MISSION), Animation = false, AnimationId = "" },
			},
		},
	},
} :: { [string]: NPCProfile }

NPCService.PlayerReplies = {
	Merry = {
		Option_1 = {
			RichText = true,
			Text = string.format(
				'<font color="%s">A:</font> <font color="%s">Hi... um, could you give me a <font color="%s">[Mission]</font>?</font>',
				C_A, C_BODY, C_MISSION),
		},
		Option_2 = {
			RichText = true,
			Text = string.format(
				'<font color="%s">B:</font> <font color="%s">Maybe later - got something else in mind?</font>',
				C_B, C_BODY),
		},
		Option_3 = {
			RichText = true,
			Text = string.format(
				'<font color="%s">C:</font> <font color="%s">I\'ll pass for now. See you around!</font>',
				C_C, C_BODY),
		},
	},
} :: { [string]: { [string]: PlayerReplyLine } }

function NPCService.GetProfile(npcName: string): NPCProfile?
	return NPCService.NPCS[npcName]
end

function NPCService.GetOption(npcName: string, optionKey: string): DialogOption?
	local profile = NPCService.GetProfile(npcName)
	if not profile then
		return nil
	end
	local v = profile[optionKey]
	if typeof(v) == "table" and (v :: any).Messages then
		return v :: DialogOption
	end
	return nil
end

function NPCService.GetMessages(npcName: string, optionKey: string): { MessageEntry }?
	local opt = NPCService.GetOption(npcName, optionKey)
	if not opt or not opt.Messages then
		return nil
	end
	return opt.Messages
end

function NPCService.GetMessageById(npcName: string, optionKey: string, messageId: number): MessageEntry?
	local messages = NPCService.GetMessages(npcName, optionKey)
	if not messages then
		return nil
	end
	for _, entry in messages do
		if entry.Id == messageId then
			return entry
		end
	end
	return nil
end

function NPCService.GetRandomMessage(npcName: string, optionKey: string): MessageEntry?
	local messages = NPCService.GetMessages(npcName, optionKey)
	if not messages or #messages == 0 then
		return nil
	end
	return messages[math.random(1, #messages)]
end

function NPCService.ResolveMessage(npcName: string, optionKey: string, idOrNil: number?): MessageEntry?
	if typeof(idOrNil) == "number" then
		local byId = NPCService.GetMessageById(npcName, optionKey, idOrNil :: number)
		if byId then
			return byId
		end
	end
	return NPCService.GetRandomMessage(npcName, optionKey)
end

function NPCService.GetPlayerReply(npcKey: string, optionKey: string): PlayerReplyLine?
	local block = NPCService.PlayerReplies[npcKey]
	if not block then
		return nil
	end
	return block[optionKey]
end

return NPCService
