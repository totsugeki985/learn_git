#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

preamble := "
(
#EscapeChar \
#SingleInstance
#NoEnv
#Warn
SetWorkingDir %A_ScriptDir%
SetKeyDelay, 0 , 50
SetMouseDelay, 0 , 50


)"


actionsNew2 := "
(
::
keywaitReplacement1
BlockInput, On
Send {q}
keywaitReplacement2
MouseClick, left , screenX, screenY, 2 , 0
Sleep, 50
Send {q}
keywaitReplacement4
stayEquippedCode
BlockInput, Off
return


)"

createMappings( preamble , actionsNew2 )


getKeyWaitReplacement2( key )
{
	replacement =
(
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("%key%") )
{
	continue
}
)
	return replacement

}

getStayEquippedCode( stayEquipped )
{
	if( stayEquipped == "true" )
	{
		return ""
	}
	else
	{
		code := "Send {d}`nSleep,1000`nSend {c}`n" . getKeyWaitReplacement2("c")
		return code
	}
}

createMappings( preamble , actions )
{
	if( !FileExist( "keymap.txt" ) )
	{
		MsgBox, No key_mappings.txt file
		ExitApp
	}

	file := FileOpen( "graal_hotkey.ahk" , "w" )
	file.write( preamble )

	FileRead, content, keymap.txt
	lines := StrSplit( content , "`r`n" )
	toggle := "Tab::`n"
	for index, line in lines
	{
		if( line == "" || SubStr( line , 1 , 1 ) == "#" )
		{
			continue
		}

		mapping := StrSplit( line , "," )
		key := mapping[1]
		xPos := mapping[2]
		yPos := mapping[3]
		stayEquipped := mapping[4]

		; toggle := toggle . "Hotkey," . RegExReplace( key,"`","``",0,1) . ", Toggle`n"
		toggle := toggle . "Hotkey," . key . ", Toggle`n"

		hotkey := StrReplace( StrReplace( key . actions , "screenX", xPos ) , "screenY" , yPos )
		hotkey := StrReplace( hotkey , "keywaitReplacement1" , getKeyWaitReplacement2(key) )
		hotkey := StrReplace( hotkey , "keywaitReplacement2" , getKeyWaitReplacement2("q") )
		hotkey := StrReplace( hotkey , "keywaitReplacement3" , getKeyWaitReplacement2("LButton") )
		hotkey := StrReplace( hotkey , "keywaitReplacement4" , getKeyWaitReplacement2("q") )
		hotkey := StrReplace( hotkey , "stayEquippedCode" , getStayEquippedCode( stayEquipped ) )
		file.write( hotkey )	
	}

	toggle := toggle . "
(
Hotkey, Tab, Off
Send {Tab}
Hotkey, Tab, On
return

)"

	file.write( toggle )
	file.close()	
}