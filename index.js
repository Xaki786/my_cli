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
const remove = util.promisify(fs.rmdirSync);
const emptyDir = util.promisify(fsExtra.emptyDirSync);
const { writeAction, writeComponent, writeReducer } = require("./lib/helpers");
clear();
ui.title();

const createFolder = async (foldr, path) => {
  const foldrConfirm = await inq.confirmFolderPrompt(foldr);
  if (!foldrConfirm.folder_creation) {
    console.log(`Exiting Process: Without ${foldr} cli can not be proceeded`);
    process.exit();
  }
  try {
    fs.mkdirSync(path);
  } catch (error) {
    console.log(`Error creating a ${path} folder`, error.message);
    console.log("Exiting Process");
    process.exit();
  }
};
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
    // const srcConfirm = await inq.confirmFolderPrompt("src");
    // if (!srcConfirm.folder_creation) {
    //   console.log("Exiting Process: Without src cli can not be proceeded");
    //   process.exit();
    // }
    // try {
    //   fs.mkdirSync("./src");
    // } catch (error) {
    //   console.log("Error creating a src folder", error.message);
    //   console.log("Exiting Process");
    //   process.exit();
    // }
    await createFolder("src", "./src");
  }

  // --------------------------------------------------
  // check if components folder exists
  // --------------------------------------------------
  if (!components) {
    const componentsConfirm = await inq.confirmFolderPrompt(componentsPath);
    if (!componentsConfirm.folder_creation) {
      console.log(
        "Exiting Process: Without components cli can not be proceeded"
      );
      process.exit();
    }
    try {
      await mkdir(`${componentsPath}`);
    } catch (error) {
      console.log("Error creating a components folder", error.message);
      console.log("Exiting Process");
      process.exit();
    }
  }
  // --------------------------------------------------
  // check if store folder exists
  // --------------------------------------------------
  if (!store) {
    const storeConfirm = await inq.confirmFolderPrompt(storePath);
    if (!storeConfirm.folder_creation) {
      console.log("Exiting Process: Without store cli can not be proceeded");
      process.exit();
    }
    try {
      await mkdir(`${storePath}`);
    } catch (error) {
      console.log("Error creating a store folder", error.message);
      console.log("Exiting Process");
      process.exit();
    }
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
