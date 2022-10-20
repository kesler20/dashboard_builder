
export default class Dashboard {
  constructor(title,plots, bgColor) {
    this.title = title
    this.plots = plots // this is a collection off plotly plots and their layouts and their tools
    this.bgColor = bgColor // this is the background color of the dashboard
  }
} 