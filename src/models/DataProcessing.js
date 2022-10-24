/**
 * userFiles are of the following form
 */
export const userFiles = JSON.parse(localStorage.getItem("userFiles"));

export const userFileNames = userFiles.map((file) => {
  return file.filename;
});

export const convertFilesToTabularFormat = (userFiles) => {
  let tabularFiles = [];
  userFiles.forEach((v, k) => {
    let file = userFiles[k].file_content;
    let fileColumns = Object.keys(file);
    // assuming first row has the same columns of the rest of the rows
    let fileRows = Object.keys(file[fileColumns[0]]);
    let cleanerData = [];

    fileColumns.forEach((_) => {
      cleanerData.push({});
    });

    fileColumns.forEach((col, index) => {
      cleanerData[index][`${col}`] = [];
      fileRows.forEach((row) => {
        cleanerData[index][`${col}`].push(file[col][row]);
      });
    });
    tabularFiles.push(cleanerData);
  });

  let result = [];
  tabularFiles.forEach((file) => {
    let resultFile = {};
    file.forEach((col) => {
      const column = Object.keys(col);
      resultFile[column[0]] = col[column[0]];
    });
    result.push(resultFile);
  });

  return result;
};

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
