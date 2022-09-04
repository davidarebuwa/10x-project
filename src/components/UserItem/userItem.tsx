import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  ListItemText,
  Button,
  ButtonGroup,
  Skeleton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActionArea from '@mui/material/CardActionArea';
import {User} from "../../core/model/User";

interface UserItemProps {
  user: User;
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
}

function UserItem({ user, handleEdit, handleDelete }: UserItemProps) {
  const navigate = useNavigate();
  const { id, email, first_name, last_name, avatar } = user;

  const goToDetail = (id: number) => {
    //go to detail page and pass selected user
    navigate(`/user/${id}`, {
      state: {
        user: user,
      },
    });
  };



  return (
    <Grid xs={4} key={id}>
      <Card
        sx={{borderRadius: {xs: 0, md: 2}}}
      >
        <CardActionArea
          component="a"
          sx={{paddingY: "24px", paddingLeft: "24px", paddingRight: "12px"}}
          onClick={() => {goToDetail(id)}}
        >
          <Stack spacing={2} direction="row">
            {avatar ? (
            <Avatar
              sx={{ bgcolor: "red", width: 56, height: 56, border: "2px solid", borderColor: "gray" }}
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
          
            <ButtonGroup>
              <Button
                sx={{borderWidth: 0}}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleEdit(user)
                }}
              >
                <EditIcon color="primary" />
              </Button>
              <Button
                sx={{borderWidth: 0}}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDelete(id)
                }}
              >
                <DeleteIcon color="error" />
              </Button>
            </ButtonGroup>
          </Stack>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
export default UserItem;
