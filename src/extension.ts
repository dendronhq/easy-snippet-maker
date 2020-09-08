// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { DENDRON_COMMANDS } from "./constants";
import { GotoSnippetCommand } from "./commands/GotoSnippetCommand";
import { CreateSnippetCommand } from "./commands/CreateSnippetCommand";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      DENDRON_COMMANDS.GOTO_GLOBAL_SNIPPET.key,
      async () => {
        const cmd = new GotoSnippetCommand("global");
        await cmd.run();
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      DENDRON_COMMANDS.CREATE_GLOBAL_SNIPPET.key,
      async () => {
        const cmd = new CreateSnippetCommand("global");
        await cmd.run();
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
