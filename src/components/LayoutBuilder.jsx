/**
 * this is a builder (look at the builder pattern) which is used to build layout objects
 * in plotly javascript.
 */
export default class LayoutBuilder {
  /**
   * a layoutBuilder cna be used to build the layout object, this can then be
   * initialised using the ``buildLayout()`` method
   * @param {*} title - this refers to the title of the plot
   */
  constructor(title) {
    this.title = title;
  }

  /**
   * this is a private internal method used to update properties of the layout object
   * @param {*} axis - this is the axis x, y, z
   * @param {*} key - this is the property which needs to be targeted
   * @param {*} value - this is the value which needs to be assigned
   * @returns this
   */
  updateAxis = (axis, key, value) => {
    if (axis === "y") {
      this.yaxis[`${key}`] = value;
    } else if (axis === "x") {
      this.xaxis[`${key}`] = value;
    } else {
      this.scene = {
        xaxis: this.xaxis,
        yaxis: this.yaxis,
      };
      this.scene["zaxis"][`${key}`] = value;
    }
    return this;
  };

  /**
   * this will change font o the plot
   * @param {*} color - this changes the color of the plot
   * @param {*} family - this changes the font family typicaly "Arial, sans-serif"
   * @param {*} size - this changes the font size typically 18
   * @returns this
   */
  styleFont = (color, family, size) => {
    this.font = {
      color,
      family,
      size,
    };
    return this;
  };

  /**
   * this will change the background color of the paper and the plot
   * @param {*} paperColor - this changes the color of the plot image
   * @param {*} plotBgColor - this changes the background color of the lot
   * @returns this
   */
  styleBgColor = (paperColor, plotBgColor) => {
    this.paper_bgcolor = paperColor;
    this.plot_bgcolor = plotBgColor;
    return this;
  };

  /**
   * this can be used to add a grid to the desired axis and add color
   * @param {*} gridcolor - this is the color of the grid line
   * @param {*} axis - this is the desired axis
   * @returns this
   */
  addGrid = (gridcolor, axis) => {
    this.updateAxis(axis, "gridcolor", gridcolor);
    return this;
  };

  /**
   * this can be used to style the x or the y axis
   * @param {*} showline - boolean can be true or false
   * @param {*} gridwidth - number typically 1
   * @param {*} showgrid - boolean can be true or false
   * @param {*} zerolinewidth - number typically 2
   * @param {*} autorange - boolean can be true or false
   * @returns this
   */
  styleAxis = (showline, gridwidth, showgrid, zerolinewidth, autorange) => {
    this.updateAxis(axis, "showline", showline);
    this.updateAxis(axis, "gridwidth", gridwidth);
    this.updateAxis(axis, "showgrid", showgrid);
    this.updateAxis(axis, "zerolinewidth", zerolinewidth);
    this.updateAxis(axis, "autorange", autorange);
    return this;
  };

  /**
   * this can be used to style the text of the axis
   * @param {*} family - font family of the axis being styled typically "Arial, sans-serif"
   * @param {*} size - font size of the axis typically 18
   * @param {*} color - color of the text of the axis
   * @returns this
   */
  styleAxisFont = (axis, family, size, color) => {
    this.data = {
      family,
      size,
      color,
    };
    this.updateAxis(axis, "titlefont", data);
    return this;
  };

  /**
   * this will add the label to the desired axis 
   * @param {*} title - this is the name of the axis
   * @param {*} axis - this is the selected axis
   * @returns this
   */
  addAxis = (title, axis) => {
    this.updateAxis(axis, "title", title);
    return this;
  };

  /**
   * this can be used to change the axis to a log scale
   * @param {*} axis - this can be x , y ,z
   * @returns this
   */
  addLogScale = (axis) => {
    this.updateAxis(axis, "type", "log");
    return this;
  };

  /**
   * this will add a margin object to he body of the layout object
   * @param {*} l - this
   * @param {*} r - this
   * @param {*} b - this
   * @param {*} t - this
   * @param {*} pad - this
   * @returns ths
   */
  addMargin = (l, r, b, t, pad) => {
    this.margin = {
      l,
      r,
      b,
      t,
      pad,
    };
    return this;
  };

  /**
   * this removes the grid in a particular direction by adding ``showgrid : false``
   * @param {*} axis - this is the axis you want to remove the grid for
   * @returns
   */
  removeGrid = (axis) => {
    this.updateAxis(axis, "shogrid", false);
    return this;
  };

  /**
   * add ``zeroline : false`` to the selected axis object
   * @params axis - this is the axis that will be applied the transformation too
   * @returns this
   */
  removeZeroLine = (axis) => {
    this.updateAxis(axis, "zeroline", false);
    return this;
  };

  /**
   * this adds a legend by adding the following object to the body
   * of the layout:
   * ```javascript
   * legend : {
   *   width : 500,
   *   height : 500,
   *   y : 0.5,
   *   yref : "paper",
   *   font : {
   *   family : "Arial, sans-serif",
   *   size : 20,
   *   color : "black"
   *  },
   * }
   * ```
   * @returns this
   */
  addLegend = () => {
    this.legend = {
      width: 500,
      height: 500,
      y: 0.5,
      yref: "paper",
      font: {
        family: "Arial, sans-serif",
        size: 20,
        color: "black",
      },
    };
    return this;
  };

  /**
   * this can be used to change the configuration of the bar charts
   * @param {*} barmode - this can be "stack" or "group"
   * @returns this
   */
  styleBarChart = (barmode) => {
    this.barmode = barmode;
    this.bargap = 0.15;
    this.bargroupgap = 0.1;
    return this;
  };

  /**
   * this can be used to change the configuration of histograms
   * @param {*} barmode - this can be "stack" or "overlay"
   * @returns this
   */
  styleHistograms = (barmode) => {
    this.barmode = barmode;
    return this;
  };

  /**
   * this can be used to group box plots
   * this will return ``boxmode : "group"``
   * @returns this
   */
  styleBoxPlot = () => {
    this.boxmode = "group";
    return this;
  };

  /**
   * this is used to return the find body of the layout
   * @returns this
   */
  buildLayout = () => {
    return this;
  };
}
