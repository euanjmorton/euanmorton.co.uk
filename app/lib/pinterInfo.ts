"use server";
import moment from "moment";
import { SelectQuery, SelectTemps } from "./queryUtils";
import { PrismaClient } from "@/generated/prisma/client/client";

const prisma = new PrismaClient();

export const getPinters = async () => {
  //const [pinters] = await SelectQuery("SELECT * FROM pinters");
  const allPinters = await prisma.pinters.findMany();
  console.log(allPinters);
  return allPinters;
};

export const getActiveBrews = async () => {
  //const [active_brews] = await SelectQuery("SELECT * FROM brews WHERE active = 1");

  const activeBrews = await prisma.brews.findMany({
    where: {
      active: true
    }
  });
  console.log(activeBrews);
  return activeBrews;
};

export const getBrewTypes = async () => {
  const [brew_styles] = await SelectQuery("SELECT * FROM brew_styles");

  return brew_styles;
};

export const getSpindles = async () => {
  const [spindles] = await SelectQuery("SELECT * FROM ispindles");

  return spindles;
};

export const getGraphTemperatureData = async (startDate: string, brewingDays: number) => {

  const brewStart = new Date(startDate);
  const currentDate = new Date();

  currentDate.setTime(brewStart.getTime() + (1000 * 60 * 60 * 24 * brewingDays));

  startDate = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
  let endDate = moment(currentDate).format('YYYY-MM-DD hh:mm:ss');
 
  //hardcoded endate for testing:
  endDate = '2025-10-22 22:00:00';

  /*let qS = "SELECT * FROM temperatures WHERE Date_Time >= '" + startDate + "' " +
    "AND Date_Time <= '" + endDate + "';"*/
  
  //const [results] = await SelectQuery<TemperatureRow>(qS);
  const [results] = await SelectTemps(startDate, endDate);
  

  //structure results data:
  /*const temperaturesData = results.map((row: { Date_Time: string; Temperature: string; }) => ({    
    //date_time: moment(row.Date_Time).format('DD-MM-YYYY hh:mm:ss'),
    date_time: row.Date_Time,
    temp: row.Temperature,
  }));*/

  await delay(2000);
  console.log("Waited 5s");
  
  return results;
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));



