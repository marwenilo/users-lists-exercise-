import React, { Component } from "react";
import { connect } from "react-redux";

// import { Modal, button } from 'antd';

import { addNewUser, handleEdit } from "../../Js/actions/usersAction";
import styles from "./user.module.scss";

class Maodal extends Component {
  state = {
    name: this.props.cardInfo ? this.props.cardInfo.name : "",

    family_name: this.props.cardInfo ? this.props.cardInfo.family_name : 0,

    last_login_date: this.props.cardInfo ? this.props.cardInfo.family_name : 0,

    createdAt: this.props.cardInfo ? this.props.cardInfo.createdAt : 0,

    updatedAt: this.props.cardInfo ? this.props.cardInfo.updatedAt : 0,

    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.props.cardInfo
      ? this.props.handleEdit({
          name: this.state.name,
          family_name: this.state.family_name,
          last_login_date: this.state.last_login_date,
          createdAt: this.state.createdAt,
          updatedAt: this.state.updatedAt,
          id: this.props.cardInfo.id,
        }) &&
        this.setState({
          visible: false,
        })
      : this.props.addNewUser({
          name: this.state.name,
          family_name: this.state.family_name,
          last_login_date: this.state.last_login_date,
          createdAt: this.state.createdAt,
          updatedAt: this.state.updatedAt,
        }) &&
        this.setState({
          visible: false,
          name: "",
          family_name: 0,
          last_login_date: 0,
          createdAt: 0,
          updatedAt: 0,
        });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="modal">
        {this.props.cardInfo ? (
          <button type="primary" onClick={this.showModal}>
            UpaDate
          </button>
        ) : (
          <button
            type="primary"
            className={styles.moodal}
            onClick={this.showModal}
          >
            Add User
          </button>
        )}

        {/* <Modal
        title={this.props.cardInfo?  "Edit":  "Add User"}
         
          visible={this.state.visible}
          onOk={()=>{this.handleOk()} }
          onCancel={this.handleCancel}
        > */}

        <form className={styles.formAdd}>
          <span>
            Name{" "}
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </span>
          <span>
            Family Name:{" "}
            <input
              type="text"
              placeholder="Enter Rating"
              name="family_name"
              onChange={this.handleChange}
              value={this.state.family_name}
            />
          </span>
          <span>
            Last Login :
            <input
              type="text"
              placeholder="Enter Image URL"
              name="last_login_date"
              onChange={this.handleChange}
              value={this.state.last_login_date}
            />{" "}
          </span>
          <span>
            Created Date:
            <input
              type="text"
              placeholder="Enter Image URL"
              name="createdAt"
              onChange={this.handleChange}
              value={this.state.createdAt}
            />
          </span>
          <span>
            Updated Date:{" "}
            <input
              type="text"
              placeholder="Enter Rating"
              name="updatedAt"
              onChange={this.handleChange}
              value={this.state.unitPriceBuy}
            />
          </span>
        </form>

        {/* <button color="secondary" className="add-btn" onClick={this.toggle}>Cancel</button> */}

        {/* </Modal> */}
      </div>
    );
  }
}

export default connect(null, { addNewUser, handleEdit })(Maodal);
