#!/usr/bin/env node

const fs = require("fs");
const fsExtra = require("fs-extra");
const ui = require("./lib/ui");
const clear = require("clear");
const inq = require("./lib/inquirer");
const ora = require("ora");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const open = util.promisify(fs.open);
const write = util.promisify(fs.write);

const {
  writeAction,
  writeComponent,
  writeReducer,
  createFolder,
} = require("./lib/helpers");
clear();
ui.title();

const run = async () => {
  const componentsPath = "./src/components";
  const storePath = "./src/store";

  const args = process.argv;
  const src = fs.existsSync("./src");
  const components = fs.existsSync(componentsPath);
  const store = fs.existsSync(storePath);
  // --------------------------------------------------
  // check if src folder exists
  // --------------------------------------------------
  if (!src) {
    await createFolder("src", "./src");
  }

  // --------------------------------------------------
  // check if components folder exists
  // --------------------------------------------------
  if (!components) {
    await createFolder("components", componentsPath);
  }
  // --------------------------------------------------
  // check if store folder exists
  // --------------------------------------------------
  if (!store) {
    await createFolder("store", storePath);
  }
  const component = await inq.createComponentPrompt();
  const componentNameTemp = component.folder_name;
  if (componentNameTemp) {
    const componentName = componentNameTemp.split(" ").join("_");
    try {
      // await emptyDir("./src", {});
      // ==================================================
      // CREATE STORE FILES
      // ==================================================
      // ----------------------------
      // CREATE ACTIONS
      // ----------------------------
      await mkdir(`${storePath}/${componentName}`);
      await mkdir(`${storePath}/${componentName}/actions`);
      const actionFile = await open(
        `${storePath}/${componentName}/actions/index.js`,
        "wx"
      );
      await write(actionFile, writeAction());

      // ----------------------------
      // CREATE REDUCERS
      // ----------------------------
      await mkdir(`${storePath}/${componentName}/reducers`);
      const reducerFile = await open(
        `${storePath}/${componentName}/reducers/index.js`,
        "wx"
      );
      await write(reducerFile, writeReducer());
      // ==================================================
      // CREATE COMPONENT FILES
      // ==================================================
      await mkdir(`${componentsPath}/${componentName}`);
      const componentFile = await open(
        `${componentsPath}/${componentName}/${componentName}.js`,
        "wx"
      );
      await write(componentFile, writeComponent(componentName));
      console.log("Created");
    } catch (err) {
      console.log("Error", err.message);
    }
  } else {
    console.log("No Compnent Name Provided");
    console.log("Exiting Process");
    process.exit();
  }
};

run();
