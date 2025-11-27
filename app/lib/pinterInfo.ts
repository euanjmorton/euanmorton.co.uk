"use server";
import moment from "moment";
import { SelectTemps } from "./queryUtils";
import { PrismaClient } from "@/generated/prisma/client/client";
import { Pirata_One } from "next/font/google";

const prisma = new PrismaClient();

export const getPinters = async () => {
  const allPinters = await prisma.pinters.findMany();
  console.log(allPinters);
  return allPinters;
};

export const getActiveBrews = async () => {
  const activeBrews = await prisma.brews.findMany({
    where: {
      active: true
    }
  });
  console.log(activeBrews);
  return activeBrews;
};

export const getBrewTypes = async () => {
  const brew_styles = await prisma.brew_styles.findMany();

  return brew_styles;
};

export const getSpindles = async () => {
  const spindles = await prisma.ispindles.findMany();

  return spindles;
};


export const getLatestTemp = async () => {
  const latestTemp = await prisma.temperatures.findFirst({
    orderBy: {
      id: 'desc',
    },
  });
  console.log(latestTemp);
  return latestTemp;
};


export const getGraphTemperatureData = async (startDate: string, brewingDays: number) => {

  const brewStart = new Date(startDate);
  const currentDate = new Date();

  currentDate.setTime(brewStart.getTime() + (1000 * 60 * 60 * 24 * brewingDays));

  startDate = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
  let endDate = moment(currentDate).format('YYYY-MM-DD hh:mm:ss');
 
  //hardcoded endate for testing:
  endDate = '2025-10-22 22:00:00';
  
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



