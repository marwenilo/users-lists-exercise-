import React, { useMemo } from "react";
import { connect } from "react-redux";
import { getUsers, handlDelete } from "../../Js/actions/usersAction";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";
import UserModal from "./UserModal";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Container from "@material-ui/core/Container";
const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Table({ columns, data, pageCount: controlledPageCount }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination

      pageCount: controlledPageCount,
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

const User = (props) => {
  const { user, handlDelete } = props;
  const id = props.match.params.id;
  const filtredUser = user.find((el) => el.id === Number(id));
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

  const sub_columns = columns.slice(0);
  sub_columns.push({
    id: "delete",
    accessor: "id",
    Cell: ({ value }) => (
      <Link onClick={() => handlDelete(id)} to={`/`}>
        <IconButton aria-label="Edit">
          <DeleteIcon />
        </IconButton>
      </Link>
    ),
  });
  sub_columns.push({
    id: "deletes",
    accessor: "id",
    Cell: ({ value }) => <UserModal userInfo={filtredUser} />,
  });

  return (
    <Container maxWidth="lg">
    <Styles>
      <Table columns={sub_columns} data={filtredUser ? [filtredUser] : []} />
    </Styles>
    </Container>
  );
};
const mapStateToProps = (state) => ({
  user: state.usersReducer.users,
});

export default connect(mapStateToProps, { getUsers, handlDelete })(User);
