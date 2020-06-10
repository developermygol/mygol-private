@echo off

set OUTPUT=..\..\src\components\pages\Tournaments\Teams\Logo\Templates


set TARGET=svg-to-react-cli\index.js


@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\%TARGET%" %* -o %OUTPUT% dir
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\%TARGET%" %* -o %OUTPUT% dir
)