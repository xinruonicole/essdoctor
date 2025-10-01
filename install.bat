@echo off
echo 正在安装项目依赖...

:: 使用cmd执行npm install，避免PowerShell执行策略限制
cmd /c "npm install"

if %errorlevel% equ 0 (
    echo 依赖安装成功！
    echo.
    echo 启动开发服务器：
    echo npm run dev
) else (
    echo 依赖安装失败，请检查网络连接或手动执行 npm install
    pause
)