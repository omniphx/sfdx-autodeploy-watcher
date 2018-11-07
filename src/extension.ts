import {ExtensionContext, workspace, window} from 'vscode';
import {cd, exec} from 'shelljs';

export function activate(context: ExtensionContext) {
    let config = workspace.getConfiguration('sfdx-auto-deployer');
    if(!config.enable) {return;}

    let output = window.createOutputChannel('SFDX Auto Deployer');

    let watcher = workspace.createFileSystemWatcher('**/*.{cls,js,trigger,page,component,cmp,auradoc,css,design,svg,evt,*meta.xml}', true, false, true);
    watcher.onDidChange((event) => {
        let config = workspace.getConfiguration('sfdx-auto-deployer');
        if(!config.enable) {
            output.dispose();
            watcher.dispose();
            return;
        }

        output.show();
        output.clear();
        
        if(!workspace.workspaceFolders) {
            output.appendLine('Need a workspace directory to Autosave');
            return;
        }

        output.appendLine('Deploying...');

        let workspacePath = workspace.workspaceFolders[0].uri.path;
        cd(workspacePath);

        let path = event.path;
        let command = `sfdx force:source:deploy --sourcepath ${path}`;
        output.appendLine(command);

        exec(command, {}, (code, stdout, stderr) => {
            output.appendLine(stdout);
            output.appendLine(stderr);
        });
    });
}