> [!IMPORTANT] 
> These docs (including this README.md) are a work-in-progress. If you run into any obstacles developing these docs, or if there is any obfuscated, inaccurate, or missing content, please raise awareness by submitting an issue. Thanks!

# Onix1 Bonsai Docs

Documentation for the [Onix1 Bonsai package](https://github.com/open-ephys/onix-bonsai-onix1).

These docs are built using [docfx](https://dotnet.github.io/docfx/index.html).

## Initialize the local Onix1 Bonsai Repository for Building Locally

These actions only need to be performed once when setting up the repo locally.

Download and install [dotnet](https://dotnet.microsoft.com/en-us/download).

> [!NOTE]  
> The `docfx` program provides very little feedback about its state on the command line.
> Often it will appear to hang because it does not output any status information.
> Usually, the command will eventually return.

1. Clone the source code repository and navigate into its top level directory:
   
    ``` console
    git clone https://github.com/open-ephys/onix-bonsai-onix1
    cd onix-bonsai-onix1
    ```
1. Clone the documentation repository into the source code repository:

    ``` console
    git clone https://github.com/open-ephys/onix1-bonsai-docs
    cd onix1-bonsai-docs
    ```
1. Pull in the latest files from the submodules according to the commit that the submodules point to:

    ``` console
    git submodule update --recursive --init
    ```
1. Configure the docfx version and restore docfx companion tools such as [DocLinkChecker](https://github.com/Ellerbach/docfx-companion-tools/tree/main/src/DocLinkChecker).

    ``` console
    dotnet tool restore --configfile ../.bonsai/NuGet.config
    ```
1. To make the `docfx` command available after restoring the config file from the previous step, run:

    ``` console
    dotnet tool restore
    ```
1. Set up a local Bonsai environment for automatically exporting SVGs, run: 

    ``` console
    ./bonsai/Setup.cmd
    ```

## Build Documentation Locally

> [!NOTE]  
> The following steps should be be performed in Powershell.

To build the docs and serve locally, run:

``` console
./build.ps1 --serve
```

If SVGs are already exported and do not need to be updated, they don't need to be re-exported. In that case, to build the docs and serve locally more quickly, run:

``` console
dotnet docfx --serve
```

## Update Submodules

It is best practice to develop docs with the submodule directories containing the latest commits in their respective `main` branches (unless you are intentionally testing local changes to or another branch of the source code, for example). To update all submodules, run:

``` console
git submodule update --recursive --remote
```

## Before Pushing

The following three commands are run remotely by remote GitHub Actions serve upon pushing to a branch. The branch will not be able to merge to main unless all three commands completely successfully without any errors. Confirm that that they can complete successfully without errors locally before committing and pushing. Otherwise, the branch becomes cluttered with potentially several attempts to pass the link-check process. Run: 

``` console
.\build.ps1 --logLevel Warning --warningsAsErrors
dotnet DocLinkChecker -v -f .github/workflows/DocLinkChecker.config
```

If the above command fails because "you must install or update .NET", follow the URL from the failed command's output or [this one](https://dotnet.microsoft.com/en-us/download/dotnet/6.0/runtime?cid=getdotnetcore&os=windows&arch=x64) to download and install .NET runtime 6. Dotnet supports simultaneous installation of several .NET runtime versions, and version 6 is required to run the DocLinkChecker.

To run the next command, install [Lychee](https://github.com/lycheeverse/lychee?tab=readme-ov-file) by following [these instructions](https://github.com/lycheeverse/lychee?tab=readme-ov-file#installation). If you are use Windows and download a Lychee executable, amend the below command according to the location and version of your Lychee executable, and run it.

``` console
<lychee/installation/directory>/lychee-v<x.xx.x>-windows-x86_64.exe --verbose --no-progress --base _site --exclude ^https://github\.com.*merge.* --exclude ^https://github\.com.*apiSpec.* '_site/**/*.html'
```

If you use a different operating systems and a different methods of installation, the above command might require additional amendments. 

## `dotnet docfx`

Running `dotnet docfx` runs both the `dotnet docfx metadata` command and the `dotnet docfx build` command in that order. Unless specified otherwise, `dotnet docfx` uses the `docfx.json` as its config file.

### metadata

The metadata command generates a .yml files containing metadata from the source code. These files contains information about class members, class inheritance, enum fields, etc. and \<xml\> comments from the source code. The input files for the `metadata` command are specified in metadata.src of the `docfx.json` file, and the output directory of the `metadata` command is specified in metadata.dest of the `docfx.json` file. 

### build

The build command generates additional data models from the .yml files generated by the `metadata` command and uses them to populate a template with data. 

The build process involves multiple steps.

1. Generates the raw data model
1. Uses template to generate view data model from the raw data model. To see the raw model, refer to the relevant command in the [Troubleshoot](#troubleshoot) section of this README.md. 
1. Uses template to populate pages with data from the view data model. To see the view models, refer to the relevant command in the [Troubleshoot](#troubleshoot) section of this README.md.

The user can hook into and modify the build process at steps 2 and 3 by editing the template. 

All of the files involved in defining the template are specified in the build.template of the `docfx.json` file. The order in which the templates are defined matters. If the templates contain files with conflicting names, the template specified later overrides the template specified earlier with its conflicting file(s). This is helpful because it enables building custom templates on top of other templates. To see the docfx `default` and `modern` templates, refer to the relevant command in the [Troubleshoot](#troubleshoot) section of this README.md. 

The input files for the `build` command are specified in build.content of the `docfx.json` file, and the output directory of the `build` command is specified in build.output of the `docfx.json` file. 

## Troubleshooting

The template in this repo builds upon the `default` and `modern` templates built into docfx. It might be helpful to reference those templates. To view them, run:

``` console
dotnet docfx template export default modern
```

It might be helpful to view the intermediate data models involved in the build process. To view those models, build, and serve the docs locally, run:

``` console
dotnet docfx --exportRawModel --rawModelOutputFolder _raw --exportViewModel --viewModelOutputFolder _view --serve
```

Strip the `--serve` option and append `--dryRun` option if you want to export the models without completing the build process and serving.

If local html pages don't appear to be updating, hard refresh website pages in browser. `Ctrl+Shift+R` and `Ctrl+F5` are common hotkeys for hard refreshes. 

If there are discrepancies between local and remote builds:

* Confirm local and remote docfx versions are consistent. This inconsistency can occur when, for example, running `docfx` instead of `dotnet docfx` or running `dotnet tool restore --configfile <configfile>` on another config file other than the one in this repo.
* Clear the local files to remove any cached files that aren't available remotely. Such files exist in the `api` directory (though care to not delete the `.gitignore` in that directory), the `_site` directory, and the workflows directory.

## Docs Maintainability

### Creating Edited Screenshots

There are webpages with edited screenshots of Bonsai. The source material (.xcf GIMP files) belongs in the img-src directory for ease of maintenance. The headers below describe how you can quickly create a new screenshot.

To take the screenshot (in Windows), use the `Windows+Shift+S` hotkey, select the `Window` option, and select the window you would like to screenshot. Cris's preference is to take a screenshot against a grey background (e.g. Cris creates a (R: 127, G: 127, B: 127) background in GIMP) because some of the background makes it into the screenshot.

#### Bonsai Package Manager Screenshot Edits

The layer group consisting of the highlight layer and 1,2,3,4 layers of the screenshots in the bonsai-install\*.xcf or bonsai-update\*.xcf files can be copy and pasted on top of other screenshots. This enables an expedited editing process for creating new edited screenshots. When creating the screenshot, do not change the size of the package manager after opening it.
