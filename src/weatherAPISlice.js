import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition((position) => {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;
//     console.log("skf;lks;lkf;lksfsssssssssssssssss ", latitude, longitude);
//   });
// }
// let latitude, longitude;

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       latitude = position.coords.latitude;
//       longitude = position.coords.longitude;
//       console.log("Latitude: ", latitude, "Longitude: ", longitude);
//     },
//     (error) => {
//       console.error("Error getting location:", error.message);
//     }
//   );
// } else {
//   console.error("Geolocation is not supported by this browser.");
// }
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=24.4539&lon=54.3773&appid=9a9dcdd096302fa9c8d614f8950d6035`
      // {24.4539° N, 54.3773° E
      //   cancelToken: new axios.CancelToken((c) => {
      //     axiosCancel = c;
      //   }),
      // }
    );
    // console.log("mohammedssssssssssssssss ", latitude);
    // console.log("mohammed Mustafa ", longitude);
    // .then(function (response) {
    //   // const tempresponse = Math.round(response.data.main.temp - 273.15);
    //   // setData({
    const min = Math.round(response.data.main.temp_min - 273.15);
    const max = Math.round(response.data.main.temp_max - 273.15);
    const temp = Math.round(response.data.main.temp - 273.15);
    const loc = response.data.name;
    const weather = response.data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    //   //   lat: Math.round(position.coords.latitude * 1000) / 1000,
    //   //   lon: Math.round(position.coords.longitude * 1000) / 1000,
    //   // });
    // })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     });
    //   return () => {
    //     axiosCancel();
    //   };
    return { min, max, temp, loc, weather, icon };
  }
);
//     },
//     (error) => {
//       console.error("Error getting location:", error.message);
//     }
//   );
// } else {
//   console.error("Geolocation is not supported by this browser.");
// }

const initialState = {
  result: "empty",
  isLoading: false,
  weather: {},
};

export const weatherAPISlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    change: (state, action) => {
      state.result = "Changed";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        console.log("pending", state, " dasasdasd ", action);
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log("fulfilled", state, " dasasdasd ", action);
        state.weather = action.payload;
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { change } = weatherAPISlice.actions;

export default weatherAPISlice.reducer;
