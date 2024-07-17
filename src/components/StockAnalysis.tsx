import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';
import {
  DropDownListComponent,
  ChangeEventArgs,
} from '@syncfusion/ej2-react-dropdowns';
// import {
//   ChartComponent,
//   SeriesCollectionDirective,
//   SeriesDirective,
//   Inject,
//   CandleSeries,
//   Category,
//   Tooltip,
//   DateTime,
//   Zoom,
//   Logarithmic,
//   Crosshair,
//   LineSeries,
//   EmaIndicator,
//   IndicatorsDirective,
//   IndicatorDirective,
// } from '@syncfusion/ej2-react-charts';
import { StockChartComponent, StockChartSeriesCollectionDirective, StockChartSeriesDirective, Inject, DateTime, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, DateTimeCategory, PeriodsModel } from '@syncfusion/ej2-react-charts';
import { EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator, Export } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';

export default function StockAnalysis() {
  const location = useLocation();
  const periodselector: PeriodsModel[] = [
        { text: '1M', interval: 1, intervalType: 'Months' },
        // { text: 'YTD' }
    ];
  const employeeCode = location.state?.code
    ? location.state?.code
    : 'Tech Innovators Inc';
  const [chartData, setChartData] = useState({ isDataReady: false, data: [] });
  const [dm, setDm] = useState(
    new DataManager({
      // url: 'https://ej2services.syncfusion.com/aspnet/development/api/StockData',
      url: 'http://localhost:62869/api/StockData',
      adaptor: new UrlAdaptor(),
    })
  );
  if (!chartData.isDataReady) {
    dm.executeQuery(
      new Query().where('CompanyName', 'equal', employeeCode)
    ).then((e: any) => {
      setChartData({ isDataReady: true, data: e.result[0].StockReports });
    });
  }

  const onChange = (args: ChangeEventArgs) => {
    if (args.value) {
      dm.executeQuery(
        new Query().where('CompanyName', 'equal', args.value as string)
      ).then((e: any) => {
        setChartData({ isDataReady: true, data: e.result[0].StockReports });
      });
    }
  };
  const load = (args: any) => {
      // let selectedTheme = location.hash.split('/')[1];
      // selectedTheme = selectedTheme ? selectedTheme : 'Material';
      // args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
  };
  const tooltipRender = (args: any) => {
      // if (args.text.split('<br/>')[4]) {
      //     let target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
      //     let value = (target / 100000000).toFixed(1) + 'B';
      //     args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
      // }
  };
  return (
    <div className="">
      <DropDownListComponent
        id="company"
        // ref={ddObj}
        dataSource={dm}
        value={employeeCode}
        fields={{ text: 'CompanyName', value: 'CompanyName' }}
        change={onChange}
        placeholder="Select a company"
        width={250}
        popupHeight="220px"
      />
      {chartData.isDataReady && (
        <div className="chart-container">          
          <StockChartComponent id='stockchartdefault' primaryXAxis={{ valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }} primaryYAxis={{ labelFormat: 'n0', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { height: 0 } }} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} tooltipRender={tooltipRender} crosshair={{ enable: true }} load={load.bind(this)} title='AAPL Stock Price'>
                    <Inject services={[DateTime, DateTimeCategory, Tooltip, RangeTooltip, Crosshair, LineSeries, SplineSeries, CandleSeries, HiloOpenCloseSeries, HiloSeries, RangeAreaSeries, Trendlines, EmaIndicator, RsiIndicator, BollingerBands, TmaIndicator, MomentumIndicator, SmaIndicator, AtrIndicator, Export, AccumulationDistributionIndicator, MacdIndicator, StochasticIndicator]}/>
                    <StockChartSeriesCollectionDirective>
                        <StockChartSeriesDirective dataSource={chartData.data} xName='period' type='Candle' animation={{ enable: true }}/>
                    </StockChartSeriesCollectionDirective>
                </StockChartComponent>
          {/* <ChartComponent
            id="charts"
            style={{ textAlign: 'center' }}
            primaryXAxis={{
              valueType: 'DateTime',
              majorGridLines: { width: 0 },
              // zoomFactor: 0.2,
              // zoomPosition: 0.6,
              crosshairTooltip: { enable: true },
            }}
            primaryYAxis={{
              title: 'Price (in Million) ',
              labelFormat: '${value}M',
              minimum: 50,
              maximum: 350,
              interval: 30,
              majorGridLines: { width: 1 },
              lineStyle: { width: 0 },
            }}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true, shared: true }}
            crosshair={{ enable: true, lineType: 'Vertical' }}
            width={Browser.isDevice ? '100%' : '75%'}
            legendSettings={{ visible: false }}
            zoomSettings={{
              enableSelectionZooming: true,
              mode: 'X',
              enablePan: true,
            }}
            title={employeeCode + ' Stock Price in last 30 days'}
          >
            <Inject
              services={[
                CandleSeries,
                Category,
                Tooltip,
                DateTime,
                Zoom,
                Logarithmic,
                Crosshair,
                LineSeries,
                EmaIndicator,
              ]}
            />
            <SeriesCollectionDirective>
              <SeriesDirective
                dataSource={chartData.data}
                width={2}
                xName="Period"
                yName="y"
                low="Low"
                high="High"
                close="Close"
                volume="Volume"
                open="Open"
                name="Apple Inc"
                bearFillColor="#2ecd71"
                bullFillColor="#e74c3d"
                type="Candle"
                animation={{ enable: false }}
              />
            </SeriesCollectionDirective>
            <IndicatorsDirective>
              <IndicatorDirective
                type="Ema"
                field="Close"
                seriesName="Apple Inc"
                fill="#606eff"
                period={1}
                animation={{ enable: true }}
              />
            </IndicatorsDirective>
          </ChartComponent> */}
        </div>
      )}
    </div>
  );
}
