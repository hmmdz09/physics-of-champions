Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\hamdi\.gemini\antigravity-ide\brain\f14e5634-cbb2-4b7b-b8a3-102025c9e443\.user_uploaded\media_1793321783303.png"
$destPath = "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\logo.png"

$src = [System.Drawing.Bitmap]::FromFile($srcPath)

$centerX = 230
$centerY = 516
$r = 142

$dia = $r * 2
$dest = New-Object System.Drawing.Bitmap $dia, $dia, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($dest)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse(0, 0, $dia, $dia)
$g.SetClip($path)

$srcRect = New-Object System.Drawing.Rectangle ($centerX - $r), ($centerY - $r), $dia, $dia
$destRect = New-Object System.Drawing.Rectangle 0, 0, $dia, $dia

$g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$g.Dispose()
$src.Dispose()

$dest.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
$dest.Dispose()

Write-Host "Cropped perfect circle: center (230, 516), radius 142"
