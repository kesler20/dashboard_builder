import React, { useState } from "react";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import { Responsive, WidthProvider } from "react-grid-layout";
import PlotComponent from "./components/PlotComponent";
import Nav from "./components/dashboard_speedial/Nav";
import DashboardThemeBtn from "./components/DashboardThemeBtn";
import DashboardTitle from "./components/DashboardTitle";
import "./Dashboard.css";
import layouts from "./layouts";
import DashboardModel from "./components/DashboardModel";
import CommandLineModel from "./components/CommandLineModel";

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
  // representational stastes
  const [mode, setMode] = useState("edit");
  const [theme, setTheme] = useState(true);
  const [currentLayout, setCurrentLayout] = useState([]);

  // data processing states
  // command line model
  const [commandLineData, setCommandLineData] = useState(
    new CommandLineModel()
  );

  // dashboard model
  const [dashboardData, setDashboardData] = useState(
    new DashboardModel(
      "Default Title",
      [
        {
          plots: {},
          dataGrid: { x: 0, y: 0, w: 5, h: 10 },
          tools: {},
        },
      ],
      "white",
      "black"
    )
  );

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
      dashboardData.addPlot();
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
   * @param {*} selection - this is the option selected by the user which will be used
   * to change the state of the command line model
   */
  const handleOptionSelected = (selection) => {
    setCommandLineData(commandLineData.changeState(selection));
  };

  /**
   * this is used to handle the user selection of the options on main drown menu
   * @param {*} selectedOption 
   */
  const handleSubOptionSelected = (selectedOption) => {
    setCommandLineData(commandLineData.changeCurrentFile(selectedOption));
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
