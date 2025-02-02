@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

:: 检查管理员权限

NET SESSION >nul 2>&1
if %errorlevel% neq 0 (
    echo 请求管理员权限...
    powershell -Command "Start-Process '%~dpnx0' -Verb RunAs" >nul
    exit /b
)

:: 设置睡眠倒计时

set /p minutes="请输入多少分钟后睡眠 (默认30分钟): "
if "!minutes!"=="" set minutes=30

@echo 系统将在 !minutes! 分钟后进入睡眠状态。

rem 将分钟转换为秒
set /a seconds=!minutes! * 60

timeout /t !seconds! /nobreak

:: 参数1 0睡眠 1 休眠
:: 参数2 0 不强制执行 1 强制执行 （该参数好像已经无效了？）
:: 参数3 0 允许唤醒 1 不允许唤醒

if errorlevel 1 (
    @echo 睡眠已取消。
) else (
    @echo 正在进入睡眠状态...
    rundll32.exe powrprof.dll,SetSuspendState 0,1,0
)
