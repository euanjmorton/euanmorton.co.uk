import { PinterStatus } from "./enums";

export type Pinter = {
  pinter_id: number;
  pinter_name: string;
  pinter_colour: string;
  pinter_status: PinterStatus;
};

export type BrewType = {
  brew_type_id: number,
  brew_name: string,
  style: string,
  brew_days: number,
  condition_days: number,
  recommended_brew_days: number,
  recommended_condition_days: number,
  abv: number,
};

export type Brew = {
  pinter: number,
  brew_type: string,
  brew_days: number,
  cold_crash_days: number,
  condition_days: number,
  start_date: string,
  start_time: string,
  ispindle_id: number
};

export type Spindle = {
  ispindle_id: number;
  ispindle_colour: string;
};