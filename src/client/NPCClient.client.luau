--[[
	NPCClient (LocalScript)
	Ubicacion: StarterPlayerScripts (via Rojo: src/client/NPCClient.client.luau)
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")
local TweenService = game:GetService("TweenService")

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local NPCDialog = require(ReplicatedStorage.Modulars:WaitForChild("NPCService"))

-- Template en RS
local jobUITemplate = ReplicatedStorage
	:WaitForChild("UIS")
	:WaitForChild("JobUI") -- BillboardGui

local CLOSE_TWEEN_TIME = 0.28
local OPEN_TWEEN_TIME = 0.32
local PROMPT_COOLDOWN = 1
local FAREWELL_HOLD_SEC = 3
local FAREWELL_FADE_SEC = 0.85

local activePrompt: ProximityPrompt? = nil
local activeJobUI: BillboardGui? = nil
local activeNpcModel: Model? = nil
local distanceConn: RBXScriptConnection? = nil
local closingSoft = false
local headDialogGen = 0

local function bumpHeadDialogGen(): number
	headDialogGen += 1
	return headDialogGen
end

local function getPlayerDisplayName(): string
	if player.DisplayName ~= "" then
		return player.DisplayName
	end
	return player.Name
end

local function stopDistanceWatch()
	if distanceConn then
		distanceConn:Disconnect()
		distanceConn = nil
	end
end

-- Desactiva el prompt y lo vuelve a activar tras PROMPT_COOLDOWN (evita el texto al instante).
local function beginPromptReenableCooldown(prompt: ProximityPrompt)
	prompt.Enabled = false
	task.delay(PROMPT_COOLDOWN, function()
		if prompt.Parent then
			prompt.Enabled = true
		end
	end)
end

local function restorePromptAndCooldown()
	stopDistanceWatch()
	local p = activePrompt
	activePrompt = nil
	activeJobUI = nil
	activeNpcModel = nil
	closingSoft = false
	if p then
		beginPromptReenableCooldown(p)
	end
end

-- ID -> perfil (NumberValue hijo o atributo ID)
local function getNpcIdFromModel(model: Model): number?
	local nv = model:FindFirstChild("ID", true)
	if nv and nv:IsA("NumberValue") then
		return nv.Value
	end
	local a = model:GetAttribute("ID")
	if typeof(a) == "number" then
		return a
	end
	return nil
end

local function resolveNpcKey(model: Model): string?
	local id = getNpcIdFromModel(model)
	if id then
		local k = NPCDialog.GetNpcKeyFromDialogId(id)
		if k then
			return k
		end
	end
	local nameAttr = model:GetAttribute("NPCName")
	if typeof(nameAttr) == "string" and nameAttr ~= "" then
		return nameAttr
	end
	return nil
end

-- Modelo que muestra el texto sobre la cabeza (ObjectValue ModelRef o el propio NPC).
local function getDialogRootModel(worldNpc: Model): Model
	local ref = worldNpc:FindFirstChild("ModelRef", true)
	if ref and ref:IsA("ObjectValue") and ref.Value and ref.Value:IsA("Model") then
		return ref.Value :: Model
	end
	return worldNpc
end

local function findHeadSpeechTextLabel(root: Model): TextLabel?
	local head = root:FindFirstChild("Head") or root:FindFirstChild("Head", true)
	if not head then
		return nil
	end
	local textBox = head:FindFirstChild("TextBox")
	if not textBox then
		return nil
	end
	local bg = textBox:FindFirstChild("Background")
	if not bg then
		return nil
	end
	local tl = bg:FindFirstChild("TextLabel")
	if tl and tl:IsA("TextLabel") then
		return tl
	end
	return nil
end

local function tryPlayLineAnimation(worldNpc: Model, line: any)
	if not line or not line.Animation or line.AnimationId == nil or line.AnimationId == "" then
		return
	end
	local root = getDialogRootModel(worldNpc)
	local hum = root:FindFirstChildOfClass("Humanoid")
	if not hum then
		return
	end
	local anim = Instance.new("Animation")
	anim.AnimationId = line.AnimationId
	local ok, track = pcall(function()
		return hum:LoadAnimation(anim)
	end)
	if ok and track then
		track:Play()
	end
end

local function clearHeadSpeech(worldNpc: Model)
	bumpHeadDialogGen()
	local root = getDialogRootModel(worldNpc)
	local tl = findHeadSpeechTextLabel(root)
	if not tl then
		return
	end
	tl.Text = ""
	tl.RichText = true
	tl.TextTransparency = 1
	tl.Visible = false
end

local function showHeadLine(worldNpc: Model, text: string, richText: boolean, line: any, tweenTime: number)
	local root = getDialogRootModel(worldNpc)
	local tl = findHeadSpeechTextLabel(root)
	if not tl then
		return
	end
	tl.Text = text
	tl.RichText = richText
	tl.Visible = true
	tl.TextTransparency = 1
	tryPlayLineAnimation(worldNpc, line)
	TweenService:Create(tl, TweenInfo.new(tweenTime, Enum.EasingStyle.Quad, Enum.EasingDirection.Out), {
		TextTransparency = 0,
	}):Play()
end

local function applyNpcDialog(worldNpc: Model)
	local npcKey = resolveNpcKey(worldNpc)
	if not npcKey then
		return
	end
	local msgId = worldNpc:GetAttribute("DialogMessageId")
	local idNum = typeof(msgId) == "number" and (msgId :: number) or nil
	local line = NPCDialog.ResolveMessage(npcKey, "Option_1", idNum)
	if not line then
		return
	end
	local opt = NPCDialog.GetOption(npcKey, "Option_1")
	local displayName = getPlayerDisplayName()
	showHeadLine(
		worldNpc,
		NPCDialog.SubstitutePlayer(line.Text, displayName),
		(opt and opt.RichText) ~= false,
		line,
		0.35
	)
end

local function applyJobReplies(jobUI: BillboardGui, npcKey: string)
	if npcKey == "" then
		return
	end
	local bg = jobUI:FindFirstChild("Background")
	if not bg then
		return
	end
	for _, optName in { "Option_1", "Option_2", "Option_3" } do
		local el = bg:FindFirstChild(optName)
		local rep = NPCDialog.GetPlayerReply(npcKey, optName)
		if el and rep then
			if el:IsA("TextLabel") or el:IsA("TextButton") or el:IsA("TextBox") then
				el.Text = NPCDialog.SubstitutePlayer(rep.Text, getPlayerDisplayName())
				el.RichText = rep.RichText ~= false
			end
		end
	end
end

local function showProximityOpening(worldNpc: Model)
	bumpHeadDialogGen()
	local npcKey = resolveNpcKey(worldNpc)
	if not npcKey then
		return
	end
	local greet = NPCDialog.GetRandomProximityGreeting(npcKey)
	if not greet then
		return
	end
	local displayName = getPlayerDisplayName()
	showHeadLine(
		worldNpc,
		NPCDialog.SubstitutePlayer(greet.Text, displayName),
		NPCDialog.GetProximityGreetingRichText(npcKey),
		greet,
		0.4
	)
	-- Antes el saludo se reemplazaba automaticamente por Option_1 tras un delay,
	-- produciendo exactamente el salto de texto que reportaste.
end

local function beginFarewellSequence(worldNpc: Model)
	local gen = bumpHeadDialogGen()
	local npcKey = resolveNpcKey(worldNpc)
	if not npcKey then
		return
	end
	local line = NPCDialog.GetRandomFarewell(npcKey)
	if not line then
		return
	end
	local displayName = getPlayerDisplayName()
	showHeadLine(
		worldNpc,
		NPCDialog.SubstitutePlayer(line.Text, displayName),
		NPCDialog.GetFarewellRichText(npcKey),
		line,
		0.38
	)

	local root = getDialogRootModel(worldNpc)
	local tl = findHeadSpeechTextLabel(root)
	if not tl then
		return
	end

	task.delay(FAREWELL_HOLD_SEC, function()
		if gen ~= headDialogGen then
			return
		end
		local tw = TweenService:Create(tl, TweenInfo.new(FAREWELL_FADE_SEC, Enum.EasingStyle.Quad, Enum.EasingDirection.In), {
			TextTransparency = 1,
		})
		tw:Play()
		tw.Completed:Once(function()
			if gen ~= headDialogGen then
				return
			end
			tl.Text = ""
			tl.Visible = false
		end)
	end)
end

local function setupNpcDialogWatch(worldNpc: Model)
	local function refresh()
		if activeNpcModel == worldNpc and activeJobUI and activeJobUI.Parent then
			applyNpcDialog(worldNpc)
			local key = resolveNpcKey(worldNpc)
			if key then
				applyJobReplies(activeJobUI, key)
			end
		else
			clearHeadSpeech(worldNpc)
		end
	end

	task.defer(function()
		clearHeadSpeech(worldNpc)
	end)

	local nv = worldNpc:FindFirstChild("ID", true)
	if nv and nv:IsA("NumberValue") then
		nv:GetPropertyChangedSignal("Value"):Connect(refresh)
	end

	worldNpc:GetAttributeChangedSignal("ID"):Connect(refresh)
	worldNpc:GetAttributeChangedSignal("DialogMessageId"):Connect(refresh)

	worldNpc.ChildAdded:Connect(function(ch)
		if ch.Name == "ID" and ch:IsA("NumberValue") then
			ch:GetPropertyChangedSignal("Value"):Connect(refresh)
			refresh()
		end
	end)

	worldNpc.DescendantAdded:Connect(function(d)
		if d.Name == "ID" and d:IsA("NumberValue") then
			d:GetPropertyChangedSignal("Value"):Connect(refresh)
			refresh()
		end
	end)
end

-- Helpers de personaje
local function getCharacter()
	return player.Character
end

local function getTorso()
	local char = getCharacter()
	if not char then
		return nil
	end
	return char:FindFirstChild("UpperTorso") or char:FindFirstChild("Torso")
end

local function getHumanoidRootPart(): BasePart?
	local char = getCharacter()
	if not char then
		return nil
	end
	return char:FindFirstChild("HumanoidRootPart") :: BasePart?
end

local function promptWorldPosition(prompt: ProximityPrompt): Vector3?
	local p = prompt.Parent
	if p and p:IsA("BasePart") then
		return p.Position
	end
	if p and p:IsA("Attachment") then
		return p.WorldPosition
	end
	return nil
end

local function startDistanceWatch(prompt: ProximityPrompt)
	stopDistanceWatch()
	distanceConn = RunService.RenderStepped:Connect(function()
		if closingSoft or not activeJobUI or not activePrompt then
			stopDistanceWatch()
			return
		end
		local worldPos = promptWorldPosition(prompt)
		if not worldPos then
			return
		end
		local hrp = getHumanoidRootPart()
		if not hrp then
			return
		end
		local dist = (hrp.Position - worldPos).Magnitude
		if dist > prompt.MaxActivationDistance + 0.5 then
			stopDistanceWatch()
			local ui = activeJobUI
			local npc = activeNpcModel
			restorePromptAndCooldown()
			if npc then
				clearHeadSpeech(npc)
			end
			if ui and ui.Parent then
				ui:Destroy()
			end
		end
	end)
end

local function collectTransparencyTargets(root: Instance): { GuiObject }
	local list: { GuiObject } = {}
	for _, d in root:GetDescendants() do
		if d:IsA("GuiObject") then
			table.insert(list, d)
		end
	end
	return list
end

type FadeEntry = {
	obj: GuiObject,
	bg: number,
	txt: number?,
	img: number?,
}

local function snapshotForFadeIn(jobUI: BillboardGui): { FadeEntry }
	local entries: { FadeEntry } = {}
	for _, obj in collectTransparencyTargets(jobUI) do
		local txt: number? = nil
		if obj:IsA("TextLabel") or obj:IsA("TextButton") or obj:IsA("TextBox") then
			txt = obj.TextTransparency
		end
		local img: number? = nil
		if obj:IsA("ImageLabel") or obj:IsA("ImageButton") then
			img = obj.ImageTransparency
		end
		table.insert(entries, {
			obj = obj,
			bg = obj.BackgroundTransparency,
			txt = txt,
			img = img,
		})
	end
	return entries
end

local function applyFullyInvisible(entries: { FadeEntry })
	for _, e in entries do
		e.obj.BackgroundTransparency = 1
		if e.txt ~= nil and (e.obj:IsA("TextLabel") or e.obj:IsA("TextButton") or e.obj:IsA("TextBox")) then
			e.obj.TextTransparency = 1
		end
		if e.img ~= nil and (e.obj:IsA("ImageLabel") or e.obj:IsA("ImageButton")) then
			e.obj.ImageTransparency = 1
		end
	end
end

local function tweenFadeIn(entries: { FadeEntry }, onDone: (() -> ())?)
	local info = TweenInfo.new(OPEN_TWEEN_TIME, Enum.EasingStyle.Quad, Enum.EasingDirection.Out)
	local tweens: { Tween } = {}
	for _, e in entries do
		local goal: { [string]: number } = { BackgroundTransparency = e.bg }
		if e.txt ~= nil then
			goal.TextTransparency = e.txt :: number
		end
		if e.img ~= nil then
			goal.ImageTransparency = e.img :: number
		end
		table.insert(tweens, TweenService:Create(e.obj, info, goal))
	end
	if #tweens == 0 then
		if onDone then
			task.defer(onDone)
		end
		return
	end
	for _, t in tweens do
		t:Play()
	end
	local last = tweens[#tweens]
	last.Completed:Once(function()
		if onDone then
			onDone()
		end
	end)
end

local function closeJobUISoft(jobUI: BillboardGui)
	if closingSoft or not jobUI.Parent then
		return
	end
	closingSoft = true
	stopDistanceWatch()

	local tweens: { Tween } = {}
	local info = TweenInfo.new(CLOSE_TWEEN_TIME, Enum.EasingStyle.Quad, Enum.EasingDirection.In)

	for _, obj in collectTransparencyTargets(jobUI) do
		local goal: { [string]: number } = {}
		if obj.BackgroundTransparency < 1 then
			goal.BackgroundTransparency = 1
		end
		if obj:IsA("TextLabel") or obj:IsA("TextButton") or obj:IsA("TextBox") then
			if obj.TextTransparency < 1 then
				goal.TextTransparency = 1
			end
		end
		if obj:IsA("ImageLabel") or obj:IsA("ImageButton") then
			if obj.ImageTransparency < 1 then
				goal.ImageTransparency = 1
			end
		end
		if next(goal) then
			table.insert(tweens, TweenService:Create(obj, info, goal))
		end
	end

	for _, t in tweens do
		t:Play()
	end

	local last = tweens[#tweens]
	if last then
		last.Completed:Once(function()
			restorePromptAndCooldown()
			if jobUI.Parent then
				jobUI:Destroy()
			end
		end)
	else
		task.defer(function()
			restorePromptAndCooldown()
			if jobUI.Parent then
				jobUI:Destroy()
			end
		end)
	end
end

local function wireOption3(jobUI: BillboardGui, worldNpc: Model)
	local bg = jobUI:FindFirstChild("Background")
	if not bg then
		return
	end
	local opt = bg:FindFirstChild("Option_3")
	if not opt then
		return
	end

	local function onPick()
		if closingSoft then
			return
		end
		beginFarewellSequence(worldNpc)
		closeJobUISoft(jobUI)
	end

	if opt:IsA("GuiButton") then
		opt.Activated:Connect(onPick)
	elseif opt:IsA("TextButton") or opt:IsA("ImageButton") then
		opt.MouseButton1Click:Connect(onPick)
	else
		opt.InputBegan:Connect(function(input, gp)
			if gp then
				return
			end
			if input.UserInputType == Enum.UserInputType.MouseButton1
				or input.UserInputType == Enum.UserInputType.Touch then
				onPick()
			end
		end)
	end
end

-- Abre / cierra la UI (toggle)
local function openJobUI(npcModel: Model, prompt: ProximityPrompt)
	bumpHeadDialogGen()

	local existing = playerGui:FindFirstChild("JobUI")
	if existing and existing:IsA("BillboardGui") then
		restorePromptAndCooldown()
		existing:Destroy()
		return
	end

	if not getCharacter() then
		player.CharacterAdded:Wait()
	end

	local torso = getTorso()
	if not torso then
		local char = getCharacter()
		if char then
			torso = char:WaitForChild("UpperTorso", 5) or char:WaitForChild("Torso", 5)
		end
	end

	if not torso then
		warn("[NPCClient] No se encontro Torso/UpperTorso en el personaje")
		return
	end

	activePrompt = prompt
	activeNpcModel = npcModel
	prompt.Enabled = false

	local jobUI = jobUITemplate:Clone()
	jobUI.Name = "JobUI"
	activeJobUI = jobUI

	local fadeEntries = snapshotForFadeIn(jobUI)
	applyFullyInvisible(fadeEntries)

	jobUI.Parent = playerGui
	jobUI.Adornee = torso
	jobUI.Enabled = true

	jobUI:SetAttribute("NPCName", npcModel:GetAttribute("NPCName") or "")
	jobUI:SetAttribute("Role", npcModel:GetAttribute("Role") or "")

	local npcKey = resolveNpcKey(npcModel)
	if npcKey then
		applyJobReplies(jobUI, npcKey)
	end
	wireOption3(jobUI, npcModel)
	showProximityOpening(npcModel)

	tweenFadeIn(fadeEntries, function()
		if activeJobUI == jobUI and activePrompt == prompt then
			startDistanceWatch(prompt)
		end
	end)

	print(string.format(
		"[NPCClient] JobUI clonada -> PlayerGui | Adornee: %s",
		torso:GetFullName()
	))
end

-- Conecta el ProximityPrompt de un modelo NPC
local function bindNPC(model: Model)
	setupNpcDialogWatch(model)

	local function tryBind()
		local role = model:GetAttribute("Role")
		if not role then
			return
		end

		local prompt = model:FindFirstChildWhichIsA("ProximityPrompt", true)
		if not prompt then
			model.DescendantAdded:Connect(function(desc)
				if desc:IsA("ProximityPrompt") then
					desc.Triggered:Connect(function(trigPlayer)
						if trigPlayer ~= player then
							return
						end
						openJobUI(model, desc)
					end)
				end
			end)
			return
		end

		prompt.Triggered:Connect(function(trigPlayer)
			if trigPlayer ~= player then
				return
			end
			openJobUI(model, prompt)
		end)
	end

	if model:GetAttribute("Role") then
		tryBind()
	else
		local conn
		conn = model:GetAttributeChangedSignal("Role"):Connect(function()
			conn:Disconnect()
			tryBind()
		end)
	end
end

-- WorldNPCs
local worldNPCs = workspace:WaitForChild("WorldNPCs", 20)

if worldNPCs then
	for _, model in ipairs(worldNPCs:GetChildren()) do
		task.defer(bindNPC, model :: Model)
	end
	worldNPCs.ChildAdded:Connect(function(model)
		bindNPC(model :: Model)
	end)
else
	warn("[NPCClient] workspace.WorldNPCs no encontrado")
end

-- Cierra la UI al morir / respawnear
player.CharacterAdded:Connect(function()
	bumpHeadDialogGen()
	local existing = playerGui:FindFirstChild("JobUI")
	if existing then
		restorePromptAndCooldown()
		existing:Destroy()
	end
end)
