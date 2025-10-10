"use client"

import { Commet } from "react-loading-indicators";
import css from './Loader.module.css'

export default function Loader() {
  return (
    <div className={css.loaderShmoader}>
      <Commet
        color="#0d6efd"
        size="medium"
        text="Loading"
        textColor="#0d6efd"
      />
    </div>
  );
}