import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { GotoSnippetCommand } from '../../commands/GotoSnippetCommand';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Goto Global', async () => {
		await new GotoSnippetCommand("global").execute({snippetPrefix: "meet"});
		assert.equal(vscode.window.activeTextEditor?.document.uri.fsPath, "/Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json");
	});

	test.only('Goto Local', async () => {
		await new GotoSnippetCommand("local").execute({snippetPrefix: "meet"});
		assert.equal(vscode.window.activeTextEditor?.document.uri.fsPath, "/Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json");
	});
});

// /Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json
				 //~/Library/Application Support/Code/User/snippets/markdown.json