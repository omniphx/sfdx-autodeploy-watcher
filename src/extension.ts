import {ExtensionContext, workspace, window, Uri} from 'vscode';
import {cd, exec} from 'shelljs';

export function activate(context: ExtensionContext) {
    watcher();
}

function watcher() {
    let config = workspace.getConfiguration('sfdx-auto-deploy-file-watcher');
    if(!config.enable) {return;}

    let watcher = workspace.createFileSystemWatcher('**/*.{cls,js,trigger,page,component,cmp,auradoc,css,design,svg,*meta.xml}', true, false, true);
    watcher.onDidChange(deployer);
}

function deployer(event: Uri) {
    let outputChannel = window.createOutputChannel('SFDX Auto Deploy File Watcher');

    outputChannel.show();
    outputChannel.clear();

    if(!workspace.workspaceFolders) {
        outputChannel.appendLine('Need a workspace directory to Autosave');
        return;
    }

    let workspacePath = workspace.workspaceFolders[0].uri.path;
    cd(workspacePath);

    let path = event.path;
    let command = `sfdx force:source:deploy --sourcepath ${path}`;
    outputChannel.appendLine(command);

    exec(command, {}, (code, stdout, stderr) => {
        outputChannel.appendLine(stdout);
        outputChannel.appendLine(stderr);
    });
}