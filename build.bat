@echo off
echo 构建储能医生生产版本...

:: 检查node_modules是否存在
if not exist "node_modules" (
    echo 检测到未安装依赖，正在安装...
    call install.bat
)

if exist "node_modules" (
    echo 开始构建...
    cmd /c "npm run build"
    if %errorlevel% equ 0 (
        echo 构建成功！输出文件在 dist 目录
    ) else (
        echo 构建失败，请检查错误信息
    )
) else (
    echo 依赖安装失败，请先运行 install.bat
)

pause