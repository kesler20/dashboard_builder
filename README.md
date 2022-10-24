## Exampole of a dashboard Builder

using React Grid Layout, Plotly and Matrerial ui

todos

- include tools
- fix the bug of clicking outside the drop down menus
- allow dashboard to save
- make a list of new bugs
- the interactivity tool is not visible at the start
- the interactivity tool can have replicas of the same tool
- add object to layout.js when a new object is added to the dashboard array
- decouple the creation of the plots
- make sure that the other plots are updated adequately when they change with the right useEffects
- rename the plots property to plotMetadata
- make a them selector at the top
- the dark mode of the interactivity tool panel is 
not nice, make sre to include something line a theme selector and a filename selector
- add new tools
- add all the plots which plotly is capable of handling
- rename things
- there is no way to remove the tools once they have been selected
- the tools are not saved

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

perhaps go back to the architecture of having a useEffect of building the plots on the plotComponent 
perhaps change the dashboardBuilder back to te model as the builder functionality is not working and has not been used
find another way to update the dashboard
work on the interactivity tool, can i have multiple tools from different panels?