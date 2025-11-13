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
  brew_type: number,
  brewing_days: number,
  cold_crash_days: number,
  conditioning_days: number,
  brew_startdate: Date,
  //start_time: string,
  ispindle_id: number,
  notes: string,
  rating: number,
  active: boolean
};


export type Spindle = {
  ispindle_id: number;
  ispindle_colour: string;
};