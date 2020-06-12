import React,{useState,useEffect,useMemo} from 'react'
import { connect } from "react-redux";
import { getUsers,handlDelete } from "../../Js/actions/usersAction";
import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'





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
         
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
     
    </>
  )
}

const E=(props) =>{
    const {user,handlDelete,getUsers}=props
    const id = props.match.params.id
   
    useEffect(() => {
        getUsers();
        
      
      }, []);
    const filtredUser = user.filter(el =>  el.id == id)
    console.log(filtredUser,"de")
   
    console.log(props.match.params)





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
              Cell: ({value}) => (<button onClick={()=>handlDelete(id)}>Delete</button>)
      })
    
     
  return (
    <Styles> 

      <Table
        columns={sub_columns}
        data={filtredUser}
        
      />
    </Styles>
  )










}
const mapStateToProps = (state) => ({
    user: state.usersReducer.user,
  });
export default connect(mapStateToProps, { getUsers,handlDelete })(
    E
  )