import React, { forwardRef } from "react";
import PlotCommandLine from "./plot_command_line/PlotCommandLine";

/**
 * This component represents the Plotly graph which is resizable and draggable
 *  - forwardRef takes a component as an argument and it references it to a DOM Element
 *  - this is used to integrate the Plotly graph as a react grid layout grid item child
 *  - therefore we need to pass style, className, ref and the other props to the div with the plot ID
 *  @see section on custom components from  https://github.com/react-grid-layout/react-grid-layout
 */
const PlotComponent = forwardRef(({ style, className, ...props }, ref) => {
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
                onSubOptionSelected={(selectedOption) =>
                  props.onSubOptionSelected(selectedOption, props.plotID)
                }
                commandLineData={props.commandLineData}
                onDeleteBtnClicked={() =>
                  props.onRemoveBtnClicked(props.plotID)
                }
              />
              {/* <p className="color-text">Color</p> */}
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
