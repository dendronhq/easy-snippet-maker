import * as os from "os";
import * as util from "util";
import * as fs from "fs";
import { parse } from "comment-json";
import * as vscode from "vscode";
import * as _ from "lodash";
import * as path from "path";

export type SnippetObject = {
  lang: "markdown";
  description: string;
  name: string;
  prefix: string;
};

function createSnippetObj(prefix: string): SnippetObject {
  return {
    lang: "markdown",
    description: "",
    name: prefix,
    prefix,
  };
}

function readSnippetFile(filePath: string) {
  const rawSnippets = fs.readFileSync(filePath, { encoding: "utf8" });
  const parsedSnippets = parse(rawSnippets);
  return { rawSnippets, parsedSnippets };
}

export type SnippetMode = "local" | "global";

const CODE_RELEASE_MAP = {
  "VSCodium": "VSCodium",
  "Visual Studio Code - Insiders": "Code - Insiders"
}

export function getVsCodeRelease() {
  let vscodeRelease = vscode.env.appName;
  const name = _.get(CODE_RELEASE_MAP, vscodeRelease, "Code")
    return pickingRelease(name);
}

function getSnippetFile(snippetObject: SnippetObject, mode: SnippetMode) {
  let extensionPath;
  let delimiter = "/";
  let snippetPath: string;

  if (mode === "local") {
    const wsFolders = vscode.workspace.workspaceFolders;
    if (_.isUndefined(wsFolders) || _.isUndefined(wsFolders[0])) {
      vscode.window.showErrorMessage("no workspace set");
      return;
    }
    const wsRoot = wsFolders[0];
    snippetPath = path.join(
      wsRoot.uri.fsPath,
      ".vscode",
      "dendron.code-snippets"
    );
  } else {
    [extensionPath, delimiter] = getVsCodeRelease();
    snippetPath =
      extensionPath +
      util.format("snippets%s.json", delimiter + snippetObject.lang);
  }
  return vscode.Uri.file(snippetPath);
}

function pickingRelease(name: string) {
  const osName = os.type();
  let delimiter = "/";
  let extansionPath;

  switch (osName) {
    case "Darwin": {
      extansionPath =
        process.env.HOME + "/Library/Application Support/" + name + "/User/";
      break;
    }
    case "Linux": {
      extansionPath = process.env.HOME + "/.config/" + name + "/User/";
      break;
    }
    case "Windows_NT": {
      extansionPath = process.env.APPDATA + "\\" + name + "\\User\\";
      delimiter = "\\";
      break;
    }
    default: {
      extansionPath = process.env.HOME + "/.config/" + name + "/User/";
      break;
    }
  }

  return [extansionPath, delimiter];
}

function updateCursorPosition(
  editor: vscode.TextEditor,
  line: number,
  character: number
) {
  //   const editor = vscode.window.activeTextEditor;
  return editor.edit(() => {
    const cursor = editor.selection.active;
    const nextCursor = cursor.with(line, character);
    editor.selection = new vscode.Selection(nextCursor, nextCursor);
  });
}

function revealLine(currentLineNumber: number, offset: number) {
  return vscode.commands.executeCommand("revealLine", {
    lineNumber: currentLineNumber + offset,
    at: "center",
  });
}

function showEditor(textDocument: vscode.TextDocument) {
  const editor = vscode.window.showTextDocument(
    textDocument,
    vscode.ViewColumn.Active
  );
  if (!editor) {
    throw new Error("Could not show document!");
  }

  return editor;
}

function openFileInEditor(fileItemOrURI: vscode.Uri) {
  return vscode.workspace.openTextDocument(fileItemOrURI).then(showEditor);
}

export {
  createSnippetObj,
  getSnippetFile,
  openFileInEditor,
  pickingRelease,
  readSnippetFile,
  revealLine,
  updateCursorPosition,
};
