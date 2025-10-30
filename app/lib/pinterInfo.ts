"use server";
import moment from "moment";
import { SelectQuery } from "./queryUtils";
import { RowDataPacket } from "mysql2";

export const getPinters = async () => {
  const [pinters] = await SelectQuery("SELECT * FROM pinters");

  return pinters;
};

export const getActiveBrews = async () => {
  const [active_brews] = await SelectQuery("SELECT * FROM brews WHERE active = 1");

  return active_brews;
};

export const getBrewTypes = async () => {
  const [brew_styles] = await SelectQuery("SELECT * FROM brew_styles");

  return brew_styles;
};

export const getSpindles = async () => {
  const [spindles] = await SelectQuery("SELECT * FROM ispindles");

  return spindles;
};

interface TemperatureRow extends RowDataPacket {
  Temperature: string;
  Date_Time: string;
}

export const getGraphTemperatureData = async (startDate: string, brewingDays: number) => {

  const brewStart = new Date(startDate);
  const currentDate = new Date();

  currentDate.setTime(brewStart.getTime() + (1000 * 60 * 60 * 24 * brewingDays));

  startDate = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
  let endDate = moment(currentDate).format('YYYY-MM-DD hh:mm:ss');

  let qS = "SELECT * FROM temperatures WHERE Date_Time >= '" + startDate + "' " +
    "AND Date_Time <= '" + endDate + "';"
  
  const [results] = await SelectQuery<TemperatureRow>(qS);
  
  //structure results data:
  const temperaturesData = results.map((row: { Date_Time: string; Temperature: string; }) => ({    
    date_time: row.Date_Time,
    temp: row.Temperature,
  }));
  
  return temperaturesData;
};


