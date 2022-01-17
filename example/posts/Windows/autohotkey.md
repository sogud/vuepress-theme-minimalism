---
title: 将Windows快捷键与MacOS同步
tags:
  - Windows
  - MacOS
---
### autohotkey

如果是经常使用Windows和osx系统的人，那么两种系统的不同的快捷键可能处于习惯经常按错，复制粘贴的逻辑不通，虽然可以正确在不通平台「拷贝」与「剪切」，但是 ctrl 与 command 不在一个键位，导致按错位置也是时有发生，
使用vscode等编辑器时各种快捷键映射功能不一样，导致效率上升不了，如果忽略 Win 键盘上的 Ctrl 与 Mac 键盘上的 Command (⌘) 这两键键位不同这一点之外，操作逻辑大体一致，并且 Mac 上 Command (⌘) 组合键的位置更加顺手。AutoHotkey 是 Win 上一款非常强大的脚本工具，可以通过自定义的一个快捷键触发一系列的动作。


那么我们就有两种方案可以选择：
1. 直接改变/对调键盘上 Ctrl 键的映射(个人不建议)
2. 改变快捷键组合的关联
比如你在键盘上按下 Win 键 + C，电脑可以自动识别成 Ctrl + C，但是单独按下 Win 键还是会出现开始菜单，并没有改变其原本独立的功能；

```ahk
;-----------------------------------------
; Mac keyboard to Windows Key Mappings
;=========================================
; --------------------------------------------------------------
; NOTES
; --------------------------------------------------------------
; ! = ALT
; ^ = CTRL
; + = SHIFT
; # = WIN
;
; Debug action snippet: MsgBox You pressed Control-A while Notepad is active.
#InstallKeybdHook
SetTitleMatchMode 2
SendMode Input
; --------------------------------------------------------------
; OS X system shortcuts
; --------------------------------------------------------------
!s::SendInput ^{s}
!a::SendInput ^{a}
!c::SendInput ^{c}
!v::SendInput ^{v}
!x::SendInput ^{x}
!o::SendInput ^{o}
!f::SendInput ^{f}
!z::SendInput ^{z}
!y::SendInput ^{y}
!t::SendInput ^{t}
!w::SendInput ^{w}

```


### 开机自启
把需要开机启动的脚本，放入 “启动” 文件夹即可。

目录：{C:\Users\username\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup}

Tips：
修改脚本后需要重启 AHK，或右键菜单中 “重载脚本”；在设置时注意快捷键不要和系统默认快捷键冲突；编辑脚本时使用英文输入法；因为每运行一个脚本就会在任务栏显示一个图标，使用 ≥ 2 个脚本时，建议将其中内容合并到一个脚本文件中；可以通过 “想实现的功能描述 + ahk” 搜索需要脚本；