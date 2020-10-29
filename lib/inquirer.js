const inq = require("inquirer");
const logSymbols = require("log-symbols");
const askSignInCredentials = async () => {
  inq
    .prompt([
      {
        type: "input",
        name: "email",
        message: "Enter your email address",
      },
      {
        type: "password",
        name: "password",
        mask: "*",
        message: "Enter your Password",
      },
    ])
    .then((ans) => console.log(ans))
    .catch(() => console.log("Something went wrong"));
};

const confirmFolderPrompt = (folder) => {
  return inq.prompt([
    {
      type: "confirm",
      name: "folder_creation",
      message: `${folder} is not present, Do you want to create a folder`,
    },
  ]);
};

const createComponentPrompt = () => {
  let folderName = "";
  return inq.prompt([
    {
      type: "input",
      name: "folder_name",
      message: "Please Enter component Name",
    },
  ]);
};
module.exports = {
  askSignInCredentials,
  confirmFolderPrompt,
  createComponentPrompt,
};
