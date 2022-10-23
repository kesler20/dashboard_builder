import React, { useState, useEffect } from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import PlotComponent from "./components/PlotComponent";
import Nav from "./components/dashboard_speedial/Nav";
import DashboardThemeBtn from "./components/DashboardThemeBtn";
import DashboardTitle from "./components/DashboardTitle";
import "./Dashboard.css";
import layouts from "./layouts";
import DashboardBuilder from "./components/DashboardBuilder";
import CommandLineModel, { subOptions } from "./components/CommandLineModel";
import {
  convertFilesToTabularFormat,
  getUserFileId,
  userFileNames,
  userFiles,
} from "./components/DataProcessing";
import TraceBuilder from "./components/TraceBuilder";
import LayoutBuilder from "./components/LayoutBuilder";
import PlotlyInterface from "./components/PlotlyInterface";

const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * The Dashboard container is used to manipulate the data within the Dashboard page
 *
 * State:
 * - dataGrid - this is an object containing {x,y,w,h} used by (RGL) to set the grid dimensions and positions
 * this has to be passed to the GridLayout child component
 * - plotKeys - this is an array of integers which is used to create unique keys and plot ids for plotly
 * - mode - the dashboard can be in one of two modes ['edit','view']
 */
const Dashboard = () => {
  // representational states
  const [mode, setMode] = useState("edit");
  const [theme, setTheme] = useState(true);
  const [currentLayout, setCurrentLayout] = useState([]);

  // data flow states
  // command line model
  const [commandLineData, setCommandLineData] = useState(
    new CommandLineModel()
  );

  // dashboard model
  const [dashboardData, setDashboardData] = useState(
    new DashboardBuilder(
      "Default Title",
      [
        {
          plot: {},
          layout: {},
          dataGrid: { x: 0, y: 0, w: 5, h: 10 },
          tools: {},
        },
      ],
      "white",
      "black"
    )
  );
  // global states
  const [currentAxis, setCurrentAxis] = useState([]);
  const [currentFile, setCurrentFile] = useState("");
  const [tabularFiles, setTabularFiles] = useState({});
  const [currentUserSelection, setCurrentUserSelection] = useState("");

  useEffect(() => {
    if (currentLayout !== []) {
      const { plot, layout } = dashboardData.plots[0];
      const plotly = new PlotlyInterface("plot-0");
      plotly.importTrace(plot, 0);
      plotly.importLayout(layout);
      console.log(plotly.plotData[0], plotly.layout);
      plotly.constructInitialPlot();
    }
  }, [currentLayout]);

  useEffect(() => {
    if (currentUserSelection !== "") {
      const { plot, layout } = dashboardData.plots[0];
      const plotly = new PlotlyInterface("plot-0");
      plotly.importTrace(plot, 0);
      plotly.importLayout(layout);
      console.log(plotly.plotData[0], plotly.layout);
      plotly.constructInitialPlot();
    }
  }, [currentUserSelection]);

  useEffect(() => {
    if (theme !== true) {
      const { plot, layout } = dashboardData.plots[0];
      const plotly = new PlotlyInterface("plot-0");
      plotly.importTrace(plot, 0);
      plotly.importLayout(layout);
      console.log(plotly.plotData[0], plotly.layout);
      plotly.constructInitialPlot();
    }
  }, [theme]);

  /**
   * Handles the navbar click event of Add Plot, Save/ Edit Dashboard
   *
   * @param btnName name of the btn being clicked i.e. "Add Plot"
   *
   * @returns
   * - if the btnName variable does not match any of the cases
   * a "nav clicked" message will be logged
   */
  const handleNavBtnClicked = (btnName) => {
    if (btnName === "Add Plot") {
      setDashboardData(dashboardData.addPlot());
    } else if (btnName === "Save Dashboard") {
      setMode("save");
    } else if (btnName === "Edit Dashboard") {
      setMode("edit");
    } else {
      console.log("nav clicked");
    }
  };

  /**
   * this is triggered when the delete button on a plot command line is clicked
   * @param {*} plotKey - the index of the plot in the dashboard
   */
  const handleRemovePlot = (plotKey) => {
    dashboardData.removePlot(plotKey);
  };

  /**
   * this is triggered when the used selects an option in the hamburger menu dropdown
   *
   * compound updates such a updating the axis
   * (an update which requires data from the selection and the selectedOption) can be implemented
   * using an array if there are the right control in plage
   * initially you push one piece of information to the array when the user selects an option form the
   * hamburger menu, then you push the other when the user selects the option from the main drop down menu
   *
   * @param {*} selection - this is the option selected by the user which will be used
   * to change the state of the command line model
   */
  const handleOptionSelected = (selection) => {
    // update the command line model
    setCommandLineData(commandLineData.changeState(selection));

    // update the global variables
    if (selection === "Select X axis") {
      setCurrentAxis(["x"]);
    } else if (selection === "Select Y axis") {
      setCurrentAxis(["y"]);
    } else if (selection === "Select Z axis") {
      setCurrentAxis(["z"]);
    } else if (selection === "Select Color") {
      setCurrentAxis(["color"]);
    } else if (selection === "Select Size") {
      setCurrentAxis(["size"]);
    } else {
      console.log(selection);
    }

    // update state
    setCurrentUserSelection(selection);
  };

  /**
   * this is used to handle the user selection of the options on main drown menu
   * @param {*} selectedOption
   */
  const handleSubOptionSelected = (selectedOption, id) => {
    // update the command line model
    setCommandLineData(commandLineData.changeCurrentFile(selectedOption));

    /**
     * initialize the traceBuilder
     * initialize the layout builder
     * and the plot which will be passed to the dashboardBuilder
     */
    const traceBuilder = new TraceBuilder("scatter", "test trace");
    const layoutBuilder = new LayoutBuilder("Test Plot");
    const { plot, layout } = dashboardData.plots[0];

    // import any existing data from the dashboardBuilder
    traceBuilder.addTraceData(plot);
    layoutBuilder.addLayoutData(layout);

    /**
     * handle user files selection
     * if the selectedOption is in the fileNames array
     * update the currentFile global variable
     * update the tabularFiles with the relevant columns of data
     * update the layout of the plot with a new title
     */
    if (userFileNames.indexOf(selectedOption) !== -1) {
      setCurrentFile(selectedOption);
      setTabularFiles(
        convertFilesToTabularFormat(userFiles)[getUserFileId(selectedOption)]
      );
      layoutBuilder.addTitle(selectedOption);
    }

    /**
     * handle axis selection
     * check if the selectedOption correspond to one of the columns of the file
     * to update the axis a compound update is required
     * therefore the currentAxis is used as selected dimension
     * if no value was pushed to the currentAxis then this will throw an alert
     */
    const columns = Object.keys(tabularFiles);
    if (columns.indexOf(selectedOption) !== -1) {
      if (currentAxis.length >= 0) {
        // get the axis data from one of the columns of the tabularFiles
        traceBuilder.addAxis(currentAxis[0], tabularFiles[selectedOption]);
        layoutBuilder.addAxis(currentAxis[0], selectedOption);
        // control fgr different axis such as color and size
        // control for different plots such as pie charts
      }
    }

    /**
     * handle plot selection
     * check if the selectedOption is in the plot array
     * update the trace builder
     */
    if (subOptions["Select a Plot"].indexOf(selectedOption) !== -1) {
      if (selectedOption === "Scatter Plot") {
        // add type: scatter, mode : scatter,
        // and marker circle with an opacity of .8
        traceBuilder
          .addMarker("circle")
          .addMode("markers")
          .addMarkerLine()
          .addPlotType("scatter");
      } else if (selectedOption === "Line Plot") {
        traceBuilder.addLine().addMode("lines").addPlotType("scatter");
      } else if (selectedOption === "Pie Chart") {
        traceBuilder.addPlotType("pie").addHoverInfo("label+percent+name");
      } else if (selectedOption === "Histogram") {
        traceBuilder.addPlotType("histogram").addOpacity(0.5);
      } else if (selectedOption === "Box Plot") {
        traceBuilder.addPlotType("box").addBoxPoints("all").addUnderlyingData();
      } else if (selectedOption === "BarChart") {
        traceBuilder
          .addPlotType("bar")
          .addMarker("circle")
          .addColor("rgb(55,83,109)");
      } else if (selectedOption === "Heatmap") {
        traceBuilder.addPlotType("heatmap");
      } else if (selectedOption === "3D Plot") {
        traceBuilder
          .addPlotType("scatter3d")
          .addMode("markers")
          .addMarker("circle");
        layoutBuilder.add3DStyles();
      }
    }

    /**
     * handle the theme of the plot
     */
    if (subOptions["Select a Theme"].indexOf(selectedOption) !== -1) {
      let backgroundColor;
      let paperBgColor;
      let gridColor;
      if (selectedOption === "transparent") {
        backgroundColor = theme
          ? dashboardData.bgColor
          : dashboardData.darkBgColor;
        paperBgColor = theme
          ? dashboardData.bgColor
          : dashboardData.darkBgColor;
        gridColor = theme ? dashboardData.bgColor : dashboardData.darkBgColor;
        layoutBuilder.removeZeroLine("x").removeZeroLine("y");
        layoutBuilder.styleFont(gridColor, "Arial, sans-serif", 14);
        // update the theme
      } else if (selectedOption === "default") {
        backgroundColor = "#eaeaf2";
        paperBgColor = "#eaeaf2";
        gridColor = "#d6dde6";
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
        layoutBuilder.styleFont("black", "Arial, sans-serif", 14);
      } else if (selectedOption === "light") {
        backgroundColor = "white";
        paperBgColor = "white";
        gridColor = "#d6dde6";
        layoutBuilder.styleFont("black", "Arial, sans-serif", 14);
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
      } else if (selectedOption === "gray") {
        backgroundColor = "#e5ecf6";
        paperBgColor = "#e5ecf6";
        gridColor = "#d6dde6";
        layoutBuilder.styleFont("black", "Arial, sans-serif", 14);
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
      } else if (selectedOption === "dark") {
        backgroundColor = "#1b2444";
        paperBgColor = "#1b2444";
        gridColor = "#768db7";
        layoutBuilder.styleFont("#33ffe6", "Arial, sans-serif", 14);
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
      } else if (selectedOption === "seaborn") {
        backgroundColor = "#e5ecf6";
        paperBgColor = "white";
        gridColor = "white";
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
        layoutBuilder.styleFont("black", "Arial, sans-serif", 14);
      } else {
        backgroundColor = "gray";
        paperBgColor = "white";
        gridColor = "white";
        layoutBuilder.addZeroLine("x", gridColor).addZeroLine("y", gridColor);
        layoutBuilder.styleFont("black", "Arial, sans-serif", 14);
      }
      layoutBuilder.styleBgColor(paperBgColor, backgroundColor);
      layoutBuilder.addGrid(gridColor, "x");
      layoutBuilder.addGrid(gridColor, "y");
    }

    /**
     * handle the tool selection
     */

    /**
     * updating the layout and the plot object of the correct plot
     */
    dashboardData.addPlotObject(traceBuilder.buildTrace(), 0);
    dashboardData.addLayoutObject(layoutBuilder.buildLayout(), 0);
    setDashboardData(dashboardData.buildDashboard());
    // update state
    setCurrentUserSelection(selectedOption);
  };

  return (
    <div>
      <div className="flex-column">
        {/* dashboard navbar  */}
        <div
          className={theme ? "dashboard__nav--light" : "dashboard__nav--dark"}
        >
          <div className="flex-space-evenly">
            <DashboardTitle viewMode={mode} theme={theme} />
            <DashboardThemeBtn onThemeChange={() => setTheme(!theme)} />
          </div>
        </div>

        {/* dashboard plots */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            backgroundColor: `${
              theme ? dashboardData.bgColor : dashboardData.darkBgColor
            }`,
          }}
        >
          {/* grid layout */}
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            onLayoutChange={setCurrentLayout}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          >
            {dashboardData.plots.map((plotMetadata, id) => {
              const { plot, dataGrid } = plotMetadata;
              return (
                <PlotComponent
                  // required props for react, react grid layout, plotly
                  key={id}
                  data-grid={dataGrid}
                  plotID={id}
                  // representational properties
                  viewMode={mode}
                  // structural properties
                  data={plot}
                  onRemoveBtnClicked={handleRemovePlot}
                  // data processing properties
                  commandLineData={commandLineData}
                  onOptionSelected={handleOptionSelected}
                  onSubOptionSelected={handleSubOptionSelected}
                />
              );
            })}
          </ResponsiveGridLayout>
        </div>
        {/* dashboard speed dial */}
        <Nav onNavBtnClicked={(btnName) => handleNavBtnClicked(btnName)} />
      </div>
    </div>
  );
};

export default Dashboard;

//TODO: perhaps add a preview mode ?
//TODO: simplify the architecture by having a single source of truth on the dashboard structures
// TODO: pass dashboard structure as a prop
