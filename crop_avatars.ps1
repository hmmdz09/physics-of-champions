Add-Type -AssemblyName System.Drawing

function Crop-Face-Exact($imgPath, $outPath, $cx, $cy, $sz) {
    $src = [System.Drawing.Bitmap]::FromFile($imgPath)
    Write-Host "Source: $imgPath, Size: $($src.Width) x $($src.Height)"

    $x0 = [int]($cx - $sz / 2)
    $y0 = [int]($cy - $sz / 2)
    if ($x0 -lt 0) { $x0 = 0 }
    if ($y0 -lt 0) { $y0 = 0 }
    if ($x0 + $sz -gt $src.Width) { $x0 = $src.Width - $sz }
    if ($y0 + $sz -gt $src.Height) { $y0 = $src.Height - $sz }

    $dest = New-Object System.Drawing.Bitmap $sz, $sz, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

    $srcRect = New-Object System.Drawing.Rectangle $x0, $y0, $sz, $sz
    $destRect = New-Object System.Drawing.Rectangle 0, 0, $sz, $sz

    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $src.Dispose()

    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
    Write-Host "Saved square face crop: $outPath ($sz x $sz at $x0, $y0)"
}

# Boy: 455x626. Center face at cx=227, cy=265, size=350
Crop-Face-Exact "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_boy.jpg" "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_boy_face.jpg" 227 265 350

# Girl: 574x740. Center face at cx=287, cy=355, size=450
Crop-Face-Exact "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_girl.jpg" "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_girl_face.jpg" 287 355 450
