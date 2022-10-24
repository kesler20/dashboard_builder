import React, { forwardRef } from "react";
import "./InteractivityPanel.css";
import InteractiveToolsNav from "./interactive_tool_nav/InteractiveToolsNav";
import PropertyTab from "./property_tab/PropertyTab";

/**
 * this is the main interactivity tool which is also resizable
 * @props - this includes ``{ viewMode, tabularFIles, filterAbove, filterBelow}``
 */
const InteractivityPanel = forwardRef(({ style, className, ...props }, ref) => {
  
  return props.viewMode === "edit" ? (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={className}
      ref={ref}
      {...props}
    >
      <div
        className="user-interactivity-panel__container"
        style={{ overflow: "hidden" }}
      >
        <InteractiveToolsNav
          properties={Object.keys(props.tabularFiles).map((property, index) => {
            return (
              <PropertyTab
                key={index}
                property={property}
                containerHeight={style.height}
                containerWidth={style.width}
                filterAbove={props.filterAbove}
                filterBelow={props.filterBelow}
              />
            );
          })}
          propertyNames={Object.keys(props.tabularFiles)}
        />
        {props.children[1]}
      </div>
    </div>
  ) : (
    <div
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className={className}
      ref={ref}
    >
      <div
        className="user-interactivity-panel__container"
        style={{ overflow: "hidden" }}
      >
        <InteractiveToolsNav
          properties={Object.keys(props.tabularFiles).map((property, index) => {
            return (
              <PropertyTab
                key={index}
                property={property}
                containerHeight={style.height}
                containerWidth={style.width}
                filterAbove={props.filterAbove}
                filterBelow={props.filterBelow}
              />
            );
          })}
          propertyNames={Object.keys(props.tabularFiles)}
        />
      </div>
    </div>
  );
});

export default InteractivityPanel;
