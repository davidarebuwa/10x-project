import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUsersListRequest,
  deleteUserRequest,
  createUserRequest,
  updateUserRequest,
} from "../../core/actionCreators/userActionCreators";
import { AppState } from "../../core/reducers/reducers";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import UserItem from "../../components/UserItem/userItem";
import { Collapse, Alert, AlertColor } from "@mui/material";
import "./dashboard.css";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { User } from "../../core/model/User";
import FormModal from "../../components/ModalForm/modalForm";

const alert = {
  severity: ""  ,
  message: "",
};


function Dashboard() {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(
    (state: AppState) => state.users
  );
  const [displayDeleteDialog, setDisplayDeleteDialog] = React.useState(false);
  const handleDialogClose = () => setDisplayDeleteDialog(false);
  const [selectedUser, setSelectedUser] = React.useState({} as User);
  const [displayFormModal, setDisplayFormModal] = React.useState(false);
  const [formState, setFormState] = React.useState("");
  const [alertState, setAlertState] = React.useState(alert);


  const [openAlert, setOpenAlert] = React.useState(false);

  //Closes Form Modal
  const handleClose = () => {
    setDisplayFormModal(false);
  };

  //Submits Form Modal
  const handleSubmit = (user: User) => {
    //check if we're updating or creating a user
    if (formState === "create") {
      dispatch(createUserRequest(user));
    } else {
      dispatch(updateUserRequest(user));
    }
    setDisplayFormModal(false);

    //set alert
    setAlertState({
      severity: "success",
      message: formState === "create" ? "User successfully created" : "User successfully updated",
    });
    setOpenAlert(true);
  };
  const handleItemUpdate = (selected: User) => {
    setDisplayFormModal(true);
    setFormState("update");
    //check for selected user and add user id to selected user
    setSelectedUser(selected);
  };

  const handleItemCreate = () => {
    setFormState("create");
    setSelectedUser({} as User);
    setDisplayFormModal(true);
  };

  const handleDelete = () => {
    setDisplayDeleteDialog(false);

    if (selectedUser) {
      dispatch(deleteUserRequest(selectedUser));
    }
    setSelectedUser({} as User);

    setAlertState({
      severity: "success",
      message: "User deleted successfully",
    });
    setOpenAlert(true);

    // setDisplayDeleteDialog(true);
  };

  const toggleDeleteDialog = (userId: number ) => {
    const user = users.find((user) => user.id === userId) as User;
    setDisplayDeleteDialog(!displayDeleteDialog);
    setSelectedUser(user);
  };

  useEffect(() => {
    dispatch(getUsersListRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  }, [openAlert]);


  return (
    <div className="body">
        <Collapse in={openAlert}>
        <Alert severity={alertState.severity as AlertColor} >
          <div>{alertState.message}</div>
        </Alert>
      </Collapse>
      <Typography
        component="div"
        variant="h5"
        align="left"
        noWrap
        sx={{
          marginTop: 4,
          marginLeft: 4,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Users
      </Typography>
      <div className="container">
        <div>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error</div>
          ) : (
           <Grid
              m={{xs: 0, sm: 0, md: 3}}
              container
              rowSpacing={{xs: 1, sm: 1, md: 4}}
              columnSpacing={{xs: 0, sm: 0, md: 5}}
              columns={{ xs: 4, sm: 4, md: 8 }}
            >
              {users.map((user: User) => (
                <UserItem
                  key={user.id}
                  user={user}
                  handleEdit={handleItemUpdate}
                  handleDelete={toggleDeleteDialog}
                />
              ))}
            </Grid>
          )}
          <div className="fab-container">
            <Fab
              color="primary"
              aria-label="add"
              className="fab"
              onClick={handleItemCreate}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
      </div>
      {/* DELETE USER DIALOG */}
      <Dialog
        open={displayDeleteDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete User?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm if you would like to delete user from the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* CREATE USER MODAL */}
      {displayFormModal ? (
      <FormModal
        selectedUser={selectedUser}
        isOpen={displayFormModal}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      ) : null}
    </div>
  );
}
export default Dashboard;
