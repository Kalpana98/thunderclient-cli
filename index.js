const fs = require("fs");
const path = require("path");
const os = require("os");

let thunderClientCollections = "";

const codeCollections = path.join(process.cwd(), "thunder-client");

if (os.platform() === "win32") {
    thunderClientCollections = path.join(
        process.env.APPDATA,
        "Code",
        "User",
        "globalStorage",
        "rangav.vscode-thunder-client",
        "collections"
    );
} else if (os.platform() === "darwin") {
    thunderClientCollections = path.join(
        os.homedir(),
        "Library",
        "Application Support",
        "Code",
        "User",
        "globalStorage",
        "rangav.vscode-thunder-client",
        "collections"
    );
} else if (os.platform() === "linux") {
    thunderClientCollections = path.join(
        os.homedir(),
        ".config",
        "Code",
        "User",
        "globalStorage",
        "rangav.vscode-thunder-client",
        "collections"
    );
} else {
    console.log("OS Not Configured for Automated Thunder Import/Export!");
    process.exit(1);
}

function importCollections() {
    try {
        if (!fs.existsSync(thunderClientCollections)) {
            fs.mkdirSync(thunderClientCollections, { recursive: true });
        }

        fs.readdir(codeCollections, (err, files) => {
            if (err) {
                console.error("Error reading collections folder:", err);
                return;
            }

            files.forEach((file) => {
                const filePath = path.join(codeCollections, file);

                if (path.extname(filePath) === ".json") {
                    fs.readFile(filePath, "utf-8", (err, data) => {
                        if (err) {
                            console.error(`Error reading file ${file}:`, err);
                            return;
                        }

                        try {
                            let importedCollection = JSON.parse(data);

                            if (!importedCollection.colName) {
                                importedCollection.colName = path.basename(file, ".json");
                            }

                            const targetFileName = `${path.basename(file)}`;
                            const targetFilePath = path.join(
                                thunderClientCollections,
                                targetFileName
                            );

                            try {
                                fs.writeFileSync(
                                    targetFilePath,
                                    JSON.stringify(importedCollection, null, 2)
                                );
                                console.log(
                                    `Collection '${importedCollection.colName}' uploaded successfully.\n`
                                );
                            } catch (err) {
                                console.error("Error saving Thunder Client collection:", err);
                            }
                        } catch (err) {
                            console.error(`Error parsing JSON in file ${file}:`, err);
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error("Error during import:", error);
    }
}

function exportCollections() {
    try {
        if (!fs.existsSync(codeCollections)) {
            fs.mkdirSync(codeCollections, { recursive: true });
        }

        fs.readdir(thunderClientCollections, (err, files) => {
            if (err) {
                console.error("Error reading Thunder Client collections folder:", err);
                return;
            }

            files.forEach((file) => {
                const filePath = path.join(thunderClientCollections, file);

                if (path.extname(filePath) === ".json") {
                    fs.readFile(filePath, "utf-8", (err, data) => {
                        if (err) {
                            console.error(`Error reading file ${file}:`, err);
                            return;
                        }

                        try {
                            const collection = JSON.parse(data);
                            const targetFileName = `${path.basename(file)}`;
                            const targetFilePath = path.join(codeCollections, targetFileName);

                            try {
                                fs.writeFileSync(
                                    targetFilePath,
                                    JSON.stringify(collection, null, 2)
                                );
                                console.log(
                                    `Collection '${collection.colName}' exported successfully.\n`
                                );
                            } catch (err) {
                                console.error("Error saving collection to code folder:", err);
                            }
                        } catch (err) {
                            console.error(`Error parsing JSON in file ${file}:`, err);
                        }
                    });
                }
            });
        });
    } catch (error) {
        console.error("Error during export:", error);
    }
}

const args = process.argv.slice(2);

if (args.includes("--import")) {
    console.log("Uploading collections into Thunder Client\n");
    importCollections();
} else if (args.includes("--export")) {
    console.log(
        `Exporting collections from Thunder Client to ${process.cwd()}/thunder-client\n`
    );
    exportCollections();
} else if (args.includes("--help")) {
    console.log(`
    Usage:
      --import    Import collections into Thunder Client
      --export    Export collections from Thunder Client
      --help      Show this help message
  `);
    process.exit(0);
} else {
    console.error("Invalid argument. Use --help for usage instructions.");
    process.exit(1);
}
