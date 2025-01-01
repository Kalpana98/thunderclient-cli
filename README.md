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

1. Install the [VS Code Extension : Thunder Client](vscode:extension/rangav.vscode-thunder-client).

2. To **Load / Import** the collections into your Thunder Client, run:
```
thunderclient --import
```

**Note:** Above command will create a "Sample Collection" that can be located under **Thunder Client - Collections** from the left panel within VS Code.

3. Test, modify, and create new collections or requests as needed. 

4. To **Save / Export** the collections from Thunder Client into your project folder, run:
```
thunderclient --export
```
