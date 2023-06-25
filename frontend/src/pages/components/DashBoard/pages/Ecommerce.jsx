import React, { useEffect, useState } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import {
  earningData,
  medicalproBranding,
  recentTransactions,
  weeklyStats,
  dropdownData,
  SparklineAreaData,
  ecomPieChartData,
} from "../../../../data/dummy";
import { UserAuth } from "../../../../context/AuthGoogleContext";
import product9 from "../../../../data/product9.jpg";
import Dashboard from "../Dashboard";
import {
  getMemberSparkLine,
  getPaymentChart,
  getProductPercent,
  getUserPercent,
} from "../../../../helper/ChartAPI";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode, activeMenu } = UserAuth();

  const [totalbyYear, setTotalByYear] = useState();
  const [totalbyYearNotPaid, setTotalByYearNotPaid] = useState();
  const [total, setTotal] = useState();
  const [earnings, setEarnings] = useState([]);
  const [age, setAge] = useState(0);
  const [year, setYear] = useState([]);
  const [yearData, setYearData] = useState();
  const [sparkLineState, setSparkLineState] = useState(SparklineAreaData);
  const [totalMemberYear, setTotalMemberYear] = useState(0);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeYear = (event) => {
    setYearData(event.target.value);
    setAge(0);
  };
  useEffect(() => {
    const getDataChartDummy = async () => {
      console.log(age);
      if (age === 0) {
        const dataChart = await getPaymentChart({ year: yearData });
        return dataChart.data;
      }
      if (age === "All") {
        const dataChart = await getPaymentChart({ year: yearData });
        return dataChart.data;
      } else {
        const dataChart = await getPaymentChart({ month: age, year: yearData });
        return dataChart.data;
      }
    };
    const editDataChart = async () => {
      const data = await getDataChartDummy();
      const number = data.data.total * 1000000;
      const numberNotPaid = data.data.totalNotPaid * 1000000;
      const totalTemp = number + numberNotPaid;

      const formattedNumber = number.toLocaleString();
      const formattedNumber2 = numberNotPaid.toLocaleString();
      const formattedNumber3 = totalTemp.toLocaleString();

      setTotalByYear(formattedNumber);
      setTotalByYearNotPaid(formattedNumber2);
      setTotal(formattedNumber3);
      ///User -- Members
      const getUserObj = await getUserPercent();
      let dataReplace = earningData[0];
      Object.assign(dataReplace, getUserObj.data.data[0]);
      earningData.splice(0, 1, dataReplace);

      dataReplace = earningData[3];
      Object.assign(dataReplace, getUserObj.data.data[1]);
      earningData.splice(3, 1, dataReplace);
      //Product ---- Sales
      const getProductObj = await getProductPercent();
      dataReplace = earningData[1];
      Object.assign(dataReplace, getProductObj.data.data[0]);
      earningData.splice(1, 1, dataReplace);

      dataReplace = earningData[2];
      Object.assign(dataReplace, getProductObj.data.data[1]);
      earningData.splice(2, 1, dataReplace);

      setEarnings(dataReplace);
    };
    editDataChart();
    const today = new Date();
    const yearNow = today.getFullYear();
    setYear([yearNow - 2, yearNow - 1, yearNow]);
  }, [age]);

  useEffect(()=>{
    const test = async ()=>{
      const dataSparkLine = await getMemberSparkLine()
      setSparkLineState(dataSparkLine.data.data.data)
      setTotalMemberYear(dataSparkLine.data.data.total)
    }
    test()
  },[])

  const month = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <>
      <Dashboard />
      <div className="mt-24" style={activeMenu ? { marginLeft: "250px" } : {}}>
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Earnings</p>
                <p className="text-2xl">{total}</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-6">
              <Button
                color="white"
                bgColor={currentColor}
                text="Download"
                borderRadius="10px"
              />
            </div>
          </div>
          <div
            className={`flex m-3 flex-wrap justify-between ${
              activeMenu ? "gap-20" : "gap-40"
            } items-center`}
          >
            {earningData.map((item) => (
              <div
                key={item.title}
                style={{ width: "200px" }}
                className="flex flex-col items-center bg-white h-48  dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
              >
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                  }}
                  className="text-2xl opacity-0.9 w-fit rounded-full  p-4 hover:drop-shadow-xl"
                >
                  {item.icon}
                </button>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{item.amount}</span>
                  <span className={`text-sm text-${item.pcColor} ml-2`}>
                    {item.percentage}
                  </span>
                </p>
                <p className="text-sm text-gray-400  mt-1">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-10 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">Revenue Updates</p>
              <div className="flex items-center gap-4">
                <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                  <span>
                    <GiPayMoney />
                  </span>
                  <span>Unpaid</span>
                </p>
                <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                  <span>
                    <GiReceiveMoney />
                  </span>
                  <span>Paid</span>
                </p>
              </div>
            </div>
            <div className=" mt-10 flex gap-10 flex-wrap justify-center">
              <div
                style={{ width: "300px" }}
                className=" border-r-1 border-color m-4 pr-10"
              >
                <div style={{ marginTop: "-50px", marginBottom: "20px" }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Month"
                      onChange={handleChange}
                    >
                      {month.map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <p>
                    <span className="text-3xl font-semibold">
                      {totalbyYear}
                    </span>
                    <span className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-black bg-green-400 ml-3 text-xs">
                      VND
                    </span>
                  </p>
                  <p className="text-gray-500 mt-1">Paid</p>
                </div>
                <div className="mt-8">
                  <div className="flex">
                    <p className="text-3xl font-semibold">
                      {totalbyYearNotPaid}
                    </p>
                    <span
                      style={{ marginTop: "10px" }}
                      className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-black bg-green-400 ml-3 text-xs"
                    >
                      VND
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Unpaid</p>
                </div>

                <div className="mt-5">
                  {/* <SparkLine
                    currentColor={currentColor}
                    id="line-sparkLine"
                    type="Line"
                    height="80px"
                    width="250px"
                    data={SparklineAreaData}
                    color={currentColor}
                  /> */}
                </div>
                <div className="mt-8">
                  <div className="flex">
                    <p className="text-3xl font-semibold">{total}</p>
                    <span
                      style={{ marginTop: "10px" }}
                      className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full text-black bg-green-400 ml-3 text-xs"
                    >
                      VND
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Total</p>
                </div>
              </div>
              <div>
                <div style={{marginTop:'-25px',marginBottom:'20px'}}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={yearData}
                      label="Year"
                      onChange={handleChangeYear}
                    >
                      {year.map((item) => {
                        return <MenuItem value={item}>{item}</MenuItem>;
                      })}
                    </Select>
                  </FormControl>
                </div>
                <Stacked
                  currentMode={currentMode}
                  width="600px"
                  height="360px"
                  year={yearData}
                />
              </div>
            </div>
          </div>
          <div>
            <div
              className=" rounded-2xl md:w-400 p-4 m-3"
              style={{ backgroundColor: currentColor,width:'600px' }}
            >
              <div className="flex justify-between items-center ">
                <p className="font-semibold text-white text-2xl">Members</p>

                <div>
                  <p className="text-2xl text-white font-semibold mt-8">
                    {totalMemberYear} Members
                  </p>
                  <p className="text-gray-200">Yearly revenue</p>
                </div>
              </div>

              <div className="mt-4">
                <SparkLine
                  currentColor="white" //{currentColor}
                  id="line-sparkLine"
                  type="Line"
                  height="100px"
                  width="320px"
                  data={sparkLineState}
                  color="rgb(242, 252, 253)"
                />
                {/* <SparkLine
                  currentColor={currentColor}
                  id="column-sparkLine"
                  height="100px"
                  type="Column"
                  data={SparklineAreaData}
                  width="320"
                  color="rgb(242, 252, 253)"
                /> */}
              </div>
            </div>

            {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
              <div>
                <p className="text-2xl font-semibold ">$43,246</p>
                <p className="text-gray-400">Yearly sales</p>
              </div>

              <div className="w-40">
                <Pie
                  id="pie-chart"
                  data={ecomPieChartData}
                  legendVisiblity={false}
                  height="160px"
                />
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex gap-10 m-4 flex-wrap justify-center">
          {/* <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-semibold">Recent Transactions</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div className="mt-10 w-72 md:w-400">
              {recentTransactions.map((item) => (
                <div key={item.title} className="flex justify-between mt-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl rounded-lg p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                />
              </div>

              <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
          </div> */}
          <div style={{width:'1200px'}} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
            <div className="flex justify-between items-center gap-2 mb-10">
              <p className="text-xl font-semibold">Premium Overview</p>
              <DropDown currentMode={currentMode} />
            </div>
            <div  className="md:w-full overflow-auto">
              <LineChart />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Weekly Stats</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-500"
              >
                <IoIosMore />
              </button>
            </div>

            <div className="mt-10 ">
              {weeklyStats.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between mt-4 w-full"
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      style={{ background: item.iconBg }}
                      className="text-2xl hover:drop-shadow-xl text-white rounded-full p-3"
                    >
                      {item.icon}
                    </button>
                    <div>
                      <p className="text-md font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>

                  <p className={`text-${item.pcColor}`}>{item.amount}</p>
                </div>
              ))}
              <div className="mt-4">
                <SparkLine
                  currentColor={currentColor}
                  id="area-sparkLine"
                  height="160px"
                  type="Area"
                  data={sparkLineState}
                  width="320"
                  color="rgb(242, 252, 253)"
                />
              </div>
            </div>
          </div>
          <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">MedicalPro Branding</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-400"
              >
                <IoIosMore />
              </button>
            </div>
            <p className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-24 bg-orange-400 py-0.5 px-2 text-gray-200 mt-10">
              16 APR, 2021
            </p>

            <div className="flex gap-4 border-b-1 border-color mt-6">
              {medicalproBranding.data.map((item) => (
                <div
                  key={item.title}
                  className="border-r-1 border-color pr-4 pb-2"
                >
                  <p className="text-xs text-gray-400">{item.title}</p>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="border-b-1 border-color pb-4 mt-2">
              <p className="text-md font-semibold mb-2">Teams</p>

              <div className="flex gap-4">
                {medicalproBranding.teams.map((item) => (
                  <p
                    key={item.name}
                    style={{ background: item.color }}
                    className="cursor-pointer hover:drop-shadow-xl text-white py-0.5 px-3 rounded-lg text-xs"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-md font-semibold mb-2">Leaders</p>
              <div className="flex gap-4">
                {medicalproBranding.leaders.map((item, index) => (
                  <img
                    key={index}
                    className="rounded-full w-8 h-8"
                    src={item.image}
                    alt=""
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 border-t-1 border-color">
              <div className="mt-3">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Add"
                  borderRadius="10px"
                />
              </div>

              <p className="text-gray-400 text-sm">36 Recent Transactions</p>
            </div>
          </div>
          <div className="w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
            <div className="flex justify-between">
              <p className="text-xl font-semibold">Daily Activities</p>
              <button
                type="button"
                className="text-xl font-semibold text-gray-500"
              >
                <IoIosMore />
              </button>
            </div>
            <div className="mt-10">
              <img className="md:w-96 h-50 " src={product9} alt="" />
              <div className="mt-8">
                <p className="font-semibold text-lg">React 18 coming soon!</p>
                <p className="text-gray-400 ">By Johnathan Doe</p>
                <p className="mt-8 text-sm text-gray-400">
                  This will be the small description for the news you have shown
                  here. There could be some great info.
                </p>
                <div className="mt-3">
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Read More"
                    borderRadius="10px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ecommerce;