

export default class DashboardModel {
  constructor(title, plots, bgColor, darkBgColor) {
    this.title = title;
    this.plots = plots; // this is a collection off plotly plots and their layouts and their tools
    this.bgColor = bgColor; // this is the background color of the dashboard
    this.darkBgColor = darkBgColor;
  }

  addPlot() {
    this.plots.push({
      plot: {},
      dataGrid: { x: 0, y: 0, w: 5, h: 10 },
      tools: {},
    });
  }

  removePlot(plotID) {
    this.plots = this.plots.filter(
      (plot) => this.plots.indexOf(plot) === plotID
    );
  }

  addDashboardTitle(title) {
    this.title = title;
  }

  addBgColor(bgColor) {
    this.bgColor = bgColor;
  }

  addDarkBgColor(darkBgColor) {
    this.darkBgColor = darkBgColor;
  }
}
