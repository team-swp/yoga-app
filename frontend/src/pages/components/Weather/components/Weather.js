import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
//include layout
import Header from "./layouts/Header";
import Highlights from "./layouts/Highlights";
import Sidebar from "./layouts/Sidebar";
import Today from "./layouts/Today";
import Week from "./layouts/Week";
import Container from "./layouts/Container";
import Spinner from "./elements/Spinner";
import SpinnerContainer from "./elements/SpinnerContainer";
import { StyledGlobal, StyledDashboard } from "../styles";
import { themeLight, themeDark } from "../constants";
import { useImageFetch } from "../hooks/useImageFetch";
import { useCoordinations } from "../hooks/useCoordinations";
import { useWeatherFetch } from "../hooks/useWeatherFetch";
import { useNightMode } from "../hooks/useNightMode";
import { SEARCH_BY_WORD } from "../api";
import { useTempUnit } from "../hooks/UseTempUnit";
import Navigation from "../../Header/Navigation/Navigation";
import { getPaymentByIDUser, updatePayment } from "../../../../helper/paymentAPI";
const Weather = () => {
  const [nightMode, nightModeChanged] = useNightMode();
  const [unitMode, unitModeChanged] = useTempUnit();
  const [image, fetchImage] = useImageFetch();
  const [{ lat, long }, loadingLocation, findCoordinates] = useCoordinations();
  const [
    weather,
    loading,
    error,
    fetchWeather,
    searchByLocation,
    getWeatherLocation,
  ] = useWeatherFetch();
  const [showDays, setShowDays] = useState(false);
  const fetchCoordinates = () => {
    findCoordinates();
    getWeatherLocation(lat, long);
  };
  const nightModeCallback = () => {
    nightModeChanged();
  };
  const showDaysCallback = (enabled) => {
    setShowDays(enabled);
  };

  const doSearchLocation = (searchTerm) => {
    searchByLocation(searchTerm);
    fetchImage(`${SEARCH_BY_WORD}${weather.city}`);
  };
  const unitTempCallback = (enabled) => {
    unitModeChanged(enabled);
  };


  useEffect(() => {
    getWeatherLocation(lat, long);
    fetchImage(`${SEARCH_BY_WORD}${weather.city}`);
  }, [lat, long]);

  // useEffect(()=>{
  //     const test = async()=>{
  //         const data = await updatePayment({_id:'649fafa716ee0a1fa8618957',status:4})
  //         console.log(data,'123456789');
  //     }
  //     test()
  // },[])

    useEffect(() => {
        const test = async () => {
        const data = await getPaymentByIDUser()
        console.log(data,'get all payment');
        };

        test();
    }, []);

  if (!weather)
    return (
      <ThemeProvider theme={nightMode ? themeDark : themeLight}>
        <Spinner />
        <StyledGlobal />
      </ThemeProvider>
    );

  return (
    <>
      <Navigation />
      <ThemeProvider theme={nightMode ? themeDark : themeLight}>
        <StyledDashboard>
          <Sidebar
            findCoordinates={fetchCoordinates}
            data={weather}
            searchCallback={doSearchLocation}
            error={error}
            image={image}
            titleLocation={weather}
            unitTemp={unitMode}
          />
          <Container>
            <Header
              unitMode={unitMode}
              unitTempCallback={unitTempCallback}
              nightModeCallback={nightModeCallback}
              nightMode={nightMode}
              showDaysCallback={showDaysCallback}
              showActive={showDays}
            />
            {loading || loadingLocation ? (
              <SpinnerContainer />
            ) : (
              <>
                {!showDays ? (
                  <Week data={weather.daily} tempUnit={unitMode} />
                ) : (
                  <Today tempUnit={unitMode} data={weather.hourly} />
                )}
                <Highlights data={weather.current} />
              </>
            )}
          </Container>
          <StyledGlobal />
        </StyledDashboard>
      </ThemeProvider>
    </>
  );
};
export default Weather;
