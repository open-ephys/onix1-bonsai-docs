
[CmdletBinding(PositionalBinding=$false)]
param 
(
    [parameter(mandatory=$false)][switch][Alias('c')]$clean,
    [parameter(mandatory=$false)][switch][Alias('d')]$doclinkchecker,
    [parameter(mandatory=$false)][string][Alias('l')]$lychee,
    [parameter(mandatory=$false)][string][Alias('a')]$all
)



# this is called removeartifacts instead of clean because clean might be taken up by another name
function removeartifacts
{
    $deletePaths = '.\workflows\*.svg', '.\api\*.yml', '.\api\.manifest', '.\_site\', '.\_raw\', '.\_view\'
    foreach($deletePath in $deletePaths)
    {    
        if (Test-Path $deletePath) {
            Remove-Item $deletePath -Recurse
        } 
    }
}

function doclinkchecker
{
    .\build.ps1 --logLevel Warning --warningsAsErrors
    dotnet DocLinkChecker -v -f .github/workflows/DocLinkChecker.config
}

function lychee 
{
    param($lycheePath)
    Invoke-Expression "& `"$lycheePath`" --verbose --no-progress --base _site --exclude ^https://github\.com.*merge.* --exclude ^https://github\.com.*apiSpec.* '_site/**/*.html'"
}

if ($clean)
{
    removeartifacts
}

if ($doclinkchecker)
{
    doclinkchecker
}

If ($PSBoundParameters.ContainsKey('lychee'))
{
    lychee($lychee)
}

If ($PSBoundParameters.ContainsKey('all'))
{
    removeartifacts
    doclinkchecker
    lychee($all)
}