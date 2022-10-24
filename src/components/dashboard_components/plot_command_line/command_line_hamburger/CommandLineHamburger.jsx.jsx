import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FaBars } from "react-icons/fa";

/**
 * The command line hamburger is the left most button in the plot command line
 * This is used to select the feature of the dashboard that we want to edit
 *
 * State:
 * - anchorEl - this is used for visual purposes and is included from the implementation
 * of the material ui component
 *
 * Props:
 * - onOptionSelected - this triggers the <PARENT EVENT> and passes the selection name
 * - plotMetaData - a list of objects with properties name and metaData, containing the features of the plot
 * i.e. [ { name: "Select a File", metaData: dashboardThemes } ...]
 */
const CommandLineHamburger = ( props ) => {
  /**
   * - anchorEl, open, handle click and close are used to toggle the component
   * - the onFeatureSelected prop is called within the handleClose method when the user selects a menu item
   */
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (selection) => {
    props.onOptionSelected(selection);
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FaBars />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.commandLineData.displayOptions().map((option, id) => {
          return (
            <MenuItem
              key={id}
              onClick={() => handleClose(option)}
              value={option}
            >
              {option}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default CommandLineHamburger;
