import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table'; 
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow'; 
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography'; 
import TableContainer from '@mui/material/TableContainer'; 
import Grid from '@mui/material/Unstable_Grid2'; 

import AppWidgetSummary from 'src/sections/overview/app-widget-summary';

export default function Dashboard() {

  const [books, setBooks] = useState([]);
  const [bookcount, setBookcount] = useState([]);
  const [usercount, setUsercount] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;    
    console.log("token=",token)
    axios.get('http://localhost:8080/api/book/GetAll', {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
    .then(response => {
        setBooks(response.data);
    })
    .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
    });

    axios.get('http://localhost:8080/api/book/count').then(response => { setBookcount(response?.data)})
    axios.get('http://localhost:8080/api/user/count').then(response => { setUsercount(response?.data)})
}, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Toplam Kitap Sayısı"
            total={bookcount}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Toplam Kullanıcı Sayısı"
            total={usercount}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Verilen Kitap Sayısı"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="İade Edilmesi Gereken Kitap Sayısı"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <TableContainer component={Paper} sx={{ mt: 5 }}>
        <Table>          
          <TableHead>          
            <TableRow>
              <TableCell>Adı</TableCell>
              <TableCell>Özet</TableCell>
              <TableCell>Yazar</TableCell>
              <TableCell>Stok Sayısı</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow >
                <TableCell>{book?.bookName}</TableCell>  
                <TableCell>{book?.summary}</TableCell>              
                <TableCell>{book?.author}</TableCell>                
                <TableCell>{book?.quantity}</TableCell>
              </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>

      </Grid>
    </Container>
  );
}
