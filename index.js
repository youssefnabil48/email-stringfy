const { dirname } = require("path");
const config = require(dirname(require.main.filename) + "/email.config.js");
const { readFileSync } = require("fs");
const { series } = require("gulp");
const { buildFiles } = require("./gulpfile");

const getFile = ({ filename }) => {
  const fileData = readFileSync(
    __dirname + "/built-files/" + filename + ".html",
    "utf-8"
  );
  return fileData;
};

const getVariables = ({ filename }) => {
  if (!config.files[filename]) {
    throw Error("File not found");
  }
  const variables = config.files[filename];
  return variables;
};
const validateInputs = ({ variables, args }) => {
  const sentKeys = Object.keys(args);
  if (sentKeys.sort().join(",") === Array.from(variables).sort().join(",")) {
    return true;
  }
  return false;
};

const gulpTaskRunner = async (task) => {
  return new Promise(function (resolve, reject) {
    console.log("START TASK...");
    series(task, (done) => {
      console.log("GULP TASK COMPLETED...");
      resolve();
      done();
    })();
  });
};

const getParsedHTMLEmailString = async ({ filename, args }) => {
  await gulpTaskRunner(buildFiles);
  const variables = getVariables({ filename });
  if (!validateInputs({ variables, args })) {
    throw Error("Variables aren't correct");
  }
  var dataString = getFile({ filename });

  Object.keys(args).forEach((variable) => {
    const _splittedString = dataString.split(
      `${config.prefix}${variable}${config.prefix}`
    );
    dataString = _splittedString.join(args[variable]);
  });
  return dataString;
};

exports.stringifyEmail = getParsedHTMLEmailString;
