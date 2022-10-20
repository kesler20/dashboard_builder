
const dashboardMetadata = [
  {
    name: "Select a File",
    metaData: [
      {
        name: "Random_data.csv",
        data: {
          x: [],
          y: [],
          z: [],
          marker: {
            size: [],
            color: [],
          },
          plotType: "scatter",
          mode: "markers",
        },
      },
    ],
  },
  {
    name: "Select X axis",
    metaData: [{ name: "Random_dataX", fromPlot: "Random_data.csv" }],
  },
  {
    name: "Select Y axis",
    metaData: [{ name: "Random_dataX", fromPlot: "Random_data.csv" }],
  },
  {
    name: "Select Z axis",
    metaData: [{ name: "Random_dataZ", fromPlot: "Random_data.csv" }],
  },
  {
    name: "Select Marker Size",
    metaData: [{ name: "Random_dataVariable", fromPlot: "Random_data.csv" }],
  },
  {
    name: "Select Marker Color",
    metaData: [{ name: "Random_dataVariable", fromPlot: "Random_data.csv" }],
  },
  {
    name: "Select a Plot",
    metaData: [
      { name: "Scatter Plot" },
      { name: "Line Plot" },
      { name: "Pie Chart" },
      { name: "BarChart" },
      { name: "Heatmap" },
      { name: "3D Plot" },
    ],
  },
  {
    name : "Edit Plot",
    metaData : [
      { name : "horizontal", from : ["BarChart"]},
      { name : "negative values"},
      { name : "negative values"},
    ]
  },
  {
    name: "Select a Theme",
    metaData: [
      { name: "seaborn" },
      { name: "dark" },
      { name: "light" },
      { name: "gray" },
      { name: "default" },
      { name: "transparent" },
    ],
  },
];

export default dashboardMetadata;

//TODO: the function actions look similar look for a pattern
// this can be made into a single object or 2 objects one for retrieving data such as dashboards and userfiles 
// the other tio return the options