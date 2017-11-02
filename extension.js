var vscode = require('vscode');
var loremIpsum = require('lorem-ipsum');

function activate(context) {
  var commands = [
    vscode.commands.registerCommand('lorem-ipsum.line', generateLine),
    vscode.commands.registerCommand('lorem-ipsum.paragraph', generateParagraph),
    vscode.commands.registerCommand('lorem-ipsum.multipleParagraphs', generateMultipleParagraphs)
  ];

  commands.forEach(function (command) {
    context.subscriptions.push(command);
  });
}

function insertText(text) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(function (editBuilder) {
    editBuilder.delete(editor.selection);
  }).then(function () {
    editor.edit(function (editBuilder) {
      editBuilder.insert(editor.selection.start, text);
    });
  });
}

function generateLine() {
  insertText(loremIpsum({
    count: 1,
    units: 'sentences'
  }));
}

function generateParagraph() {
  insertText(loremIpsum({
    count: 1,
    units: 'paragraphs'
  }));
}

async function generateMultipleParagraphs() {
  const items = [];
  for (let i = 2; i <= 10; i++) {
    items.push(i.toString());
  }

  const count = await vscode.window.showQuickPick(items, { placeHolder: 'How many paragraphs?' });
  if (!count) {
    return;
  }

  insertText(loremIpsum({
    count: Number.parseInt(count),
    units: 'paragraphs'
  }));
}

exports.activate = activate;
