import {
  convertFilesToReadableFormat,
  userFiles,
  userFileNames,
  getUserFileId,
} from "./DataProcessing";

/**
 * this correspond to the file selected by the user
 */
var currentFIle;

/**
 * the subOptions object contains all the arbitrary subOptions
 * which can be exported to be used in the dashboard
 */
export const subOptions = {
  "Select a Plot": [
    "Scatter Plot",
    "Line Plot",
    "Pie Chart",
    "Histogram",
    "Box Plot",
    "BarChart",
    "Heatmap",
    "3D Plot",
  ],
  "Select a Theme": [
    "seaborn",
    "dark",
    "light",
    "gray",
    "default",
    "transparent",
  ],
  "Select a Tool": ["Data Processing/ Analysis"],
};

// the following classes represent the various states of the option class
/**
 * this is the initial state which returns the names of the user files
 */
class SelectFile {
  displaySubOptions() {
    return userFileNames;
  }
}

/**
 * this state is selected when the user clicks
 * Select a Plot on the hamburger drop down menu
 */
class SelectPlot {
  displaySubOptions() {
    return subOptions["Select a Plot"];
  }
}

/**
 * this state is selected when the user clicks
 * any of the Select X/Y/Z axis or Select a Color/Size on the hamburger drop down menu
 * the state depends on a global variable stored in a (Singleton)
 *  which is used track the latest file selected by the user
 */
class SelectAxis {
  displaySubOptions() {
    // if no file has yet been selected by the user return warning
    if (currentFIle === undefined) return ["Please select a file"];

    // convert all the user files in column arrays
    const readableUserFile = convertFilesToReadableFormat(userFiles);

    // readableFiles is an array of arrays containing all the user files in column format
    // get the file id of the selected file from the user files
    // use the file id to access the right array
    const selectedFileId = getUserFileId(currentFIle);
    // return the keys of the first object (which correspond to the columns) of the selected file
    return Object.keys(readableUserFile[selectedFileId][0]);
  }
}

/**
 * this state is selected when the user clicks
 * Select a Theme on the hamburger drop down menu
 */
class SelectTheme {
  displaySubOptions() {
    return subOptions["Select a Theme"];
  }
}

/**
 * this state is selected when the user clicks
 * Select a Tool on the hamburger drop down menu
 */
class SelectTool {
  displaySubOptions() {
    return subOptions["Select a Tool"];
  }
}

/**
 * option is a hashmap mapping the options keys displayed to the user
 * to the internal options state used by the command line model to
 * select the right sub-options
 */
const options = {
  "Select a File": new SelectFile(),
  "Select X axis": new SelectAxis(),
  "Select Y axis": new SelectAxis(),
  "Select Z axis": new SelectAxis(),
  "Select Color": new SelectAxis(),
  "Select Size": new SelectAxis(),
  "Select a Plot": new SelectPlot(),
  // "Edit Plot": new EditPlot(),
  "Select a Theme": new SelectTheme(),
  // this will be things like the various tools such as dataprocessing
  "Select a Tool": new SelectTool(),
};

/**
 * The state of the command line depends on the option selected.
 * if the state is a select file, then the dropdown menu will display all the user files
 * as the displaySubOptions method of the CommandLine context is updated to display the subOptions
 * of the SelectFile state.
 */
class State {
  constructor(state) {
    this.state = state;
  }

  /**
   * this function is used to allow the context (CommandLineModel class) to call the displaySubOptions
   * method on the correct class
   *
   * @returns an array of strings which correspond to the sub-options returned by the state
   */
  displaySubOptions() {
    let currentOption = options[this.state];
    return currentOption.displaySubOptions();
  }
}

/**
 * The command line model works as a context for the dashboard command line
 * this stores the reference of the State class which instantiates each possible states
 * that the CommandLineModel class can take as the user navigates through it
 */
export default class CommandLineModel {
  /**
   * the initial state of the command line is set to Select a File
   */
  constructor() {
    this.state = "Select a File";
  }

  /**
   * this is the setter for the state of the context
   *
   * @param {*} state - the state can take the value of any of the options displayed under the hamburger menu
   *
   * @returns - this
   */
  changeState(state) {
    this.state = state;
    return this;
  }

  /**
   * this is used to change the global environment by updating the currentFile variable of the Singleton
   *
   * @param {*} fileName - this takes the value of the last file selected by th user
   *
   * @returns this
   */
  changeCurrentFile(fileName) {
    if (userFileNames.indexOf(fileName) !== -1) {
      currentFIle = fileName;
    }
    return this;
  }

  /**
   * this is the getter for the state of the context
   *
   * @returns - this.state - the current state of the context
   */
  getCurrentState() {
    return this.state;
  }

  /**
   * this is used to display the menuItems on the hamburger dropdown menu
   *
   * @returns options - the array of string corresponding to the keys of the options object.
   */
  displayOptions() {
    return Object.keys(options);
  }

  // this will change depending on the state which is changed when
  //an option is selected, therefore the SubOption object will call the
  // displaySubOptions method
  /**
   * @returns a list of sub-options to displayed from the dropdown menu given the option
   * selected within the hamburger menu
   */
  displaySubOptions() {
    const currentState = new State(this.state);
    return currentState.displaySubOptions();
  }
}

//TODO: the function actions look similar look for a pattern
// this can be made into a single object or 2 objects one for retrieving data such as dashboards and userfiles
// the other tio return the options
// perhaps classes are an overkill for the different states of the sub-options
// find the way to include sub sub options
