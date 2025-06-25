import "./App.css";
// import A from "./A";
import { useEffect, useState } from "react";

//Material Component
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import CircularProgress from "@mui/material/CircularProgress";
// import { useGeolocated } from "react-geolocated";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// external
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import "moment/min/locales";
//import { changeLanguage } from "i18next";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import "moment/locale/en";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { change, fetchWeather } from "./weatherAPISlice";
// import {fetchWeater} from

function App() {
  const [language, setLanguage] = useState("ar");
  const { t, i18n } = useTranslation();
  function changeLang(event) {
    if (event.target.value === 1) {
      i18n.changeLanguage("ar");
      setLanguage("ar");
      setDirec("rtl");
      moment.locale("ar");
    } else if (event.target.value === 2) {
      i18n.changeLanguage("en");
      setLanguage("en");
      setDirec("ltr");
      moment.locale("en");
    }
    setTime(moment().format("LL"));
  }

  const [time, setTime] = useState(null);
  const [direc, setDirec] = useState();
  // useEffect(() => {
  //   const name = "Flash";
  //   const currDate = new Date().toLocaleDateString;
  //   const currTime = new Date().toLocaleTimeString;
  //   setTime(currTime);
  //   console.log(time, currDate, currTime);
  // }, []);
  let axiosCancel = null;
  const data = useSelector((state) => {
    return state.weather.weather;
  });
  const isLoading = useSelector((state) => {
    return state.weather.isLoading;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(change());
    i18n.changeLanguage(language);
    // setLanguage("en");
    moment.locale("ar");
    setDirec("rtl");
    setTime(moment().format("LL"));
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(fetchWeather({ payload: { latitude, longitude } }));
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
    dispatch(fetchWeather());
    // console.log("slkdjsdjlksjdlk");
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const latitude = position.coords.latitude;
    //       const longitude = position.coords.longitude;
    //       console.log("skf;lks;lkf;lksf ", latitude, longitude);
    //       axios
    //         .get(
    //           `https://api.openweathermap.org/data/2.5/weather?lat=${
    //             Math.round(position.coords.latitude * 1000) / 1000
    //           }&lon=${
    //             Math.round(position.coords.longitude * 1000) / 1000
    //           }&appid=9a9dcdd096302fa9c8d614f8950d6035`,
    //           {
    //             cancelToken: new axios.CancelToken((c) => {
    //               axiosCancel = c;
    //             }),
    //           }
    //         )
    //         .then(function (response) {
    //           const tempresponse = Math.round(response.data.main.temp - 273.15);
    //           setData({
    //             min: Math.round(response.data.main.temp_min - 273.15),
    //             max: Math.round(response.data.main.temp_max - 273.15),
    //             temp: tempresponse,
    //             loc: response.data.name,
    //             weather: response.data.weather[0].description,
    //             icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    //             lat: Math.round(position.coords.latitude * 1000) / 1000,
    //             lon: Math.round(position.coords.longitude * 1000) / 1000,
    //           });
    //           console.log(response);
    //         })
    //         .catch(function (error) {
    //           // handle error
    //           console.log(error);
    //         });
    //       return () => {
    //         axiosCancel();
    //       };
    //     },
    //     (error) => {
    //       console.error("Error getting location:", error.message);
    //     }
    //   );
    // } else {
    //   console.error("Geolocation is not supported by this browser.");
    // }
  }, []);
  const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container maxWidth="sm">
          {/* Container */}
          <div
            style={{
              height: "100vh",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            dir="ltr"
          >
            <div
              style={{
                margin: "20px",
                display: "flex",
                justifyContent: "end !important",
                alignItems: "center",
                // background: "white",
                width: "100%",
              }}
              dir="ltr ~important"
            >
              {/* <Button
                variant="text"
                style={{ color: "white" }}
                onClick={changeLang}
              >
                {language === "en" ? "Arabic" : "English"}
              </Button> */}
              <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth style={{ color: "white" }}>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ color: "white" }}
                  >
                    Language
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={language}
                      label="Age"
                      width="50%"
                      onChange={changeLang}
                    >
                      <MenuItem value={1} selected>
                        عربي
                      </MenuItem>
                      <MenuItem value={2}>English</MenuItem>
                    </Select>
                  </InputLabel>
                </FormControl>
              </Box>
            </div>
            {/* Card */}
            <div
              // dir="ltr"
              style={{
                background: "rgba(28 52 91/36%)",
                borderRadius: "15px",
                color: "white",
                width: "100%",
                padding: "10px",
                boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
              }}
            >
              {isLoading ? (
                <CircularProgress style={{ color: "white" }} />
              ) : (
                <div>
                  {/* City & Time */}
                  <div
                    dir={direc}
                    style={{
                      display: "flex",
                      alignItems: "end",
                      justifyContent: "start",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ margin: "20px", fontWeight: "400" }}
                    >
                      {t(data.loc)}
                    </Typography>
                    <Typography variant="h5" style={{ margin: "20px" }}>
                      {time}
                    </Typography>
                  </div>
                  {/* =====City & Time===== */}
                  <hr style={{ color: "white", margin: "0px 20px" }} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                    dir={direc}
                  >
                    {/* Drgree */}
                    <div>
                      {/* Temp */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "",
                        }}
                      >
                        <Typography style={{ textAlign: "right" }} variant="h1">
                          {data.temp}
                        </Typography>
                        <img src={data.icon} alt="" />
                      </div>
                      {/* ===Temp=== */}
                      <Typography variant="h5">{t(data.weather)}</Typography>
                      {/* MIN & MAX */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h5>
                          {t("Low")} : {data.min}
                        </h5>
                        <h5 style={{ margin: "0px 5px" }}>|</h5>
                        <h5>
                          {t("High")} : {data.max}
                        </h5>
                      </div>
                      {/* =====MIN & MAX===== */}
                    </div>
                    {/* =====Drgree===== */}
                    {/* icon */}

                    <CloudIcon style={{ fontSize: "200px" }} />

                    {/*}
                {/* ====icon==== */}
                  </div>
                </div>
              )}
              {/* Content */}

              {/* =====Content===== */}
              {/* <div style={{ color: "white" }}>
                <h5>lat: {data.lat}</h5>
                <h5 style={{ margin: "0px 5px" }}>|</h5>
                <h5>long: {data.lon}</h5>
              </div> */}
            </div>
            {/* =====Card===== */}
          </div>
          {/* =====Container===== */}
          <div></div>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
