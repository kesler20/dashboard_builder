## How is plotly structured


plotly can be implemented via a cdn https://cdn.plot.ly/plotly-2.14.0.min.js

then it can be initialised from the window as follows:

```javascript

const Plotly = window.Plotly

```

and it can be plotted from the following

```javascript

Plotly.newPlot("div", [trace1, trace2], layout, config)

```


#### Traces & Markers  

where div refers to the canvas where the plot will be located and the traces are

objects of the following format

```javascript

const trace1 = {

  x: [1, 2, 3, 4], // can be an array of strings in case of bar charts

  y: [10, 15, 13, 17],

  name: "name of the markers",

  mode: "markers", //lines , lines+markers,

  type: "scatter", // pie, scatter3d, heatmap, bar

  text: [

    'A<br>size: 40',

    'B<br>size: 60',

    'C<br>size: 80',

    'D<br>size: 100'

  ], // text that is added to the default coordinates tet on hover, <br> refers to break

  textposition: "auto",

  hoverinfo: "none",

  opacity: 0.6,

  showlegend: false,

  marker: {

    color: "rgb(158,202,225)", // to make color change make it an array

    opacity: 0.6,

    size : [0,1,2,3]

    line: {

      color: "rgb(8,48,107)",

      width: 1.5,

    },

  },

};

  

```

traces contain markers, markers are objects which also have a line object o size the markers in a relaive manner you can use sizeref using the formula below

```javascript

var desired_maximum_marker_size = 40;

var size = [400, 600, 800, 1000];

var trace4 = {

  x: [1, 2, 3, 4],

  y: [26, 27, 28, 29],

  text: ['A</br>size: 40</br>sixeref: 1.25', 'B</br>size: 60</br>sixeref: 1.25', 'C</br>size: 80</br>sixeref: 1.25', 'D</br>size: 100</br>sixeref: 1.25'],

  mode: 'markers',

  marker: {

    size: size,

    //set 'sizeref' to an 'ideal' size given by the formula sizeref = 2. * max(array_of_size_values) / (desired_maximum_marker_size ** 2)

    sizeref: 2.0 * Math.max(...size) / (desired_maximum_marker_size**2),

    sizemode: 'area'

  }

};

```

  
  

### Barcharts

to initialise a bar chart you can specify the width and the type to be  "bar"
the following image shows how multiople traces are rendered side by side
![[Pasted image 20221017175637.png]]
```javascript

var trace1 = {

  x: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],

  y: [20, 14, 23, 25, 22],

  width : [20, 14, 23, 0.25, 0.22],

  marker:{

    color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)', 'rgba(204,204,204,1)']

  },

  type: 'bar'

};

  

```

By changing opacity you can make the other one fade![[Pasted image 20221017175910.png]]
```javascript
var xValue = ['Product A', 'Product B', 'Product C'];

var yValue = [20, 14, 23];
var yValue2 = [24, 16, 20];

var trace1 = {
  x: xValue,
  y: yValue,
  type: 'bar',
  text: yValue.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  opacity: 0.5,
  marker: {
    color: 'rgb(158,202,225)',
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};

var trace2 = {
  x: xValue,
  y: yValue2,
  type: 'bar',
  text: yValue2.map(String),
  textposition: 'auto',
  hoverinfo: 'none',
  marker: {
    color: 'rgba(58,200,225,.5)',
    line: {
      color: 'rgb(8,48,107)',
      width: 1.5
    }
  }
};

var data = [trace1,trace2];

var layout = {
  title: 'January 2013 Sales Report'
};

Plotly.newPlot('myDiv', data, layout);

```

you can also cxhange the color of a specific value within the trace to show that a value has been selected
![[Pasted image 20221017180020.png]]

Example of negative and posuitive bars
![[Pasted image 20221017180107.png]]
```javascript

var data = [

  {

    type: 'bar',

    x: ['2016','2017','2018'],

    y: [500,600,700],

    base: [-500,-600,-700],

    hovertemplate: '%{base}',

    marker: {

      color: 'red'

    },

    name: 'expenses'

  },

  {

    type: 'bar',

    x: ['2016','2017','2018'],

    y: [300,400,700],

    base: 0,

    marker: {

      color: 'blue'

    },

    name: 'revenue'

  }]

  

// for pie charts

  

const trace = {

  values: [19, 26,55],

  labels: ["Residential", "None-Residential", "Utility"],

  type: "pie",

    marker: {

    colors: ultimateColors[1]

  },

  domain: {

    row: 1,

    column: 0

  },

  hoverinfo: 'label+percent+name',

  textinfo: 'none',

  insidetextorientation: "radial"

}

  
  
```

finally the different colors cna also highlight two different traces
![[Pasted image 20221017180404.png]]
```javascript
var trace1 = {
  x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
  y: [219, 146, 112, 127, 124, 180, 236, 207, 236, 263, 350, 430, 474, 526, 488, 537, 500, 439],
  name: 'Rest of world',
  marker: {color: 'rgb(55, 83, 109)'},
  type: 'bar'
};

var trace2 = {
  x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
  y: [16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270, 299, 340, 403, 549, 499],
  name: 'China',
  marker: {color: 'rgb(26, 118, 255)'},
  type: 'bar'
};

var data = [trace1, trace2];

var layout = {
  title: 'US Export of Plastic Scrap',
  xaxis: {tickfont: {
      size: 14,
      color: 'rgb(107, 107, 107)'
    }},
  yaxis: {
    title: 'USD (millions)',
    titlefont: {
      size: 16,
      color: 'rgb(107, 107, 107)'
    },
    tickfont: {
      size: 14,
      color: 'rgb(107, 107, 107)'
    }
  },
  legend: {
    x: 0,
    y: 1.0,
    bgcolor: 'rgba(255, 255, 255, 0)',
    bordercolor: 'rgba(255, 255, 255, 0)'
  },
  barmode: 'group',
  bargap: 0.15,
  bargroupgap: 0.1
};

Plotly.newPlot('myDiv', data, layout);

```

#### Symmetric error bars
for error bars thye following simple code cna be applied
making the color of the line different to the error bars may generate cool visualisations
![[Pasted image 20221017180658.png]]
```javascript
var data = [

  {

    x: [0, 1, 2],

    y: [6, 10, 2],

    error_y: {

      type: 'data',

      array: [1, 2, 3],

      visible: true,

      type: 'constant',

      value: 0.1,

      color: '#85144B',

      thickness: 1.5,

      width: 3,

      opacity: 1

    },

    type: 'scatter'

  }

];

  
var data = [

  {

    x: [1, 2, 3, 4],

    y: [2, 1, 3, 4],

    error_x: {

      type: 'percent',

      value: 10

    },

    type: 'scatter'

  }

];

Plotly.newPlot('myDiv', data);
```

#### Box Plots

the following box plot when you hover it gives cool information about median mean and other measures of spread, __to color boxplots you need make the marker color different__
![[Pasted image 20221017180942.png]]
```javascript
var y0 = [];
var y1 = [];
for (var i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 1;
}

var trace1 = {
  y: y0,
  type: 'box'
};

var trace2 = {
  y: y1,
  type: 'box'
};

var data = [trace1, trace2];

Plotly.newPlot('myDiv', data);

```
The following box plot shows the underlying data
![[Pasted image 20221017181052.png]]
```javascript

var data = [
  {
    y: [0, 1, 1, 2, 3, 5, 8, 13, 21],
    boxpoints: 'all',
    jitter: 0.3,
    pointpos: -1.8,
    type: 'box'
  }
];

Plotly.newPlot('myDiv', data);

```
Horizontal box plots instead look like the following
![[Pasted image 20221017181257.png]]
```javascript
var trace1 = {
  x: [1, 2, 3, 4, 4, 4, 8, 9, 10],
  type: 'box',
  name: 'Set 1'
};

var trace2 = {
  x: [2, 3, 3, 3, 3, 5, 6, 6, 7],
  type: 'box',
  name: 'Set 2'
};

var data = [trace1, trace2];

var layout = {
  title: 'Horizontal Box Plot'
};

Plotly.newPlot('myDiv', data, layout);
```
The following example shows how to style outliers using box plots, in this case the oputliers are styled in red
![[Pasted image 20221017181725.png]]
```javascript
var trace1 = {
  y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
  type: 'box',
  name: 'All Points',
  jitter: 0.3,
  pointpos: -1.8,
  marker: {
    color: 'rgb(7,40,89)'
  },
  boxpoints: 'all'
};

var trace2 = {
  y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
  type: 'box',
  name: 'Only Wiskers',
  marker: {
    color: 'rgb(9,56,125)'
  },
  boxpoints: false
};

var trace3 = {
  y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
  type: 'box',
  name: 'Suspected Outlier',
  marker: {
    color: 'rgb(8,81,156)',
    outliercolor: 'rgba(219, 64, 82, 0.6)',
    line: {
      outliercolor: 'rgba(219, 64, 82, 1.0)',
      outlierwidth: 2
    }
  },
  boxpoints: 'suspectedoutliers'
};

var trace4 = {
  y: [0.75, 5.25, 5.5, 6, 6.2, 6.6, 6.80, 7.0, 7.2, 7.5, 7.5, 7.75, 8.15, 8.15, 8.65, 8.93, 9.2, 9.5, 10, 10.25, 11.5, 12, 16, 20.90, 22.3, 23.25],
  type: 'box',
  name: 'Wiskers and Outliers',
  marker: {
    color: 'rgb(107,174,214)'
  },
  boxpoints: 'Outliers'
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: 'Box Plot Styling Outliers'
};

Plotly.newPlot('myDiv', data, layout);

```
#### Histograms
histograms can be mainly represented as stacked or overlapping
the following is an example of an overlapping histogram![[Pasted image 20221017182434.png]]
```javascript
var x1 = [];
var x2 = [];
for (var i = 1; i < 500; i++)
{
	k = Math.random();
	x1.push(Math.random() + 1);
	x2.push(Math.random() + 1.1);
}
var trace1 = {
  x: x1,
  type: "histogram",
  opacity: 0.5,
  marker: {
     color: 'green',
  },
};
var trace2 = {
  x: x2,
  type: "histogram",
  opacity: 0.6,
  marker: {
     color: 'red',
  },
};

var data = [trace1, trace2];
var layout = {barmode: "overlay"};
Plotly.newPlot('myDiv', data, layout);

```
Whereas a histogram which is stacked may represented as follows
![[Pasted image 20221017182454.png]]
```javascript
var x1 = [];
var x2 = [];
for (var i = 0; i < 500; i ++) {
	x1[i] = Math.random();
	x2[i] = Math.random();
}

var trace1 = {
  x: x1,
  type: "histogram",
};
var trace2 = {
  x: x2,
  type: "histogram",
};
var data = [trace1, trace2];
var layout = {barmode: "stack"};
Plotly.newPlot('myDiv', data, layout);

```
finally histograms can also be represented horizontally![[Pasted image 20221017182707.png]]
```javascript
var y = [];
for (var i = 0; i < 500; i ++) {
	y[i] = Math.random();
}

var data = [
  {
    y: y,
    type: 'histogram',
	marker: {
    color: 'pink',
	},
  }
];
Plotly.newPlot('myDiv', data);
	
```
#### Histogram 2D Contours
The following code can produce the contours shown below
![[Pasted image 20221017183123.png]]
```javascript
// from http://bl.ocks.org/mbostock/4349187
// Sample from a normal distribution with mean 0, stddev 1.

function normal() {
    var x = 0,
        y = 0,
        rds, c;
    do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c; // throw away extra sample y * c
}

var N = 2000,
  a = -1,
  b = 1.2;

var step = (b - a) / (N - 1);
var t = new Array(N), x = new Array(N), y = new Array(N);

for(var i = 0; i < N; i++){
  t[i] = a + step * i;
  x[i] = (Math.pow(t[i], 3)) + (0.3 * normal() );
  y[i] = (Math.pow(t[i], 6)) + (0.3 * normal() );
}

var trace1 = {
  x: x,
  y: y,
  mode: 'markers',
  name: 'points',
  marker: {
    color: 'rgb(102,0,0)',
    size: 2,
    opacity: 0.4
  },
  type: 'scatter'
};
var trace2 = {
  x: x,
  y: y,
  name: 'density',
  ncontours: 20,
  colorscale: 'Hot',
  reversescale: true,
  showscale: false,
  type: 'histogram2dcontour'
};
var trace3 = {
  x: x,
  name: 'x density',
  marker: {color: 'rgb(102,0,0)'},
  yaxis: 'y2',
  type: 'histogram'
};
var trace4 = {
  y: y,
  name: 'y density',
  marker: {color: 'rgb(102,0,0)'},
  xaxis: 'x2',
  type: 'histogram'
};
var data = [trace1, trace2, trace3, trace4];
var layout = {
  showlegend: false,
  autosize: false,
  width: 600,
  height: 550,
  margin: {t: 50},
  hovermode: 'closest',
  bargap: 0,
  xaxis: {
    domain: [0, 0.85],
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    domain: [0, 0.85],
    showgrid: false,
    zeroline: false
  },
  xaxis2: {
    domain: [0.85, 1],
    showgrid: false,
    zeroline: false
  },
  yaxis2: {
    domain: [0.85, 1],
    showgrid: false,
    zeroline: false
  }
};
Plotly.newPlot('myDiv', data, layout);

```
### Statistical Error plots like SEEQs
![[Pasted image 20221017183319.png]]
```javascript
function random_date(start, end, mul) 
  {
    return new Date(start.getTime() + mul * (end.getTime() - start.getTime()));
  }

function date_list(y1,m1,d1,y2,m2,d2,count)
  {
    var a =[];
    for(i=0;i<count;i++)
    {
      a.push(random_date(new Date(y1, m1, d1), new Date(y2,m2,d2),i));
    }
      return a;
  }

function random_number(num , mul) 
  {
     var value = [ ];
     for(i=0;i<=num;i++)
      {
        var rand = Math.random() * mul;
        value.push(rand);
      }
     return value;
  }

var trace1 = {
  x: date_list(2001,01,01,2001,02,01,50), 
  y: random_number(50,20), 
  line: {width: 0}, 
  marker: {color: "444"}, 
  mode: "lines", 
  name: "Lower Bound", 
  type: "scatter"
};

var trace2 = {
  x: date_list(2001,01,01,2001,02,01,50), 
  y: random_number(50,21),
  fill: "tonexty", 
  fillcolor: "rgba(68, 68, 68, 0.3)", 
  line: {color: "rgb(31, 119, 180)"}, 
  mode: "lines", 
  name: "Measurement", 
  type: "scatter"
};

var trace3 = {
  x: date_list(2001,01,01,2001,02,01,50), 
  y: random_number(50,22),
  fill: "tonexty", 
  fillcolor: "rgba(68, 68, 68, 0.3)", 
  line: {width: 0}, 
  marker: {color: "444"}, 
  mode: "lines", 
  name: "Upper Bound", 
  type: "scatter"
}

var data = [trace1, trace2, trace3];
var layout = {
  showlegend: false, 
  title: "Continuous, variable value error bars<br>Notice the hover text!", 
  yaxis: {title: "Wind speed (m/s)"}
};
Plotly.newPlot('myDiv', data, layout);
```
#### Contours 
the plots with type contour will generate the following plots
![[Pasted image 20221017193349.png]]
```javascript
var size = 100, x = new Array(size), y = new Array(size), z = new Array(size), i, j;

for(var i = 0; i < size; i++) {
	x[i] = y[i] = -2 * Math.PI + 4 * Math.PI * i / size;
  	z[i] = new Array(size);
}

for(var i = 0; i < size; i++) {
  	for(j = 0; j < size; j++) {
    	var r2 = x[i]*x[i] + y[j]*y[j];
    	z[i][j] = Math.sin(x[i]) * Math.cos(y[j]) * Math.sin(r2) / Math.log(r2+1);
 	}
}

var data = [ {
		z: z,
		x: x,
		y: y,
		type: 'contour'
	}
];

Plotly.newPlot('myDiv', data);
```
#### smoothing color for contour
![[Pasted image 20221017193517.png]]
```javascript
var data = [ {
  z: [[10, 10.625, 12.5, 15.625, 20],
       [5.625, 6.25, 8.125, 11.25, 15.625],
       [2.5, 3.125, 5., 8.125, 12.5],
       [0.625, 1.25, 3.125, 6.25, 10.625],
       [0, 0.625, 2.5, 5.625, 10]],
  type: 'contour',
  contours: {
    coloring: 'heatmap'
  }
}];

var layout = {
  title: 'Smooth Contour Coloring'
};

Plotly.newPlot('myDiv', data, layout);

```
#### Contours with Labels
![[Pasted image 20221017193619.png]]
```javascript
var data = [ {
  z: [[10, 10.625, 12.5, 15.625, 20],
      [5.625, 6.25, 8.125, 11.25, 15.625],
      [2.5, 3.125, 5.0, 8.125, 12.5],
      [0.625, 1.25, 3.125, 6.25, 10.625],
      [0, 0.625, 2.5, 5.625, 10]],
  type: 'contour',
  contours: {
    coloring: 'heatmap',
    showlabels: true,
    labelfont: {
      family: 'Raleway',
      size: 12,
      color: 'white',
    }
  }
}];

var layout = {
  title: 'Contour with Labels'
}

Plotly.newPlot('myDiv', data, layout);
```
#### Contour Lines
![[Pasted image 20221017193742.png]]
```javascript
var data = [ {
  z: [[10, 10.625, 12.5, 15.625, 20],
       [5.625, 6.25, 8.125, 11.25, 15.625],
       [2.5, 3.125, 5., 8.125, 12.5],
       [0.625, 1.25, 3.125, 6.25, 10.625],
       [0, 0.625, 2.5, 5.625, 10]],
  type: 'contour',
  colorscale: 'Jet',
  contours:{
    coloring: 'lines'
  }
}];

var layout = {
  title: 'Contour Lines'
};

Plotly.newPlot('myDiv', data, layout);
```
#### Custom color pallete
![[Pasted image 20221017194012.png]]
```javascript
var data = [ {
  z: [[10, 10.625, 12.5, 15.625, 20],
       [5.625, 6.25, 8.125, 11.25, 15.625],
       [2.5, 3.125, 5., 8.125, 12.5],
       [0.625, 1.25, 3.125, 6.25, 10.625],
       [0, 0.625, 2.5, 5.625, 10]],
  type: 'contour',
  colorscale: [[0, 'rgb(166,206,227)'], [0.25, 'rgb(31,120,180)'], [0.45, 'rgb(178,223,138)'], [0.65, 'rgb(51,160,44)'], [0.85, 'rgb(251,154,153)'], [1, 'rgb(227,26,28)']]
}
];

var layout = {
  title: 'Custom Contour Plot Colorscale'
};

Plotly.newPlot('myDiv', data, layout);
```
#### Basic Heatmap
![[Pasted image 20221017194157.png]]
```javascript
var data = [
  {
    z: [[1, 20, 30], [20, 1, 60], [30, 60, 1]],
    type: 'heatmap'
  }
];

Plotly.newPlot('myDiv', data);
```
### Logarithmic Axes
![[Pasted image 20221017194848.png]]

```javascript
var trace1 = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  y: [8, 7, 6, 5, 4, 3, 2, 1, 0],
  type: 'scatter'
};

var trace2 = {
  x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  y: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  type: 'scatter'
};

var data = [trace1, trace2];

var layout = {
  xaxis: {
    type: 'log',
    autorange: true
  },
  yaxis: {
    type: 'log',
    autorange: true
  }
};

Plotly.newPlot('myDiv', data, layout);

```
#### Scatter 3D Plot
![[Pasted image 20221017195952.png]]
```javascript
d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', function(err, rows){
function unpack(rows, key) {
	return rows.map(function(row)
	{ return row[key]; });}

var trace1 = {
	x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
	mode: 'markers',
	marker: {
		size: 12,
		line: {
		color: 'rgba(217, 217, 217, 0.14)',
		width: 0.5},
		opacity: 0.8},
	type: 'scatter3d'
};

var trace2 = {
	x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
	mode: 'markers',
	marker: {
		color: 'rgb(127, 127, 127)',
		size: 12,
		symbol: 'circle',
		line: {
		color: 'rgb(204, 204, 204)',
		width: 1},
		opacity: 0.8},
	type: 'scatter3d'};

var data = [trace1, trace2];
var layout = {margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 0
  }};
Plotly.newPlot('myDiv', data, layout);
});
```
### Topographical Surface 3D
![[Pasted image 20221017200404.png]]
```javascript
d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/api_docs/mt_bruno_elevation.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var z_data=[ ]
for(i=0;i<24;i++)
{
  z_data.push(unpack(rows,i));
}

var data = [{
           z: z_data,
           type: 'surface'
        }];

var layout = {
  title: 'Mt Bruno Elevation',
  autosize: false,
  width: 500,
  height: 500,
  margin: {
    l: 65,
    r: 50,
    b: 65,
    t: 90,
  }
};
Plotly.newPlot('myDiv', data, layout);
});
```
