import React, { forwardRef, useEffect, useState } from "react";
import PlotCommandLine from "./plot_command_line/PlotCommandLine";
import PlotlyInterface from "./DashboardMetaData";

/**
 * This component represents the Plotly graph which is resizable and draggable
 *  - forwardRef takes a component as an argument and it references it to a DOM Element
 *  - this is used to integrate the Plotly graph as a react grid layout grid item child
 *  - therefore we need to pass style, className, ref and the other props to the div with the plot ID
 *  @see section on custom components from  https://github.com/react-grid-layout/react-grid-layout
 */
const PlotComponent = forwardRef(({ style, className, ...props }, ref) => {
  // this useEffect is used to synchronize the plots to the changes triggered by the user
  const [plotly, setPlotly ] = useState(
    new PlotlyInterface(`plot-${props.plotID}`)
  );

  useEffect(() => {
    plotly.addPlotTitle("This is a test plot");
    plotly.addTrace("scatter3d", "test trace 2");

    plotly.addAxisDimension("y", [0, 1, 3, 3, 3, 5, 6, 2, 8, 9], "space", 0);
    plotly.addAxisDimension("x", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
    plotly.addAxisDimension("z", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
    plotly.addScatterPlot(0);
    plotly.addColorDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);
    plotly.addSizeDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);
    plotly.constructInitialPlot();
  });
  
  return (
    // display the plot with the command line and the handle if the viewMode is edit, otherwise display the plot
    <div>
      {props.viewMode === "edit" ? (
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
                onOptionSelected={props.onOptionSelected}
                onSubOptionSelected={props.onSubOptionSelected}
                  commandLineData={props.commandLineData}
                onDeleteBtnClicked={() =>
                  props.onRemoveBtnClicked(props.plotID)
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
});

export default PlotComponent;

// TODO: on hover add the text that says what the variables are if there is color and size
//TODO: remove all this many props and make sure that there is no state for the components
// TODO: think about how to push the state up to the container
