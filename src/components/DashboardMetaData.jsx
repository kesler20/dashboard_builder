import Trace from "./Trace";
import PlotLayout from "./LayoutBuilder";
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

  addTrace = (type, name) => {
    const traceBuilder = new TraceBuilder(type, name);
    traceBuilder.addMarker().addMode("markers");
    const trace = traceBuilder.buildTrace();
    this.plotData.push(trace);
  };

  addTitle = (title) => {
    const layoutBuilder = new LayoutBuilder(title);
    this.layout = layoutBuilder.buildLayout();
  };

  addDimension = (axis, data, label, traceID) => {
    // get the desired trace to that dimensions to
    let trace = this.plotData[traceID]

    // initialise a builder for trace and layout and pass it the current data
    const traceBuilder = new TraceBuilder("")
    const layoutBuilder = new LayoutBuilder("")

    traceBuilder.addTraceData(trace).addAxis(axis,data)
    layoutBuilder.addLayoutData(this.layout).addAxis(label,axis)
  };

  // similar to contours and heatmaps, surfaces accept an array of arrays as a z axis
  // scatter, scatter3d, pie, bar, box, histogram, , contour, surface
  // mode includes : markers lines, lines+scatter
  // type scatter , mode lines
  addLinePLot(name, errorBounds, errorBars) {
    // add error bars option
    // add error bounds
    // add dotted line
    const trace = new Trace("scatter", name);
    trace.addLinePLot();
    this.plotData.push(trace);
    if (errorBounds) {
      const lowerBound = new Trace("scatter", "lower bound");
      const higherBound = new Trace("scatter", "higher bound");
      lowerBound.addLinePlot();
      higherBound.addLinePlot();
      higherBound.addFillColor();
      this.plotData = this.plotData.filter((trace) => trace.name === name);
      this.plotData.push(higherBound);
      this.plotData.push(lowerBound);
      this.plotData.push(trace);
    }
  }

  // type scatter , mode markers
  addScatterPlot() {
    return;
  }

  // type scatter 3d, mode markers
  add3DPlot() {}

  // type pie
  addPieChart() {
    // when multiple traces are added and they are both pie charts, stack them up into columns
    return;
  }

  // type bar
  addBarChart() {
    // add group bars
    // by adding
    // barmode: 'group',
    // bargap: 0.15,
    // bargroupgap: 0.1
    // stack them up
    // change orientation
  }

  // type box
  addBoxPLot() {
    // add outlier detection this will include a wiskers only plot and an outlier plot with the same data
    // change orientation
  }

  // histogram
  addHistogram() {
    // change orientation
    // stack them up
    // overlay them
  }

  // contour
  addContourPLot() {
    // add contour lines
  }

  // type histogram2dcontour
  addHistogram2DContour() {
    return;
  }

  // surface
  addSurfacePlot() {}

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
  updateInitialPlot = (newDataY, newDataX) => {
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
  };

  // unlike the update initial plot function the update plot will update the plot in place
  // this is suitable for none real time data updates
  updateStaticPlot() {
    return;
  }
}
