import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SimpleAlerts = ({ alerts }) => {
  const classes = useStyles();
  const alert =
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert,key) => (
      <div key = {key} className={classes.root}>
        <Alert variant="filled" severity="error" key={alert.id}>
          {alert.msg}
        </Alert>
      </div>
    ));
  return alert;
};
Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alerts: state.alertReducer,
});
export default connect(mapStateToProps)(SimpleAlerts);
