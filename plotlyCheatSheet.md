```javascript
// quick way to get random data out
var x = Array.from({ length: 500 }, () => Math.random() * (6 - 3) + 3);
var y = Array.from({ length: 500 }, () => Math.random() * (6 - 3) + 3);

/////////////////////////////////////////
// LIST OF PROPERTIES TO CUSTOMIZE TRACES
/////////////////////////////////////////

let traceTypes = ["scatter3d", "scatter", "bar"];
let traceModes = ["markers", "lines", "lines+markers"];
let opacity = 0; // int from 0 to 1
let marker = {
  color: "rgb",
  size: 1,
  symbol: ["circle", "square", "diamond", "cross"],
  opacity: 0,
  line: { width: 1, color: "blue", dash: "dot" },
};

let layout = {
  xaxis: { type: "date", title: "" },
  yaxis: {},
  title: "",
  showlegend: bool,
};

let config = {
  displaylogo: false,
  displayModeBar: false,
  scrollZoom: true,
  showLink: true,
  plotlyServerURL: "https://chart-studio.plotly.com",
};

/**
 * For pie charts
 * type : pie
 * instead of x and y you use values for y and labels for x
 */

//for the heatmap use
var data = [
  {
    z: [
      [0, 1, 2, 3, 4, 5, 6],
      [1, 9, 4, 7, 5, 2, 4],
      [2, 4, 2, 1, 6, 9, 3],
    ],
    type: "heatmap",
  },
];

// to display the markers being filtered out you can make them fade away

let themes = {
  seaborn: "rgb(234,234,242)",
  dark: "black",
  light: "white",
  gray: "rgb(229,236,246)",
};
```