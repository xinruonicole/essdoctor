@echo off
echo 启动储能医生开发服务器...

:: 检查node_modules是否存在
if not exist "node_modules" (
    echo 检测到未安装依赖，正在安装...
    call install.bat
)

if exist "node_modules" (
    echo 启动开发服务器...
    cmd /c "npm run dev"
) else (
    echo 依赖安装失败，请先运行 install.bat
    pause
)