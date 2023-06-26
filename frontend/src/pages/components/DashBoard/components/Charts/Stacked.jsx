import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  stackedCustomSeries,
  stackedPrimaryXAxis,
} from "../../../../../data/dummy";
import { UserAuth } from "../../../../../context/AuthGoogleContext";
import { getDataChartDummy } from "../../../../../data/dummy";
import { getPaymentChart } from "../../../../../helper/ChartAPI";
const Stacked = ({ width, height,year }) => {
  const [dataStackChart, setDataStackChart] = useState([]);
  const { currentMode } = UserAuth();

  useEffect(() => {
    const getDataChartDummy = async () => {
      const dataChart = await getPaymentChart({year});
      return dataChart.data.data;
    };
    let finalResult = [];
    let temp = {};
    const editDataChart = async () => {
      const data = await getDataChartDummy();
      stackedCustomSeries.forEach((item,index) => {
        let { dataSource, ...rest } = item;
        Object.assign(rest, { dataSource: data.data[index]});
        console.log(rest);
        Object.assign(temp, rest);
        finalResult.push(temp);
        temp={}
        rest={}
      });
      setDataStackChart(finalResult);
      ///
    };
    editDataChart();
  }, [year]);
  return (
    <ChartComponent
      id="charts"
      primaryXAxis={stackedPrimaryXAxis}
      width={width}
      height={height}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true }}
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
      legendSettings={{ background: "white" }}
    >
      <Inject services={[StackingColumnSeries, Category, Legend, Tooltip]} />
      <SeriesCollectionDirective>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        {dataStackChart.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default Stacked;
