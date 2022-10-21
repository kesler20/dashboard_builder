import { convertFilesToReadableFormat } from "./DataProcessing";

class SelectFile {
  displaySubOptions() {
    return userFiles.map((file) => {
      return file.filename;
    });
  }
}

class SelectPlot {
  displaySubOptions() {
    return [
      "Scatter Plot",
      "Line Plot",
      "Pie Chart",
      "BarChart",
      "Heatmap",
      "3D Plot",
    ];
  }
}

class SelectAxis {
  displaySubOptions() {
    const readableUserFiles = convertFilesToReadableFormat(userFiles);
    // filter the readableUserFiles
    console.log(readableUserFiles);
    return ["Random Data X axis"];
  }
}

class EditPlot {
  displaySubOptions() {
    // filter plots depedning on the current plot selected by the userr
    return [];
  }
}

class SelectTheme {
  displaySubOptions() {
    return ["seaborn", "dark", "light", "gray", "default", "transparent"];
  }
}

class SelectTool {
  displayOptions() {
    return ["Data Processing/ Analysis"];
  }
}

/**
 * userFiles are of the following form
 */
const userFiles = localStorage.getItem("userFiles");

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

const plots = {
  "Scatter Plot": [],
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
  displaySubOptions() {
    let currentOption = options[this.state];
    currentOption.displaySubOptions();
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

  changeState(state) {
    this.state = state;
    return this;
  }

  getCurrentState() {
    return this.state;
  }
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
    currentState.displaySubOptions();
  }
}


//TODO: the function actions look similar look for a pattern
// this can be made into a single object or 2 objects one for retrieving data such as dashboards and userfiles
// the other tio return the options
// perhaps classes are anoverkill for the different states of the sub-options
// find the way to include sub sub optioons
