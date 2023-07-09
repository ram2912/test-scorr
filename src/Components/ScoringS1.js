import React from "react";
import { useState, useEffect } from "react";
import TablePreview from "./TablePreview";
import { FaMagic } from "react-icons/fa";
import { FiGitMerge } from "react-icons/fi";
import BasicButton from "./button";
import Button from "@mui/material/Button";
import TextButtons from "./buttonSec";
import Grid from "@mui/material/Grid";
import CustomizedInputBase from "./chatInput";
import { Divider, Typography} from "antd";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


export default function ScoringTable1() {
  const [deals, setDeals] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [cleanedColumns, setCleanedColumns] = useState(0);

  const handleCleanClick = async () => {
    try {
      const response = await fetch("https://testback.scorr-app.eu/extract/clean-data", {
        credentials: "include",
      });

      const data = await response.json();
      const removedColumns = data.removedColumns;

      console.log("Data cleaned");
      setRefreshKey((prevKey) => prevKey + 1);
      setOpenAlert(true);
      setCleanedColumns(removedColumns);
    } catch (error) {
      console.error("Error cleaning:", error);
    }
  };

  return (
    <Grid container direction="column" style={{ flex: "9", backgroundColor: "transparent", position: "relative", boxSizing: "border-box" }}>
      <Grid item style={{ display: "flex", position: "relative", marginLeft: "30px", marginRight: "30px", paddingTop: "5px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" style={{ color: "white", marginTop: "20px", marginRight: "10px" }}>
            Hubspot: Deals
          </Typography>
          <Divider type="vertical" style={{ height: "30px", backgroundColor: "grey", marginRight: "20px", marginTop: "20px" }} />
          <Typography variant="h6" style={{ color: "white", marginTop: "20px" }}>
            7044 records
          </Typography>
        </div>
      </Grid>
      <Divider style={{ backgroundColor: "grey", marginRight: "30px" }} />
      <Grid item container style={{ marginLeft: "30px", paddingBottom: "5px", marginRight: "30px" }}>
        <Grid item>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingTop: "8px", paddingRight: "40px" }}>
            <Button variant="contained" onClick={handleCleanClick}>
              Clean Data <FaMagic style={{ marginLeft: "5px", marginBottom: "2px" }} />
            </Button>
          </div>
        </Grid>
        <Grid item>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", paddingBottom: "15px", paddingRight: "20px" }}>
            <CustomizedInputBase />
          </div>
        </Grid>
      </Grid>
      <Grid item style={{ borderTop: "0.5px solid grey", background: "transparent" }}>
        <TablePreview key={refreshKey} />
      </Grid>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
          <AlertTitle>Dataset cleaned</AlertTitle>
          {cleanedColumns} columns cleaned successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
}

