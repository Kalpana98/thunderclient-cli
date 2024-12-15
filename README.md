# Thunder Client CLI Utility

This CLI utility allows you to **import** and **export** collections for the [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) VS Code extension. Streamline your API testing workflows by saving collections into your project folder and re-importing them when needed.

---

## Features

- **Import collections** from your project folder into Thunder Client.
- **Export collections** from Thunder Client to your project folder for version control or sharing.

---

## Installation

To install the package globally from npm, run:
```
npm install -g thunderclient-cli
```

---

## Steps to use:

1. Install the [VS Code Extension : Thunder Client](vscode:extension/rangav.vscode-thunder-client) and access from the left panel.

2. To **Save / Export** the collections from Thunder Client into your project folder, run:
```
thunderclient --export
```
3. Test, modify, and create new collections or requests as needed. 

4. To ***Load / Import*** the collections back into your Thunder Client, run:
```
thunderclient --import
```
