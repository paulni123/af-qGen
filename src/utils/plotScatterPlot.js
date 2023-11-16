import Chart from 'chart.js/auto';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export async function plotScatterPlot(scatterPlotData, questionId) {
    const width = 800; // width of the canvas
    const height = 600; // height of the canvas

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    const xValues = scatterPlotData.dataPoints.map(point => point[0]);
    const yValues = scatterPlotData.dataPoints.map(point => point[1]);

    const trendLineInfo = {
        slope: scatterPlotData.trendLine.slope,
        yIntercept: scatterPlotData.trendLine.yIntercept
    };

    const trendLineXValues = [Math.min(...xValues), Math.max(...xValues)];
    const trendLineYValues = trendLineXValues.map(x => trendLineInfo.slope * x + trendLineInfo.yIntercept);

    const scatterData = {
        labels: xValues,
        datasets: [
            {
                label: 'Data points',
                data: xValues.map((x, i) => ({ x, y: yValues[i] })),
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgb(0, 123, 255)',
                borderWidth: 1,
                type: 'scatter'
            },
            {
                label: 'Trend Line',
                data: trendLineXValues.map((x, i) => ({ x, y: trendLineYValues[i] })),
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2,
                type: 'line'
            }
        ]
    };

    const configuration = {
        type: 'scatter',
        data: scatterData,
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: scatterPlotData.axesLabels[0]
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: scatterPlotData.axesLabels[1]
                    }
                }
            }
        }
    };

    const buffer = await chartJSNodeCanvas.renderToBuffer(configuration);
    const dataUri = buffer.toString('base64');
    const imageSrc = `data:image/png;base64,${dataUri}`;

    return `<img src="${imageSrc}" alt="Scatter Plot" />`;
}
