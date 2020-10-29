const inq = require("./inquirer");
const fs = require("fs");
const writeAction = () => {
  const ACTION_TYPE_1 = "export const ACTION_TYPE_1 = 'ACTION_TYPE_1';\n";
  const ACTION_TYPE_2 = "export const ACTION_TYPE_2 = 'ACTION_TYPE_2';\n";
  const ACTION_TYPE_3 = "export const ACTION_TYPE_3 = 'ACTION_TYPE_3';\n";
  const actionFunc = "export const actionFunc = () => {};\n";
  return ACTION_TYPE_1 + ACTION_TYPE_2 + ACTION_TYPE_3 + actionFunc;
};

const writeReducer = () => {
  const initialState = "const initialState = {};\n";
  const reducer = `export const reducer_name = (state=initialState, action) => {
      switch(action.type){
        case ACTION_TYPE_1 :
          return {...state};
  
        case ACTION_TYPE_2 :
          return {...state};
  
        case ACTION_TYPE_3 :
          return {...state};
  
        default: 
          return initialState;
      }
    }`;
  return initialState + reducer;
};
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
const writeComponent = (componentName) => {
  const importi = 'import React from "react";\n';
  const cmp = `const ${componentName} = () => {
      return <div></div>
    }\n`;
  const exporti = `export default ${componentName}\n`;
  return importi + cmp + exporti;
};

module.exports = {
  writeAction,
  writeComponent,
  writeReducer,
  createFolder,
};
