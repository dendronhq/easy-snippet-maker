import {
  createSnippetObj,
  getSnippetFile,
  openFileInEditor,
  pickingRelease,
  readSnippetFile,
  revealLine,
  updateCursorPosition,
  SnippetMode,
} from "../utils";
import * as vscode from "vscode";
import * as _ from "lodash";
import { BaseCommand, BasicCommand } from "./base";

type GotoSnippetCommandOpts = {
  snippetPrefix: string;
};

export class GotoSnippetCommand extends BasicCommand<
  GotoSnippetCommandOpts,
  any
> {
  constructor(public mode: SnippetMode) {
    super();
  }

  async gatherInputs(): Promise<GotoSnippetCommandOpts> {
    const snippetObject = createSnippetObj();
    const snippetPrefix = vscode.window.showInputBox({
      prompt: "Enter snippet prefix",
    });
    // @ts-ignore
    return { snippetPrefix };
  }

  async execute(opts: GotoSnippetCommandOpts) {
    const mode = this.mode;
    const snippetObject = createSnippetObj();
    const { snippetPrefix } = opts;
    if (_.isUndefined(snippetPrefix)) {
      return;
    }
    snippetObject.prefix = snippetPrefix;
    snippetObject.name = snippetPrefix;
    const snippetFile = getSnippetFile(snippetObject, mode);
    if (_.isUndefined(snippetFile)) {
      return;
    }

    const editor = await openFileInEditor(snippetFile);
    const text = editor.document.getText();
    const needle = `"prefix": "${snippetObject.name}"`;
    const needleIndex = text.indexOf(needle);
    const out = text.slice(0, needleIndex);
    const lines = out.split("\n").length - 1;
    await revealLine(lines, 0);
    await updateCursorPosition(editor, lines, 0);
    return;
  }
}
