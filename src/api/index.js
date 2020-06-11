import axios from "axios";

const url = 'https://covid19.mathdro.id/api';
export const fetchData = async (country) => {

    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate }
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

/*
First way to get data
    const response = await axios.get(url);
    return response;
*/

/*
Second way to get data //De structured
    const {data} = await axios.get(url);
    const modifiedData = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate
    }
    return modifiedData;
*/

/*
Third Advanced way to get data //De structured
    const {data} = await axios.get(url);
    const modifiedData = {
        confirmed: data.confirmed,
        recovered: data.recovered,
        deaths: data.deaths,
        lastUpdate: data.lastUpdate
    }
    return modifiedData;
*/

/*
Third Advanced way to get data //More Destructured, we can omit data
    const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(url);
    const modifiedData = {
        confirmed: confirmed,
        recovered: recovered,
        deaths: deaths,
        lastUpdate: lastUpdate
    }
    return modifiedData;
*/

/*
Third Advanced way to get data //If parameters are same we can omit keys
    const {data: {confirmed, recovered, deaths, lastUpdate}} = await axios.get(url);
    const modifiedData = {
        confirmed,
        recovered,
        deaths,
        lastUpdate
    }
    return modifiedData;
*/

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
        // return response;
    } catch (error) {
        console.log(error);
    }
}