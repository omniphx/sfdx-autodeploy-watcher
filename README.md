# SFDX Auto Deploy File Watcher

SFDX now provides a way to [develop against against any org using SFDX](https://github.com/forcedotcom/salesforcedx-vscode/wiki/Develop-Against-Any-Org-in-Visual-Studio-Code).

However, if you make file changes you still need to manually deploy each file. This package will make it less tedious by auto-deploying your 

 This package will allow you deploy upon save using the `sfdx force:source:deploy --sourcepath <filename>` command.

## Pre-requisites

* Must have [SFDX installed](https://developer.salesforce.com/tools/sfdxcli)
* Must have a default username configued (`.sfdx/sfdx-config.json`) or set one up with `$ sfdx force:config:set defaultusername=me@my.org`
* Must be in a sfdx project directory

## Todo

* In progress popup
* Toggle configuration settings

## Release Notes

### 0.0.1

Initial release. Watcher and deployer published.
