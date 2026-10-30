Add-Type -AssemblyName System.Drawing

function Create-Full-Avatar($imgPath, $outPath, $targetSize, $scaleFactor, $yOffset) {
    $src = [System.Drawing.Bitmap]::FromFile($imgPath)
    Write-Host "Source: $imgPath, Size: $($src.Width) x $($src.Height)"

    # Create destination square
    $dest = New-Object System.Drawing.Bitmap $targetSize, $targetSize, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($dest)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Clean white background matching the character art
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillRectangle($brush, 0, 0, $targetSize, $targetSize)
    $brush.Dispose()

    # Scale the character so head, hair, and shoulders fit completely within a circle
    $drawW = [int]($src.Width * $scaleFactor)
    $drawH = [int]($src.Height * $scaleFactor)

    # Center horizontally
    $destX = [int](($targetSize - $drawW) / 2)
    # Position vertically with slight offset to balance hair and chest
    $destY = [int]($yOffset)

    $srcRect = New-Object System.Drawing.Rectangle 0, 0, $src.Width, $src.Height
    $destRect = New-Object System.Drawing.Rectangle $destX, $destY, $drawW, $drawH

    $g.DrawImage($src, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $g.Dispose()
    $src.Dispose()

    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $dest.Dispose()
    Write-Host "Saved FULL Avatar: $outPath ($targetSize x $targetSize)"
}

# Boy: 455 x 626. In a 500x500 square, scale=0.72 -> 327 x 450, destX=86, destY=35
# This ensures top of hair (y=35+25=60) has plenty of room, ears have 90px on each side,
# and hoodie curves out at the bottom of the circle!
Create-Full-Avatar "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_boy.jpg" "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_boy_full.jpg" 500 0.72 35

# Girl: 574 x 740. In a 600x600 square, scale=0.74 -> 424 x 547, destX=88, destY=30
# This ensures the entire voluminous hairstyle, face, and floral shoulders fit completely!
Create-Full-Avatar "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_girl.jpg" "C:\Users\hamdi\.gemini\antigravity-ide\scratch\poc\avatar_girl_full.jpg" 600 0.74 30
