import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { GotoSnippetCommand } from '../../commands/GotoSnippetCommand';
import { CreateSnippetCommand } from '../../commands/CreateSnippetCommand';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test.only('Goto Global', async () => {
		await new GotoSnippetCommand("global").execute({snippetPrefix: "meet"});
		assert.equal(vscode.window.activeTextEditor?.document.uri.fsPath, "/Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json");
	});

	// test('Goto Local', async () => {
	// 	await new GotoSnippetCommand("local").execute({snippetPrefix: "meet"});
	// 	assert.equal(vscode.window.activeTextEditor?.document.uri.fsPath, "/Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json");
	// });

	test('Create Global', async () => {
		await new CreateSnippetCommand("global").execute({snippetPrefix: "bond"});
		assert.equal(vscode.window.activeTextEditor?.document.uri.fsPath, "/Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json");
	});
});

// /Users/kevinlin/Library/Application Support/Code/User/snippets/markdown.json
				 //~/Library/Application Support/Code/User/snippets/markdown.json