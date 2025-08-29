"use server";
import { SelectQuery } from "./queryUtils";

export const getPinters = async () => {
  const [pinters] = await SelectQuery("SELECT * FROM pinters");

  return pinters;
};

export const getBrewTypes = async () => {
  const [brew_styles] = await SelectQuery("SELECT * FROM brew_styles");

  return brew_styles;
};

export const getSpindles = async () => {
  const [spindles] = await SelectQuery("SELECT * FROM ispindles");

  return spindles;
};