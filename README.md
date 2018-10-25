# SFDX Auto Deployer

SFDX now provides a way to [develop against against any org using SFDX](https://github.com/forcedotcom/salesforcedx-vscode/wiki/Develop-Against-Any-Org-in-Visual-Studio-Code).

However, if you make file changes you still need to manually deploy each file. This package will watch your files for changes and execute the `sfdx force:source:deploy --sourcepath <filename>` command making development less tedious.

 > Note: This is package does not work for scratch orgs. Only Sandboxes and orgs that don't have source tracking.

## Pre-requisites

* Must have [SFDX installed](https://developer.salesforce.com/tools/sfdxcli)
* Must have a default username configued (`.sfdx/sfdx-config.json`) or set one up with `$ sfdx force:config:set defaultusername=me@my.org`
* Must be in a sfdx project directory that references a manifest

## Release Notes

### 0.0.1

Initial release. Watcher and deployer published.

### 0.0.2

Readme update

### 0.0.3

Fix .evt file watching, update github reference, fix config bug
