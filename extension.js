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

function insertText(lorem) {
  var editor = vscode.window.activeTextEditor;
  editor.edit(
    edit => editor.selections.forEach(
      selection => {
        edit.delete(selection);
        edit.insert(selection.start, loremIpsum(lorem));
      }
    )
  );
}

function generateLine() {
  insertText({
    count: 1,
    units: 'sentences'
  });
}

function generateParagraph() {
  insertText({
    count: 1,
    units: 'paragraphs'
  });
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

  insertText({
    count: Number.parseInt(count),
    units: 'paragraphs'
  });
}

exports.activate = activate;
