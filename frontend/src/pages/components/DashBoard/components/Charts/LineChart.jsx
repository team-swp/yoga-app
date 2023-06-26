import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from "../../../../../data/dummy";
import { UserAuth } from "../../../../../context/AuthGoogleContext";
import { getPremiumLine } from "../../../../../helper/ChartAPI";
const LineChart = () => {
  const [dataPrint, setDataPrint] = useState(lineCustomSeries)
  const { currentMode } = UserAuth();
  useEffect(() => {
    const test = async ()=>{
      const dataPremium = await getPremiumLine()
      const resultData = dataPremium.data.data
   const getData = await resultData.map(item => {
        return {
          dataSource: item.dataSource,
          xName: "x",
          yName: "y",
          name: item.name,
          width: "2",
          marker: { visible: true, width: 10, height: 10 },
          type: "Line"
        };
      });
      setDataPrint(getData)
      console.log(lineCustomSeries);
      console.log(dataPrint)
    }
    test()
  }, []);
  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      width="1000px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {dataPrint.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
