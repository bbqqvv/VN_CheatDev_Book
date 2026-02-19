$outputFile = "d:\Workspace\Colab\VN_CheatDev_Book\FULL_BOOK.md"
$root = "d:\Workspace\Colab\VN_CheatDev_Book"

Write-Host "Dang tao sach Full (E-book)..."
$content = "# [VN] CheatDev Book: FULL VERSION`n`n"
$content += "**Generated at:** $(Get-Date)`n`n---`n`n"

# Add README
$readme = Get-Content "$root\README.md" -Raw
$content += $readme + "`n`n---`n`n"

# Add Chapters
$chapters = Get-ChildItem $root -Directory | Sort-Object Name
foreach ($chap in $chapters) {
    $readmePath = "$($chap.FullName)\README.md"
    if (Test-Path $readmePath) {
        Write-Host "Adding Chapter: $($chap.Name)"
        $chapContent = Get-Content $readmePath -Raw
        $content += $chapContent + "`n`n---`n`n"
    }
}

# Add Glossary
if (Test-Path "$root\GLOSSARY.md") {
    Write-Host "Adding Glossary"
    $glossary = Get-Content "$root\GLOSSARY.md" -Raw
    $content += $glossary
}

$content | Out-File $outputFile -Encoding utf8
Write-Host "XONG! File sach nam tai: $outputFile"
