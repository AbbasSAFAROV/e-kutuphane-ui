import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ShopProductCard({ book }) {

  const [modal, setModal] = useState(false);

  const renderStatus = (
    <Label
      variant="filled"
      color={(book?.status === 'aktif' && 'success') || 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {book?.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={book?.bookName}
      src={book?.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {book?.quantity && book?.quantity} */}
      </Typography>
      &nbsp;
      {book?.quantity}
    </Typography>
  );

  return (
    <>
      <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {book?.status && renderStatus}
        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {book?.bookName}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Link sx={{
            color: 'text.disabled',
            textDecoration: 'none',
          }}> {book?.author}</Link>
          {renderPrice}
        </Stack>
      </Stack>
    </Card>

    
    </>
      
      


  );
}

ShopProductCard.propTypes = {
  book: PropTypes.object,
};
