import React from "react";
import AppRouter from "./router/router";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { connect } from "react-redux";
import { setTheme } from "./Js/actions/actions";
import styles from "./app.module.scss";

function App({ theme }) {
  return (
    <MuiThemeProvider theme={createMuiTheme({ palette: { type: theme } })}>
      <CssBaseline />
      <div className={styles.app}>
        <AppRouter />
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    theme: state.rootReducer.theme,
  };
};

export default connect(mapStateToProps, { setTheme })(App);
