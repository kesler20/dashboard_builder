


export default class PlotLayout {
  constructor(textColor, paperColor, plotBgColor) {
    this.title = "plot title";
    this.showlegend = true;
    this.font = { color: textColor, size: 18 };
    this.paper_bgcolor = paperColor;
    this.plot_bgcolor = plotBgColor;
  }

  addYaxis = (title, fontColor, gridColor) => {
    this.yaxis = {
      title: title,
      gridcolor: gridColor,
      titlefont: {
        family: "Arial, sans-serif",
        size: 18,
        color: fontColor,
      },
      showline: true,
      gridwidth: 1,
      zerolinewidth: 2,
      autorange: true,
    };
    return this;
  };

  addXaxis = (title, fontColor, gridColor) => {
    this.xaxis = {
      gridcolor: gridColor,
      title: title,
      showgrid: true,
      autorange: true,
      gridwidth: 1,
      zeroline: true,
      titlefont: {
        family: "Arial, sans-serif",
        size: 18,
        color: fontColor,
      },
      showline: true,
      zerolinewidth: 2,
    };
    return this;
  };

  addLogXScale = () => {
    this.xaxis = {
      ...this.xaxis,
      type: "log",
    };
    return this;
  };

  addZAxis = (title) => {
    this.scene = {
      xaxis: { ...this.xaxis },
      yaxis: { ...this.yaxis },
      zaxis: { title: title },
    };
    this.autosize = false;
    this.width = 550;
    this.height = 500;
    this.margin = {
      l: 0,
      r: 0,
      b: 50,
      t: 50,
      pad: 4,
    };
    return this;
  };

  addLogYScale = () => {
    this.yaxis = {
      ...this.yaxis,
      type: "log",
    };
    return this;
  };

  removeXGrid = () => {
    this.xaxis = {
      ...this.xaxis,
      showgriid: false,
    };
    return this;
  };

  removeYGrid = () => {
    this.yaxis = {
      ...this.yaxis,
      showgrid: false,
    };
    return this;
  };

  removeXZeroLine = () => {
    this.xaxis = {
      ...this.xaxis,
      zeroline: false,
    };
    return this;
  };

  removeYZeroLine = () => {
    this.yaxis = {
      ...this.yaxis,
      zeroline: false,
    };
    return this;
  };

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

  // barmode cna be stack or group
  styleBarChart = (barmode) => {
    // for bar charts
    this.barmode = barmode;
    this.bargap = 0.15;
    this.bargroupgap = 0.1;
    return this;
  };

  // barode cna e of overlay or stack
  styleHistograms = (barmode) => {
    this.barmode = barmode;
    return this;
  };

  styleBoxPlot = () => {
    this.boxmode = "group";
    return this;
  };
}
