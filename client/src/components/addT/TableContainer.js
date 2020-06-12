import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "./components/EnhancedTable";

import axios from "axios";

import { getUsers } from "../../Js/actions/usersAction";
const TabContainer = ({ getUsers, user }) => {
  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "id",
      },
      {
        Header: "User Name",
        accessor: "name",
      },
      {
        Header: "Last Name",
        accessor: "family_name",
      },
      {
        Header: "Last Login",
        accessor: "last_login_date",
      },
      {
        Header: "Creation",
        accessor: "createdAt",
      },
      {
        Header: "Updated",
        accessor: "updatedAt",
      },
    ],
    []
  );

  useEffect(() => {
    getUsers();
    get();
    setLoading(true);
  }, []);
  const get = async () => {
    try {
      const res = await axios.get("/api/users/users");
      setData(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [skipPageReset, setSkipPageReset] = useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  return (
    <div>
      {!loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <CssBaseline />
          <EnhancedTable
            columns={columns}
            data={data}
            setData={setData}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
});
export default connect(mapStateToProps, { getUsers })(
  TabContainer
);
