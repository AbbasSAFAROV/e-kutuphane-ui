import axios from 'axios';
import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function FormDialog({ open, handleClose, book, setUpdatedBook }) {

    const [first, setfirst] = useState({})


    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                        event.preventDefault();
                        await axios.put('http://localhost:8080/api/book?bookId=' + event?.bookId, event)
                            .then(response => {
                                handleClose();
                                setfirst(response?.data);
                          })
                          .catch(error => {
                            console.error('API isteği sırasında hata oluştu:', error);
                          });

                        
                    }
                }}
            >
                <div>
                    <Box
                        component="img"
                        alt={book?.bookName}
                        src={book?.imageUrl}
                        sx={{
                            top: 0,
                            width: 1,
                            height: '400px',
                            objectFit: 'content',

                        }}
                    />
                </div>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Kitap Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.bookName}
                        onChange={(e) => setUpdatedBook({ ...book, bookName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Kitap Konusu"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.summary}
                        onChange={(e) => setUpdatedBook({ ...book, summary: e.target.value })}
                    />
                    <Typography gutterBottom sx={{ textAlign: 'right', fontFamily: 'serif' }}>
                        {book?.author}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus type="submit">
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
