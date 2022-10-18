// you can test those functions https://codepen.io/pen

/**
 * This is an interface for the Plotly Library
 *
 * @param canvasID - this is the id of the div where the plot will be generated
 * @param {*} plotly - this takes the window.Plotly object
 *
 * properties:
 * - fontColor - this will change the font color of the title and y/x axis labels
 * - plotColor - this changes the color of the paper and the plot
 * - gridColor - this changes the color of the grid within the plot
 */
export default class PlotlyInterface {
  constructor(canvasID) {
    this.canvasID = canvasID;
    this.plotly = window.Plotly;

    // this is a collection of traces
    this.plotData = [];
    this.layout = new PlotLayout("scatter");

    this.config = {
      responsive: true,
      editable: true,
      displaylogo: false,
      displayModeBar: true,
      scrollZoom: false,
      showLink: false,
      linkText: "This text is custom!",
      plotlyServerURL: "https://chart-studio.plotly.com",
    };
  }

  addTrace = (type, name) => {
    let orientation = "h";
    let trace = new Trace(type, name);
    if (type === "box") {
      if (orientation === "h") {
        // orientation h -> x otherwise y
      }
      if (seeUnderlyingData) {
        trace.addUnderlyingData();
      }
    }
    this.plotData.push(trace);
    return this;
  };

  addPlotTitle = (title) => {
    this.layout.title = title;
    return this;
  };

  addDimension = (axis, data, label, traceID) => {
    const trace = this.plotData[traceID];
    if (axis === "x") {
      this.trace.x = data;
      this.layout.xaxis.title = label;
    }
  };

  // similar to contours and heatmaps, surfaces accept an array of arrays as a z axis
  // scatter, scatter3d, pie, bar, box, histogram, histogram2dcontour, contour, surface
  // mode includes : markers lines, lines+scatter
  changePlotType = () => {};

  /**
   * Build a plot from scratch
   *
   * @param {*} plotData - array containing the traces of the plot
   *  - i.e. plotData = [ trace1, trace2, ....]
   *  - where traces are { x: [], y: [], mode: "markers", markers : {color : 'blue'}}
   */
  constructInitialPlot(plotData, layout) {
    plotData = plotData === undefined ? this.plotData : plotData;
    layout = layout === undefined ? this.layout : layout;
    this.plotly.newPlot(this.canvasID, plotData, layout, this.config);
  }

  /**
   * Add traces to the initial plot
   *
   * @param newDataY - this is an array of arrays containing the last y value of each trace
   * @param newDataX - this is an array of arrays containing the last x value of each trace
   */
  updateInitialPlot(newDataY, newDataX) {
    const traceIDs = [];
    for (let i = 0; i < newDataY.length; i++) {
      traceIDs.push(i);
    }

    this.plotly.extendTraces(
      this.canvasID,
      {
        y: [...newDataY],
        x: [...newDataX],
      },
      traceIDs
    );

    let dataMatrix = [];
    newDataY.forEach((val) => {
      dataMatrix.push(val[0]);
    });

    if (newDataY.length > 0) {
      this.plotly.relayout(this.canvasID, {
        yaxis: {
          range: [Math.min(...dataMatrix) - 50, Math.max(...dataMatrix) + 50],
        },
      });
    }
  }

  // unlike the update initial plot function the update plot will update the plot in place
  // this is suitable for none real time data updates
  updatePlot() {}
}

// use the state design pattern to make the trace component

export class Trace {
  constructor(type, name) {
    this.name = name;
    this.type = type;
    this.mode = "markers";
    this.x = [];
    this.y = [];
    this.z = [];
    this.showscale = true;
  }

  // a line plot comprise a mode of lines and a type of scatter, this can be edited from the line object

  addDottedLine = (lineWidth) => {
    this.line = {
      dash: "dashdot",
      width: lineWidth,
    };
  };

  addMarker = (color, opacity, size, lineColor, lineWidth) => {
    this.marker = {
      color: color, // to make color change make it an array
      opacity: opacity,
      size: size, // can also be an array []
      line: {
        color: lineColor,
        width: lineWidth,
      },
      symbol: "circle", // this can be other things but please don't
    };
    return this;
  };

  // size is an array
  addRelativeSizeToMarkers = (size) => {
    const desired_maximum_marker_size = 40;
    this.marker = {
      ...this.marker,
      //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)
      size: size,
      sizeref: (2.0 * Math.max(...size)) / desired_maximum_marker_size ** 2,
      sizemode: "area",
    };
    return this;
  };

  // these can be a special type of scatter plots
  addErrorBars = (direction, error_data) => {
    let data = {
      type: "data", // percent
      visible: true,
      type: "constant",
      value: error_data, // this is a number be up to 10
      color: "#85144B",
      thickness: 1.5,
      width: 3,
      opacity: 1,
    };
    if (direction === "y") {
      this.error_y = data;
    } else {
      this.error_x = data;
    }

    return this;
  };

  // pie chart methods

  addValues = (values) => {
    this.values = values;
    return this;
  };

  addLabels = (labels) => {
    this.labels = labels;
    return this;
  };

  addDomain = (row, column) => {
    this.domain = {
      row: row,
      column: column,
    };
    return this;
  };

  // box plot method

  addOutlierDetection = () => {
    // implement boxpoints of suspectedoutliers to display the outlier
    this.marker = {
      ...this.marker,
      color: "rgb(8,81,156)",
      outliercolor: "rgba(219, 64, 82, 0.6)",
      line: {
        outliercolor: "rgba(219, 64, 82, 1.0)",
        outlierwidth: 2,
      },
    };
    return this;
  };

  addUnderlyingData = () => {
    this.boxpoints = "all"; // can also be false to only show the whiskers and suspectedoutliers to show the outliers
    this.jitter = 0.3;
    this.pointpos = -1.8;
    return this;
  };

  // edit all of those when you select the addText method
  // you can use a </br> tag to go to the next line
  addText = () => {
    this.text = [];
    this.textposition = "auto";
    this.textinfo = "none";
    this.insidetextorientation = this.type === "pie" ? "radial" : ""; // this is good for the pie charts
    return this;
  };

  addHoverInfo = () => {
    this.hoverinfo = "label+percent+name"; // can also be set to "none";
    return this;
  };

  removeLegend = () => {
    this.showLegend = false;
    return this;
  };

  changeColorScale = () => {
    this.marker = {
      ...this.marker,
      colorscale: "Jet", // Hot accompaign the hot with a reverse scale of true
    };
    return this;
  };

  addCustomColorScale = () => {
    this.colorscale = [
      [0, "rgb(166,206,227)"],
      [0.25, "rgb(31,120,180)"],
      [0.45, "rgb(178,223,138)"],
      [0.65, "rgb(51,160,44)"],
      [0.85, "rgb(251,154,153)"],
      [1, "rgb(227,26,28)"],
    ];
    return this;
  };

  // this is for adding a normal contour when you have type contours
  addContours = () => {
    this.contours = {
      coloring: "heatmap", // this can also be lines to have lines as a contour
      showlabels: true,
      labelfont: {
        family: "Raleway",
        size: 12,
        color: "white",
      },
    };
    this.ncontours = 20;
    return this;
  };

  // this works when the plot is of the type
  // histogram2dcontour
  // hover it requires an x and y axis
  styleContours = () => {
    this.colorscale = "Hot";
    this.ncontours = 20;
    this.reversescale = true;
    return this;
  };
}

export class PlotLayout {
  constructor(type) {
    this.title = "plot title";
    this.showlegend = true;
    this.font = { color: "", size: 18 };
    this.paper_bgcolor = "";
    this.plot_bgcolor = "";
    this.yaxis = {
      title: "",
      gridcolor: "",
      titlefont: {
        family: "Arial, sans-serif",
        size: 18,
        color: "",
      },
      showline: true,
      zerolinecolor: "",
      zerolinewidth: 2,
    };

    this.xaxis = {
      title: this.xTicks,
      showgrid: false,
      autorange: true,
      gridwidth: 1,
      zeroline: false,
      tickangle: 60,
      range: [],
      titlefont: {
        family: "Arial, sans-serif",
        size: 18,
        color: this.fontColor,
      },
    };
    this.legend = {
      width: 500,
      height: 500,
      y: 0.5,
      yref: "paper",
      font: {
        family: "Arial, sans-serif",
        size: 20,
        color: "grey",
      },
    };

    // for bar charts
    this.barmode = "stack"; // group, for histograms you can use barmode of stack or overlay
    this.bargap = 0.15;
    this.bargroupgap = 0.1;

    //box plots
    this.layout = {
      boxmode: group,
    };
  }
}
