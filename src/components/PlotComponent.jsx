import React, { forwardRef, useEffect, useState } from "react";
import PlotCommandLine from "./plot_command_line/PlotCommandLine";
import PlotlyInterface from "./DashboardMetaData";
/////////////////////////////////////
//PLOT COMPONENT DISPLAYING THE GRAPH
/////////////////////////////////////

/**
 * This component represents the Plotly graph which is resizable and draggable
 * @see https://github.com/react-grid-layout/react-grid-layout
 *
 * Props:
 *
 */
const PlotComponent = forwardRef(
  (
    {
      style,
      className,
      onRemoveBtnClicked,
      viewMode,
      plotMetaData,
      onFeatureSelected,
      selectedPlotFeature,
      ...props
    },
    ref
  ) => {
    const [plotInfo, setPlotInfo] = useState({
      x: props.data.x,
      y: props.data.y,
      plotType: props.plotType,
    });
    const [plotTheme, setPlotTheme] = useState("");
    /*
    
    - forwardRef takes a component as an argument and it references it to a DOM Element
    - this is used to integrate the Plotly graph as a react grid layout grid item child
    - therefore we need to pass style, className, ref and the other props to the div with the plot ID
    @see section on custom components from  https://github.com/react-grid-layout/react-grid-layout 

    */
    useEffect(() => {
      const plotly = new PlotlyInterface(`plot-${props.plotID}`);
      plotly.addPlotTitle("This is a test plot");
      plotly.addTrace("scatter3d", "test trace 2");

      plotly.addAxisDimension("y", [0, 1, 3, 3, 3, 5, 6, 2, 8, 9], "space", 0);
      plotly.addAxisDimension("x", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
      plotly.addAxisDimension("z", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
      plotly.addScatterPlot(0);
      plotly.addColorDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);
      plotly.addSizeDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);

      console.log(plotly.plotData)
      plotly.constructInitialPlot();
    });

    const handleFeatureOptionSelection = (selection) => {
      if (selectedPlotFeature.name === "Select a File") {
        let selectedFile = selectedPlotFeature.metaData.filter(
          (file) => file.name === selection
        );
        setPlotInfo(
          selectedFile.map((file) => {
            return {
              x: file.data.x,
              y: file.data.y,
              plotType: plotInfo.plotType,
            };
          })[0]
        );
        console.log(
          selectedFile.map((file) => {
            return {
              x: file.data.x,
              y: file.data.y,
              plotType: plotInfo.plotType,
            };
          })[0]
        );
      } else if (selectedPlotFeature.name === "Select a Plot") {
        if (selection === "BarChart") {
          setPlotInfo({ x: plotInfo.x, y: plotInfo.y, plotType: "bar" });
        } else if (selection === "Pie Chart") {
          setPlotInfo({ x: plotInfo.x, y: plotInfo.y, plotType: "pie" });
        } else if (selection === "Heatmap") {
          setPlotInfo({ x: plotInfo.x, y: plotInfo.y, plotType: "heatmap" });
        } else if (selection === "3D Plot") {
          setPlotInfo({ x: plotInfo.x, y: plotInfo.y, plotType: "scatter3d" });
        } else {
          console.log(selection);
        }
      } else if (selectedPlotFeature.name === "Select a Theme") {
        setPlotTheme(selection);
      }
    };

    return (
      <div>
        {viewMode === "edit" ? (
          <div
            style={{ ...style }}
            className={className}
            ref={ref}
            id={`plot-${props.plotID}`}
            {...props}
          >
            {
              <React.Fragment>
                <PlotCommandLine
                  plotMetaData={plotMetaData}
                  onFeatureSelected={(selection) =>
                    onFeatureSelected(selection)
                  }
                  onDeleteBtnClicked={() => onRemoveBtnClicked(props.plotID)}
                  selectedPlotFeature={selectedPlotFeature}
                  onFeatureOptionSelected={(selection) =>
                    handleFeatureOptionSelection(selection)
                  }
                />
                <p className="color-text">Color</p>
                {props.children[1]}
              </React.Fragment>
            }
          </div>
        ) : (
          <div
            style={{ ...style }}
            className={className}
            ref={ref}
            id={`plot-${props.plotID}`}
          ></div>
        )}
      </div>
    );
  }
);

export default PlotComponent;

// TODO: on hover add the text that says what the variables are if there is color and size 
//TODO: remove all this many props and make sure that there is no state for the components
