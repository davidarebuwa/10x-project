import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import {User} from "../../core/model/User";

interface UserItemProps {
  user: User;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

function UserItem({ user, handleEdit, handleDelete }: UserItemProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { id, email, first_name, last_name, avatar } = user;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  //Menu Properties
  const [anchorEl, setAnchorEl] = React.useState<EventTarget & HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> ) => {
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
          {avatar ? (
          <Avatar
            sx={{ bgcolor: "red", width: 56, height: 56 }}
            aria-label="recipe"
            src={avatar}
          />
          ) : (
            <Skeleton variant="circular" width={56} height={56} />
          )}
          { first_name && last_name ? (
          <ListItemText
            primary={`${first_name} ${last_name}`}
            secondary={email}
            primaryTypographyProps={{
              style: { fontWeight: "bold", textAlign: "left", wordWrap: "break-word" },
            }}
            secondaryTypographyProps={{ style: { color: "gray", wordWrap: 'break-word', } }}
          />
          ) : (
            <Skeleton variant="text" width={200} />
          )}
         
            {!isMobile ? ( 
               <ButtonGroup variant="contained" aria-label="split button">
              <Button onClick={() => {goToDetail(id)}}>Details</Button>
              <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={(e) => {handleClick(e)}}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
            ) : (
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={(e) => {handleClick(e)}}
            >
              <ArrowDropDownIcon />
            </Button>
            )}
         

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {isMobile ? ( 
              <MenuItem onClick={() => {goToDetail(id)}}>Details</MenuItem>
            ): null }
            <MenuItem onClick={() => handleEdit(user)}>Edit</MenuItem>
            <MenuItem onClick={() => handleDelete(id)}>Delete</MenuItem>
          </Menu>
        </Stack>
      </Card>
    </Grid>
  );
}
export default UserItem;
