import {ExtensionContext, workspace, window, TextDocument, OutputChannel, WorkspaceConfiguration} from 'vscode';
import {cd, exec} from 'shelljs';

export function activate(context: ExtensionContext) {
    let output = window.createOutputChannel('SFDX Auto Deployer');
    let config = workspace.getConfiguration('sfdx-auto-deployer');

    let deployer = new Deployer(output, config);

    workspace.onDidSaveTextDocument(textDocument => {
        deployer.deploy(textDocument);
    });
}

class Deployer {
    private output: OutputChannel;
    private config: WorkspaceConfiguration;

    constructor(output: OutputChannel, config: WorkspaceConfiguration) {
        this.output = output;
        this.config = config;
    }

    public deploy(textDocument: TextDocument) {
        if(!this.config.enable) return;

        if(!workspace.workspaceFolders) {
            this.output.appendLine('Need a workspace directory to Autosave');
            return;
        }

        let fileMatch = this.match(textDocument.uri.path);

        if(fileMatch && fileMatch.length && fileMatch.length > 0) {
            this.output.show();
            this.output.clear();

            let workspacePath = workspace.workspaceFolders[0].uri.path;
            cd(workspacePath);
            
            this.output.appendLine('Deploying...');
            let command = `sfdx force:source:deploy --sourcepath ${textDocument.fileName}`;
            this.output.appendLine(command);
    
            exec(command, {}, (code, stdout, stderr) => {
                this.output.appendLine(stdout);
                this.output.appendLine(stderr);
            });
        }
    }

    private match(file : any) {
        let path = 'force-app/main/default';
        let regex = new RegExp(`.*${path}.*`, 'i');
    
        return file.match(regex);
    }
}