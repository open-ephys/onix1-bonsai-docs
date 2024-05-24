# Build project
$libPath = ".\src\onix-refactor\OpenEphys.Onix\"
dotnet build $libPath --configuration Release

# Export workflow vectors
$libPath = Join-Path $libPath "OpenEphys.Onix\bin\x64\Release\net472"
.\docfx-tools\modules\Export-Image.ps1 -bootstrapperPath .\.bonsai\Bonsai.exe $libPath
dotnet docfx @args