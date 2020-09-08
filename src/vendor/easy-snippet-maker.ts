// import { SnippetObject } from "../utils";

// const vscode = require("vscode");
// const fs = require("fs");
// const util = require("util");
// const { parse, stringify } = require("comment-json");
// const {
//   createSnippetObj,
//   getSnippetFile,
//   openFileInEditor,
//   pickingRelease,
//   readSnippetFile,
//   revealLine,
//   updateCursorPosition,
// } = require("./utils");

// function writeSnippetToFile({
//   existingSnippets,
//   newSnippet,
//   userSnippetsFile,
//   cleanCode,
// }: {
//   existingSnippets: any,
//   newSnippet: any,
//   userSnippetsFile: any,
//   cleanCode: any,
// }) {
//   existingSnippets[newSnippet.name] = {
//     prefix: newSnippet.prefix,
//     body: buildBodyFromText(cleanCode),
//     description: newSnippet.description,
//   };
//   var snippetString = stringify(existingSnippets, null, 2);
//   var toSave = snippetString;

//   fs.writeFile(userSnippetsFile, toSave, (err) => {
//     if (err) vscode.window.showErrorMessage("Error while saving new snippet!");
//     vscode.window.showInformationMessage("snippet updated");
//     const uri = vscode.Uri.file(userSnippetsFile);
//     vscode.window.showTextDocument(uri);
//   });
// }

// function activate(context) {

// //   let disposable = vscode.commands.registerCommand(
// //     "extension.petMaker",
// //     function () {
// //       let editor = vscode.window.activeTextEditor;
// //       let selected = editor.selection;

// //       let selectedText = editor.document.getText(selected);
// //       let cleanCode = selectedText;

// //       let snippetObject = {
// //         lang: "markdown",
// //         description: "",
// //         name: "bond",
// //         prefix: "bond",
// //       };

// //       vscode.languages
// //         .getLanguages()
// //         .then(() => {
// //           return vscode.window.showInputBox({ prompt: "Enter snippet prefix" });
// //         })
// //         .then((snippetPrefix) => {
// //           snippetObject.prefix = snippetPrefix;
// //           snippetObject.name = snippetPrefix;
// //         })
// //         .then(() => {
// //           let extansionPath;
// //           let delimiter = "/";

// //           let vscodeRelease = vscode.env.appName;

// //           // Check for insider version
// //           if (vscodeRelease === "Visual Studio Code - Insiders") {
// //             [extansionPath, delimiter] = pickingRelease("Code - Insiders");
// //           } else {
// //             [extansionPath, delimiter] = pickingRelease("Code");
// //           }

// //           var userSnippetsFile =
// //             extansionPath +
// //             util.format("snippets%s.json", delimiter + snippetObject.lang);
// //           if (
// //             snippetObject.name !== undefined &&
// //             snippetObject.prefix !== undefined
// //           ) {
// //             fs.readFile(userSnippetsFile, (err, txt) => {
// //               if (txt) {
// //                 var check = txt.toString();
// //               }

// //               if (err) {
// //                 fs.open(userSnippetsFile, "w+", (err) => {
// //                   if (err) {
// //                     return;
// //                   } else {
// //                     initFile(snippetObject, cleanCode, userSnippetsFile);
// //                   }
// //                 });
// //               } else if (!check) {
// //                 initFile(snippetObject, cleanCode, userSnippetsFile);
// //               } else {
// //                 // TODO: Refactoring, code is damn mess.

// //                 var savedSnippets = txt.toString();
// //                 var restoreObject = parse(savedSnippets);

// //                 if (
// //                   restoreObject[snippetObject.name] !== undefined ||
// //                   restoreObject[snippetObject.name] === null
// //                 ) {
// //                   const options = ["proceed", "cancel"];
// //                   vscode.window
// //                     .showQuickPick(options, {
// //                       placeHolder: "proceed",
// //                       ignoreFocusOut: true,
// //                     })
// //                     .then((shouldProceed) => {
// //                       if (shouldProceed !== "proceed") {
// //                         vscode.window.showInformationMessage("cancelled");
// //                         return;
// //                       }
// //                       writeSnippetToFile({
// //                         existingSnippets: restoreObject,
// //                         newSnippet: snippetObject,
// //                         userSnippetsFile,
// //                         cleanCode,
// //                       });
// //                     });
// //                 } else {
// //                   writeSnippetToFile({
// //                     existingSnippets: restoreObject,
// //                     newSnippet: snippetObject,
// //                     userSnippetsFile,
// //                     cleanCode,
// //                   });
// //                 }
// //               }
// //             });
// //           } 
          
// //           else {
// //             vscode.window.showWarningMessage(
// //               "You need to enter Snippet name and Snippet prefix."
// //             );
// //           }
// //         });

// //       context.subscriptions.push(disposable);
// //     }
// //   );
// }

// function buildBodyFromText(text: string) {
//   return text.split("\n");
// }

// function initFile(snippObj: SnippetObject, body: string, saveLocation: string) {
//   var snippets = {};
//   // @ts-ignore
//   snippets[snippObj.name] = {
//     prefix: snippObj.prefix,
//     body: buildBodyFromText(body),
//     description: snippObj.description,
//   };
//   var snippetString = JSON.stringify(snippets, null, 2);
//   var toSave = snippetString;

//   fs.writeFile(saveLocation, toSave, (err: Error) => {
//     if (err) vscode.window.showErrorMessage("Error while saving new snippet!");
//   });
// }

// // exports.activate = activate;

// // function deactivate() {}

// // exports.deactivate = deactivate;
