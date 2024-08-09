# Onix1 Bonsai Docs

Documentation for the Onix1 Bonsai packages.

These docs are built on [docfx](https://dotnet.github.io/docfx/index.html).

## Initialize the Documentation for Building Locally

These actions only need to be performed once when setting up the repo locally.

Download [dotnet](https://dotnet.microsoft.com/en-us/download).

To clone the remote repository into the active directory, run:

`git clone https://github.com/open-ephys/onix1-bonsai-docs`
`cd onix1-bonsai-docs`

To pulls in the latest files from the submodules according to the commit that the submodules point to, run:

`git submodule update --recursive --init`

To configure dotnet, run:

`dotnet tool restore --configfile .\.bonsai\NuGet.config `

In particular, restoring the config file configures docfx version and docfx companion tools such as [DocLinkChecker](https://github.com/Ellerbach/docfx-companion-tools/tree/main/src/DocLinkChecker).

To make the `docfx` command available after restoring the config file from the previous step, run:

`dotnet tool restore`

To set up a local Bonsai environment for automatically exporting SVGs, run: 

`./.bonsai/Setup.cmd`

## Build Documentation Locally

To build the docs and serve locally, run:

`./build.ps1 --serve`

If SVGs are already exported and do not need to be updated, they don't need to be re-exported. In that case, to build the docs and serve locally more quickly, run:

`dotnet docfx --serve`

## Update Submodule

It is best practice to develop docs with the submodule directories containing the latest commits in their respective `main` branches (unless you are intentionally testing local changes to or another branch of the source code, for example). To update all submodules, run:

`git submodule update --recursive --remote`

## Troubleshooting Tips

The template in this repo builds upon the `default` and `modern` templates. It might be helpful to reference those templates. To view those templates, run:

`dotnet docfx template export default modern`

It might be helpful to view the intermediate data models involved in the build process. To view those models, build, and serve the docs locally, run:

`dotnet docfx --exportRawModel --rawModelOutputFolder _raw --exportViewModel --viewModelOutputFolder _view --serve`

Strip the `--serve` option and append `--dryRun` option if you want to export the models without completing the build process and serving.

If local html pages don't appear to be updating, hard refresh website pages in browser. `Ctrl+Shift+R` and `Ctrl+F5` are common hotkeys for hard refreshes. 

If there are discrepancies between local and remote builds:

* Confirm local and remote docfx versions are consistent. This inconsistency can occur when, for example, running `docfx` instead of `dotnet docfx` or running `dotnet tool restore --configfile <configfile>` on another config file other than the one in this repo.

* Clear the local files to remove any cached files that aren't available remotely. Such files exist in the `api` directory (though care to not delete the `.gitignore` in that directory), the `_site` directory, and the workflows directory.

