import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {
  Grid,
  TextField,
  Button,
  useTheme,
  Typography,
  Modal
} from '@mui/material'
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup'
import "./ModalForm.css";


interface ModalProps {
  selectedUser: any;
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (user: any) => void;
}


interface IUserForm {
  first_name: string
  last_name: string
  email: string
  avatar: string
}

interface IFormStatus {
  message: string
  type: string
}

interface IFormStatusProps {
  [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
  success: {
      message: 'Created user successfully.',
      type: 'success',
  },
  duplicate: {
      message: 'Email-id already exist. Please use different email-id.',
      type: 'error',
  },
  error: {
      message: 'Something went wrong. Please try again.',
      type: 'error',
  },
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
 function FormModal({selectedUser,isOpen, handleClose, handleSubmit}: ModalProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const [selected, setSelected] = useState(selectedUser);
  //const handleClose = () => setOpen(false);



  useEffect(() => {
    console.log('useEffect', selectedUser);
    if(selectedUser) {
    setSelected(selectedUser);
    }
    if(!isOpen){
      setSelected({});
    }
  }, [selectedUser]);


  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [formStatus, setFormStatus] = useState<IFormStatus>({
        message: '',
        type: '',
    })

    const createNewUser = async (data: IUserForm, resetForm: Function) => {
      try {
          // API call integration will be here. Handle success / error response accordingly.
          if (data) {
              setFormStatus(formStatusProps.success)
              handleSubmit(data);
              resetForm({})
          }
      } catch (error: any) {
          const response = error.response
          if (
              response.data === 'user already exist' &&
              response.status === 400
          ) {
              setFormStatus(formStatusProps.duplicate)
          } else {
              setFormStatus(formStatusProps.error)
          }
      } finally {
          setDisplayFormStatus(true)
      }
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modal-form">
        <Formik
                initialValues={{
                    first_name:  selected.first_name || '',
                    last_name: selected.last_name || '',
                    email: selected.email || '',
                    avatar: selected.avatar || '',
                }}
                onSubmit={(values: IUserForm, actions) => {
                    createNewUser(values, actions.resetForm)
                    setTimeout(() => {
                        actions.setSubmitting(false)
                    }, 500)
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required('Enter valid email-id'),
                    first_name: Yup.string().required('Please enter first name'),
                    last_name: Yup.string().required('Please enter last name'),
                    avatar: Yup.string().required('Please enter avatar url'),
                })}
            >
                {(props: FormikProps<IUserForm>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props
                    return (
                        <Form>
                            <Typography component="div" variant="h5" align="center" noWrap sx={{margin: 4, fontWeight: 'bold', color: 'text.primary' }}>
                            Create/Update User
                            </Typography>  
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className="form-group"
                                >
                                    <TextField
                                        name="first_name"
                                        id="first_name"
                                        label="First Name"
                                        value={values.first_name}
                                        type="text"
                                        helperText={
                                            errors.first_name && touched.first_name
                                                ? errors.first_name
                                                : 'Enter your first name.'
                                        }
                                        error={
                                            errors.first_name && touched.first_name
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className="form-group"
                                >
                                    <TextField
                                        name="last_name"
                                        id="last_name"
                                        label="Last Name"
                                        value={ values.last_name}
                                        type="text"
                                        helperText={
                                            errors.last_name && touched.last_name
                                                ? errors.last_name
                                                : 'Enter your last name.'
                                        }
                                        error={
                                            errors.last_name && touched.last_name
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className="form-group"
                                >
                                    <TextField
                                        name="email"
                                        id="email"
                                        label="Email-id"
                                        value={values.email}
                                        type="email"
                                        helperText={
                                            errors.email && touched.email
                                                ? errors.email
                                                : 'Enter email-id'
                                        }
                                        error={
                                            errors.email && touched.email
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className="form-group"
                                >
                                    <TextField
                                        name="avatar"
                                        id="avatar"
                                        label="Avatar"
                                        value= {values.avatar}
                                        type="text"
                                        helperText={
                                            errors.avatar && touched.avatar
                                                ? errors.avatar
                                                : 'Enter your avatar url.'
                                        }
                                        error={
                                            errors.avatar && touched.avatar
                                                ? true
                                                : false
                                        }
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        margin="normal"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid
                                    item
                                    lg={10}
                                    md={10}
                                    sm={10}
                                    xs={10}
                                    className="button-form-group"
                                >
                                   <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={isSubmitting}
                                        size="large"
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="reset"
                                        variant="contained"
                                        color="error"
                                        size="large"
                                        sx={{marginLeft: '1rem'}}
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                    {displayFormStatus && (
                                        <div className="formStatus">
                                            {formStatus.type === 'error' ? (
                                         <Typography component="div" variant="body1"noWrap sx={{ fontWeight: 'normal', color: 'text.primary' }}>
                                                    {formStatus.message}
                                                </Typography>
                                            ) : formStatus.type ===
                                              'success' ? (
                                                <Typography component="div" variant="body1"noWrap sx={{fontWeight: 'normal', color: 'text.primary' }}>
                                                    {formStatus.message}
                                                </Typography>
                                            ) : null}
                                        </div>
                                    )}
                                </Grid>
                            
                        </Form>
                    )
                }}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default FormModal;
