import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

/**
 * Provides the user the ability to select which graph they want to plot from the actual graph
 *
 * @param FormControl
 * @param InputLabel
 */

const CommandLineSelector = (props) => {
  const [currentFeature, setCurrentFeature] = useState("");

  const handleChange = (e) => {
    setCurrentFeature(e.target.value);
    props.onSubOptionSelected(e.target.value);
  };

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="demo-simple-select-label">
        {props.commandLineData.getCurrentState()}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currentFeature}
        label="Plot"
        onChange={handleChange}
      >
        {props.commandLineData.displaySubOptions().map((option, id) => {
          return (
            <MenuItem key={id} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default CommandLineSelector;
