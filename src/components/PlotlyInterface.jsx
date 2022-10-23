import TraceBuilder from "./TraceBuilder";
import LayoutBuilder from "./LayoutBuilder";

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
    this.layout = {};

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

  // the trace removal function should keep the traceIDs as they are
  addTrace(type, name) {
    const traceBuilder = new TraceBuilder(type, name);
    traceBuilder.addMarker().addMode("markers");
    const trace = traceBuilder.buildTrace();
    this.plotData.push(trace);
  }

  addPlotTitle(title) {
    const layoutBuilder = new LayoutBuilder(title);
    this.layout = layoutBuilder.buildLayout();
  }

  addZoomScroll() {
    this.config.scrollZoom = true;
  }

  importTrace(trace, traceID) {
    if (this.plotData.length === 0) {
      this.plotData = [trace];
    } else {
      this.plotData.splice(trace, 0, traceID);
    }
  }

  importLayout(layout) {
    this.layout = layout;
  }

  addAxisDimension(axis, data, label, traceID) {
    // get the desired trace to add dimensions to
    let trace = this.plotData[traceID];

    // initialise a builder for trace and layout and pass it the current data
    // then add the axis, data and the label
    const traceBuilder = new TraceBuilder();
    const layoutBuilder = new LayoutBuilder();
    traceBuilder.addTraceData(trace).addAxis(axis, data);
    layoutBuilder.addLayoutData(this.layout).addAxis(axis, label);

    // style the layout in case of a 3d plot
    if (axis === "z") {
      this.config.scrollZoom = true;
      layoutBuilder.add3DStyles();
    }

    this.layout = layoutBuilder.buildLayout();
  }

  addColorDimension(data, traceID) {
    // assuming that the marker has already being created,
    // and so make sure that no marker has been created after
    let trace = this.plotData[traceID];

    const traceBuilder = new TraceBuilder();
    traceBuilder
      .addTraceData(trace)
      .addColor(data)
      .addColorScale()
      .changeColorScale("Jet");
  }

  addSizeDimension(data, traceID) {
    // assuming that the marker has already being created,
    // and so make sure that no marker has been created after
    let trace = this.plotData[traceID];

    let traceBuilder = new TraceBuilder();
    traceBuilder.addTraceData(trace).addRelativeSizeToMarkers(data);
  }

  addLinePlot(traceID) {
    // get the desired trace
    let trace = this.plotData[traceID];

    const traceBuilder = new TraceBuilder("scatter");
    traceBuilder.addTraceData(trace).addLine().addMode("lines");
  }

  addScatterPlot(traceID) {
    // get the desired trace
    let trace = this.plotData[traceID];

    const traceBuilder = new TraceBuilder("scatter");
    traceBuilder.addTraceData(trace).addMode("markers").addMarker("circle");
  }

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

  removeModeBar() {
    this.config.displayModeBar = false;
  }

  // unlike the update initial plot function the update plot will update the plot in place
  // this is suitable for none real time data updates
  updateStaticPlot() {
    return;
  }
}
