// The module 'vscode' contains the VS Code extensibility API
// Import the necessary extensibility types to use in your code below
import {ExtensionContext, workspace, window} from 'vscode';
import * as shell from 'shelljs';

// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
export function activate(context: ExtensionContext) {
    let watcher = workspace.createFileSystemWatcher('**/*.{cls,js,trigger,page,component,cmp,auradoc,css,design,svg,*meta.xml}', true, false, true);
    let outputChannel = window.createOutputChannel('SFDX Autowatcher');

    watcher.onDidChange(event => {
        console.log('fire');
        outputChannel.show();
        outputChannel.clear();

        if(!workspace.workspaceFolders) {
            outputChannel.appendLine('Need a workspace directory to Autosave');
            return;
        }

        let workspacePath = workspace.workspaceFolders[0].uri.path;
        shell.cd(workspacePath);
    
        let path = event.path;
        let command = `sfdx force:source:deploy --sourcepath ${path}`;
        outputChannel.appendLine(command);

        shell.exec(command, {}, (code, stdout, stderr) => {
            outputChannel.appendLine(stdout);
            outputChannel.appendLine(stderr);
        });
    });
}