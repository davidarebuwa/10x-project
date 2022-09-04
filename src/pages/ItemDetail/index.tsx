import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  updateUserRequest,
  deleteUserRequest,
} from "../../core/actionCreators/userActionCreators";
import { useNavigate } from "react-router";
import { Button, Avatar, Skeleton, ButtonGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./itemDetail.css";
import { User } from "../../core/model/User";
import FormModal from "../../components/ModalForm/modalForm";

interface UserState {
  user: User;
}

function ItemDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as UserState;
  const { user } = state;
  const [selectedUser, setSelectedUser] = useState({} as User);
  const [displayFormModal, setDisplayFormModal] = useState(false);

  const [displayDeleteDialog, setDisplayDeleteDialog] = React.useState(false);
  const handleDialogOpen = () => setDisplayDeleteDialog(true);
  const handleDialogClose = () => setDisplayDeleteDialog(false);

  //Closes Form Modal
  const handleClose = () => {
    setDisplayFormModal(false);
  };

  const handleItemUpdate = (selected: User) => {
    if (selected) {
      setSelectedUser(selected);
      dispatch(updateUserRequest(selected));
    }
    setDisplayFormModal(false);
  };

  const handleEdit = () => {
    console.log("edit");
    console.log(user);
    setDisplayFormModal(true);
  };

  const handleDelete = () => {
    setDisplayDeleteDialog(false);
    if (user) {
      dispatch(deleteUserRequest(user));
      navigate("/");
    }
  };

  useEffect(() => {
    console.log(user);
    setSelectedUser(user);
  }, [location]);

  return (
    <div className="body">
      <div className="container">
        <div className="back-button-container">
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </div>
        <div className="item-detail-container">
          <div className="item-detail">
            <div className="item-detail-header">
              <Typography
                component="div"
                variant="h5"
                align="center"
                noWrap
                sx={{ margin: 4, fontWeight: "bold", color: "text.primary" }}
              >
                Profile
              </Typography>
            </div>
            <div className="item-detail-body">
              <div className="avatar-container">
                {selectedUser.avatar ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={selectedUser.avatar}
                    sx={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Skeleton variant="circular" width={100} height={100} />
                )}
              </div>

              {selectedUser.first_name && selectedUser.last_name ? (
                <Typography
                  component="div"
                  variant="h6"
                  align="center"
                  noWrap
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {selectedUser.first_name} {selectedUser.last_name}
                  <Typography
                    component="div"
                    variant="caption"
                    align="center"
                    noWrap
                    sx={{ color: "text.primary" }}
                  >
                    {selectedUser.email}
                  </Typography>
                </Typography>
              ) : (
                <Skeleton variant="text" width={200} />
              )}

              <div className="button-container">
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button startIcon={<EditIcon />} onClick={handleEdit}>
                    Edit
                  </Button>
                  <Button startIcon={<DeleteIcon />} onClick={handleDialogOpen}>
                    Delete
                  </Button>
                </ButtonGroup>
              </div>
            </div>
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
      {displayFormModal && (
        <FormModal
          selectedUser={selectedUser}
          isOpen={displayFormModal}
          handleClose={handleClose}
          handleSubmit={handleItemUpdate}
        />
      )}
    </div>
  );
}
export default ItemDetail;
