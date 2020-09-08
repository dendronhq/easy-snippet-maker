// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { DENDRON_COMMANDS } from "./constants";
import { GotoSnippetCommand } from "./commands/GotoSnippetCommand";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      DENDRON_COMMANDS.GOTO_GLOBAL_SNIPPET.key,
      () => {
        const cmd = new GotoSnippetCommand("global");
        return cmd.execute({snippetPrefix: "meet"});
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
