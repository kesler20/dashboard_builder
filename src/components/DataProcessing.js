/**
 * userFiles are of the following form
 */
export const userFiles = JSON.parse(localStorage.getItem("userFiles"));

export const userFileNames = userFiles.map((file) => {
  return file.filename;
});

export const convertFilesToReadableFormat = (userFiles) => {
  let readableUserFiles = [];
  userFiles.forEach((v, k) => {
    let file = userFiles[k].file_content;
    let fileColumns = Object.keys(file);
    // assuming first row has the same columns of the rest of the rows
    let fileRows = Object.keys(file[fileColumns[0]]);
    let cleanerData = [];
    fileRows.forEach(() => cleanerData.push({}));
    for (let row of fileRows) {
      for (let col of fileColumns) {
        cleanerData[fileRows.indexOf(row)][col] = file[col][row];
      }
    }
    readableUserFiles.push(cleanerData);
  });
  return readableUserFiles;
};

export const getUserFileId = (selectedFilename) => {
  const selectedFile = userFiles.filter(
    (file) => file.filename === selectedFilename
  )[0];
  return userFiles.indexOf(selectedFile);
};
