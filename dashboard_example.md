```javascript
plotly.addPlotTitle(currentFile);
plotly.addTrace("scatter3d", "test trace 2");

plotly.addAxisDimension("y", [0, 1, 3, 3, 3, 5, 6, 2, 8, 9], "space", 0);
plotly.addAxisDimension("x", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
plotly.addAxisDimension("z", [1, 1, 2, 3, 4, 5, 6, 7, 8, 9], "space", 0);
plotly.addScatterPlot(0);
plotly.addColorDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);
plotly.addSizeDimension([0, 1, 3, 3, 3, 5, 6, 2, 8, 9], 0);
plotly.constructInitialPlot();
```