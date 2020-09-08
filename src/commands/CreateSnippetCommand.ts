import * as fs from "fs-extra";
import * as _ from "lodash";
import * as vscode from "vscode";
import {
  createSnippetObj,
  getSnippetFile,
  SnippetMode,
  SnippetObject,
} from "../utils";
import { BasicCommand } from "./base";
const { parse, stringify } = require("comment-json");

type CreateSnippetCommandOpts = {
  snippetPrefix: string;
};

function buildBodyFromText(text: string) {
  return text.split("\n");
}

function initFile(snippObj: SnippetObject, body: string, saveLocation: string) {
  var snippets = {};
  // @ts-ignore
  snippets[snippObj.name] = {
    prefix: snippObj.prefix,
    body: buildBodyFromText(body),
    description: snippObj.description,
  };
  var snippetString = JSON.stringify(snippets, null, 2);
  var toSave = snippetString;
  return fs.writeFileSync(saveLocation, toSave);
}

function writeSnippetToFile({
  existingSnippets,
  newSnippet,
  userSnippetsFile,
  cleanCode,
}: {
  existingSnippets: any;
  newSnippet: any;
  userSnippetsFile: any;
  cleanCode: any;
}) {
  existingSnippets[newSnippet.name] = {
    prefix: newSnippet.prefix,
    body: buildBodyFromText(cleanCode),
    description: newSnippet.description,
  };
  var snippetString = stringify(existingSnippets, null, 2);
  var toSave = snippetString;

  fs.writeFile(userSnippetsFile, toSave, (err) => {
    if (err) vscode.window.showErrorMessage("Error while saving new snippet!");
    vscode.window.showInformationMessage("snippet updated");
    const uri = vscode.Uri.file(userSnippetsFile);
    vscode.window.showTextDocument(uri);
  });
}

export class CreateSnippetCommand extends BasicCommand<
  CreateSnippetCommandOpts,
  any
> {
  constructor(public mode: SnippetMode) {
    super();
  }

  async gatherInputs(): Promise<CreateSnippetCommandOpts> {
    const snippetObject = createSnippetObj();
    const snippetPrefix = vscode.window.showInputBox({
      prompt: "Enter snippet prefix",
    });
    // @ts-ignore
    return { snippetPrefix };
  }

  async execute(opts: CreateSnippetCommandOpts) {
    let editor = vscode.window.activeTextEditor;
    const mode = this.mode;
    if (_.isUndefined(editor)) {
      vscode.window.showErrorMessage("no editor found");
      return;
    }

    // TODO: tmp
    let selected = editor.selection;
    let selectedText = editor.document.getText(selected);
    let cleanCode = selectedText;

    // let cleanCode = "bond";

    let snippetObject = createSnippetObj();
    const snippetFile = getSnippetFile(snippetObject, mode);
    if (_.isUndefined(snippetFile)) {
      return;
    }
    let userSnippetsFile = snippetFile.fsPath;
    let check: string | undefined;

    try {
      const txt = fs.readFileSync(userSnippetsFile);
      if (txt) {
        check = txt.toString();
      }
      if (!check) {
        return initFile(snippetObject, cleanCode, userSnippetsFile);
      }

      // TODO: Refactoring, code is damn mess.

      var savedSnippets = txt.toString();
      var restoreObject = parse(savedSnippets);

      if (
        restoreObject[snippetObject.name] !== undefined ||
        restoreObject[snippetObject.name] === null
      ) {
        const options = ["proceed", "cancel"];
        vscode.window.showInformationMessage("found existing entry, overwrite?");
        vscode.window
          .showQuickPick(options, {
            placeHolder: "proceed",
            ignoreFocusOut: true,

          })
          .then((shouldProceed) => {
            if (shouldProceed !== "proceed") {
              vscode.window.showInformationMessage("cancelled");
              return;
            }
            writeSnippetToFile({
              existingSnippets: restoreObject,
              newSnippet: snippetObject,
              userSnippetsFile,
              cleanCode,
            });
          });
      } else {
        writeSnippetToFile({
          existingSnippets: restoreObject,
          newSnippet: snippetObject,
          userSnippetsFile,
          cleanCode,
        });
      }
    } catch (err) {
      fs.open(userSnippetsFile, "w+", (err) => {
        if (err) {
          return;
        } else {
          initFile(snippetObject, cleanCode, userSnippetsFile);
        }
      });
    }


    //   try {
    //     // found file, write
    //     const userSnippetsFile = fs.readFileSync(snippetFile.fsPath, {encoding: "utf8"});
    //     initFile(snippetObject, cleanCode, userSnippetsFile);
    //   } catch(err) {
    //       // no file, write
    //       fs.writeFileSync()

    //   }
  }
}
