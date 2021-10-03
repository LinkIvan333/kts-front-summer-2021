import React from "react";
import ErrorThrowerStyle from "./ErrorThrower.module.scss";

const ErrorThrower = () => {
  return (
    <span className={ErrorThrowerStyle.errorSpan}>Что-то пошло не так. Пожалуйста, перезагрузите страницу</span>
  );
};
export default ErrorThrower;