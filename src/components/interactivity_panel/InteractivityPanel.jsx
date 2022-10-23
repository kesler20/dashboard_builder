import React, { forwardRef } from "react";
import "./InteractivityPanel.css";
import InteractiveToolsNav from "./interactive_tool_nav/InteractiveToolsNav";
import PropertyTab from "./property_tab/PropertyTab";

const InteractivityPanel = forwardRef(({ style, className, ...props }, ref) => {
  return (
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
          properties={props.dashboardData[1].metaData.map((property, index) => {
            return (
              <PropertyTab
                key={index}
                plotID={props.plotID}
                property={property.name}
                containerHeight={style.height}
                containerWidth={style.width}
                filterAbove={props.filterAbove}
                filterBelow={props.filterBelow}
                dashboardData={props.dashboardData}
                dashboardStructure={props.dashboardStructure}
              />
            );
          })}
          propertyNames={props.dashboardData[1].metaData.map((property) => {
            return property.name;
          })}
        />
        {props.viewMode === "edit" ? props.children[1] : <React.Fragment />}
      </div>
    </div>
  );
});

export default InteractivityPanel;
