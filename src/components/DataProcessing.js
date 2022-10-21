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