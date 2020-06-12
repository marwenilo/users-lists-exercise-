import React, { useEffect, useMemo, useState } from 'react'
import { connect } from "react-redux";
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useTable, usePagination } from 'react-table'
import { getUsers } from "../../Js/actions/usersAction";

// import makeData from './makeData'
import axios from "axios";

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
`

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
//   React.useEffect(() => {
//     fetchData({ pageIndex, pageSize })
//   }, [ pageIndex, pageSize])

  // Render the UI for your table
  return (
    <>
   
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              
              <tr {...row.getRowProps()}>
                
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
          <tr>
            {loading ? (
              // Use our custom loading state to show a loading indicator
              <td colSpan="10000">Loading...</td>
            ) : (
              <td colSpan="10000">
                Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
                results
              </td>
            )}
          </tr>
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

// Let's simulate a large dataset on the server (outside of our component)
// const serverData = makeData(10000)

function Test() {
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

      const sub_columns = columns.slice(0)
      sub_columns.push({
              id: 'delete',
              accessor: 'id',
              Cell: ({value}) => ( <Link to={`/users-list/${value}`}><button>Delete</button></Link>)
      })
    
      sub_columns.push({
        id: 'button',
        accessor: 'id',
        Cell: ({value}) => (<button onClick={()=>console.log('clicked value', value)}>Edit</button>)
})
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
      const btn =()=>{
       
      }
     
      const onRowClick = ( rowInfo, column, instance) => {
        return {
            onClick: e => {
                console.log('A Td Element was clicked!')
                console.log('it produced this event:', e)
                console.log('It was in this column:', column)
                console.log('It was in this row:', rowInfo)
                console.log('It was in this table instance:', instance)
            }
        }
    }
  // We'll start our table without any data
  const [data, setData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0)

      

  return (
    <Styles> 

      <Table
        columns={sub_columns}
        data={data}
        // fetchData={get}
        loading={loading}
        pageCount={pageCount}
        // getTrProps={onRowClick}
      />
    </Styles>
  )
}
const mapStateToProps = (state) => ({
    user: state.usersReducer.user,
  });
export default connect(mapStateToProps, { getUsers })(
    Test
  )
