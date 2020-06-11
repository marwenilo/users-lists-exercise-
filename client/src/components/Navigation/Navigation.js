import React, { Component } from "react";
import styles from "./navigation.module.scss";
import { connect } from "react-redux";
import { setTheme } from "../../Js/actions/actions";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";

class Navigation extends Component {
  switchTheme = () => {
    this.props.theme === "light"
      ? this.props.setTheme("dark")
      : this.props.setTheme("light");
  };

  render() {
    const linkColor =
      this.props.theme === "light" ? styles.black : styles.white;
    const linkStyle = [styles.link, linkColor].join(" ");

    return (
      <div className={styles.nav}>
        <AppBar position="static" color="default">
          <Toolbar>
            <div className={styles.flexGrow}>
              <Link className={linkStyle} to="/">
                Home
              </Link>

              <font>
                <Link className={linkStyle} to="/login">
                  Login
                </Link>
                <Link className={linkStyle} to="/test">
                  test
                </Link>

                <Link className={linkStyle} to="/registration">
                  Registration
                </Link>
              </font>
            </div>
            <IconButton className={styles.theme} onClick={this.switchTheme}>
              <i className="material-icons">invert_colors</i>
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.rootReducer.theme,
  };
};

export default connect(mapStateToProps, { setTheme })(Navigation);
