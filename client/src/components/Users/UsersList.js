import React, { useEffect } from 'react';
import { connect } from "react-redux";
import UserModal from "./Modal";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { getUsers,handlDelete } from "../../Js/actions/usersAction";
// import { Button } from "antd";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  roots: {
    flexGrow: 1,
    backgroundColor:'#D6EAF8',
    minHeight:"100vh",
  
    // backgroundImage: "linear-gradient(to right, #39D9C9 , #4D5058)"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
  },
  listElement:{
    display:"flex",
    justifyContent:"center",
    borderLeft: "1px solid black",
    maxWidth: "176px",
    overflow: "overlay",
   
  },
  gridBtn: {
    display: "flex",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: "1",
    right: "9px",
    
  },
  offStock:{
    display:"flex",
    justifyContent:"center",
    borderLeft: "1px solid black",
    maxWidth: "176px",
    overflow: "overlay",
    backgroundColor:"#FF0000"
  },
  onStock:{
    display:"flex",
    justifyContent:"center",
    borderLeft: "1px solid black",
    maxWidth: "176px",
    overflow: "overlay",
    backgroundColor:"#66cc00"
  },
   card: {
    top: "100px",
    zIndex: "1",
    position: "fixed",
    left: "50px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  merchDiv:{
    display:"flex",
    width: "inherit",
    padding: "12px",
  }

}));

const MerchList = ({ getUsers,user, handlDelete }) => {


  

  const classes = useStyles();
  useEffect(() => {
    getUsers();
      },[getUsers,user] );
 

  return (
    <div className={classes.roots}>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
       
        <UserModal />
      
          
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.list}>
              <Grid className={classes.listElement} item xs={3}>
                <h3>Name</h3>
              </Grid>
              <Grid className={classes.listElement} item xs={3}>
                <p>Family Name</p>
              </Grid>
              <Grid className={classes.listElement} item xs={3}>
                <p>Last Login</p>
              </Grid>
              <Grid className={classes.listElement} item xs={3}>
                <p>Created Date</p>
              </Grid>
              <Grid className={classes.listElement} item xs={3}>
                <p>Updated Date</p>
              </Grid>
            </Grid>
           
            {user &&
              user.map((el, key) => {
         
            
                return (
                  <div className ={classes.merchDiv} key={el._id}>
               <Grid item xs={12} className={classes.list}>
             
                 <Grid className={classes.onStock} item xs={3}>
                 
                 <h3>{el.name}</h3>
               </Grid> 
              
               
                 

                  <Grid className={classes.listElement} item xs={3}>
                    <p>{el.family_name}</p>
                  </Grid>

                  <Grid className={classes.listElement} item xs={3}>
                    <p>{el.last_login_date}</p>
                  </Grid>
                  <Grid className={classes.listElement} item xs={3}>
                    <p>{el.createdAt}</p>
                  </Grid>
                  <Grid className={classes.listElement} item xs={3}>
                    <p>{el.updatedAt}</p>
                  </Grid>

                  

                
                  <Grid  item xs={3} className={classes.gridBtn}>
                  <UserModal
                    cardInfo={el}
                    type="warning dashed"
                    className="btnDelite"
                  />
                  <button
                    type="danger dashed"
                    className="btnEdit"
                    onClick={() => {
                      handlDelete(el._id);
                     
                    }}
                  >
                    Delete
                  </button>
                  </Grid>
              </Grid>
              </div>
              )})}
         
          </Grid>
      
        </Container>
      </React.Fragment>
      
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
});
export default connect(mapStateToProps, {getUsers,handlDelete })(MerchList);
