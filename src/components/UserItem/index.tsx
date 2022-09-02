import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, ListItemText, Menu, MenuItem } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

interface UserItemProps {
  user: any;
  handleEdit: (user: any) => void;
  handleDelete: (id: number) => void;
}

function UserItem({ user, handleEdit, handleDelete }: UserItemProps) {
  const navigate = useNavigate();
  const { id, email, first_name, last_name, avatar } = user;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToDetail = (id: number) => {
    console.log(id);
    //go to detail page and pass selected user
    navigate(`/user/${id}`, {
      state: {
        user: user,
      },
    });
  };

  useEffect(() => {
    console.log("useritem");
  }, []);

  return (
    <Grid xs={4} key={id}>
      <Card>
        <Stack m={3} spacing={2} direction="row">
          <Avatar
            sx={{ bgcolor: "red", width: 56, height: 56 }}
            aria-label="recipe"
            src={avatar}
          />
          <ListItemText
            primary={`${first_name} ${last_name}`}
            secondary={email}
            primaryTypographyProps={{
              style: { fontWeight: "bold", textAlign: "left" },
            }}
            secondaryTypographyProps={{ style: { color: "gray" } }}
          />
          <IconButton onClick={handleClick}>
            <MoreHorizIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => goToDetail(id)}>View Detail</MenuItem>
            <MenuItem onClick={() => handleEdit(user)}> Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
          </Menu>
        </Stack>
      </Card>
    </Grid>
  );
}
export default UserItem;
