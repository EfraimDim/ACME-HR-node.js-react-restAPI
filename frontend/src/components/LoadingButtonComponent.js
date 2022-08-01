import styles from "../styles/LoadingButton.module.css";
import { LoadingButton } from "@mui/lab";
import { useContext } from "react";
import { AppContext } from "./AppContext";

function LoadingButtonComponent({loadSpinner}) {

  return (
    <div className={styles.loadingButtonWrapper}>
      <LoadingButton loading={loadSpinner} className={styles.loadingButton} />
    </div>
  );
}

export default LoadingButtonComponent;
