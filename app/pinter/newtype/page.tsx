import React, { Suspense } from "react";
import { createStyle } from "@/app/pinter/newtype/api";
import style from "./style.module.css";
import clsx from "clsx";

const CreateNewTypePage = () => {
  return (
    <>
      <div>
        <h2>Add New Brew Style</h2>
      </div>
      <div>
        <form
          className={clsx(style.form, "flex flex-col w-350")}
          action={createStyle}
        >
          <p>Image:</p>
          <input type="file" name="image"></input>
          <p>Style Name:</p>
          <input type="text" name="name" />
          <p>Style Type:</p>
          <input type="text" name="style" />
          <p>Number of brewing days:</p>
          <input type="number" name="brew_days"></input>
          <p>Number of conditioning days:</p>
          <input type="number" name="condition_days"></input>
          <p>Recommended number of brewing days:</p>
          <input type="number" name="rec_brew_days"></input>
          <p>Recommended number of conditioning days:</p>
          <input type="number" name="rec_condition_days"></input>
          <p>Expected ABV:</p>
          <input type="number" step="0.1" name="abv"></input>
          <button className="btn btn-Primary" type="submit">
            Add Style
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateNewTypePage;
