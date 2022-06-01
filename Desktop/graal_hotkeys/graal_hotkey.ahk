#EscapeChar \
#SingleInstance
#NoEnv
#Warn
SetWorkingDir %A_ScriptDir%
SetKeyDelay, 0 , 50
SetMouseDelay, 0 , 50

`::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("`") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 680, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

1::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("1") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 724, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}

BlockInput, Off
return

2::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("2") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 762, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}

BlockInput, Off
return

3::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("3") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 804, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

!`::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("!`") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 843, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

!1::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("!1") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 884, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

!2::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("!2") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 923, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

!3::
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("!3") )
{
	continue
}
BlockInput, On
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
MouseClick, left , 965, 480, 2 , 0
Sleep, 200
Send {q}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("q") )
{
	continue
}
Send {d}
Sleep,1000
Send {c}
while( GetKeyState("Alt") || GetKeyState("Shift") || GetKeyState("Ctrl") || GetKeyState("c") )
{
	continue
}
BlockInput, Off
return

Tab::
Hotkey,`, Toggle
Hotkey,1, Toggle
Hotkey,2, Toggle
Hotkey,3, Toggle
Hotkey,!`, Toggle
Hotkey,!1, Toggle
Hotkey,!2, Toggle
Hotkey,!3, Toggle
Hotkey, Tab, Off
Send {Tab}
Hotkey, Tab, On
return
