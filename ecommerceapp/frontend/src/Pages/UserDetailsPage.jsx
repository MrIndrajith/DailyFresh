import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const getTextColor = (mode) => (mode === 'dark' ? '#fff' : '#1e3c72');

const UserDetailsPage = ({ mode = 'dark' }) => {
  const user = JSON.parse(localStorage.getItem("userDetails")) || {};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #1e3c72 0%, #23272f 100%)'
          : 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      }}
    >
      <Paper elevation={8} sx={{
        p: 5,
        borderRadius: 4,
        minWidth: 400,
        maxWidth: 420,
        background: mode === 'dark' ? 'rgba(34,39,47,0.98)' : 'rgba(255,255,255,0.98)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: '#1e3c72', width: 64, height: 64, mb: 1 }}>
            <PersonIcon sx={{ fontSize: 40, color: '#fff' }} />
          </Avatar>
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: getTextColor(mode) }}>
            User Details
          </Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" />
          <Typography fontWeight={600} sx={{ color: getTextColor(mode) }}>Name:</Typography>
          <Typography sx={{ color: getTextColor(mode) }}>{user.name || '-'}</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HomeIcon color="primary" />
          <Typography fontWeight={600} sx={{ color: getTextColor(mode) }}>Address:</Typography>
          <Typography sx={{ color: getTextColor(mode) }}>{user.address || '-'}</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CakeIcon color="primary" />
          <Typography fontWeight={600} sx={{ color: getTextColor(mode) }}>Date of Birth:</Typography>
          <Typography sx={{ color: getTextColor(mode) }}>{user.dob || '-'}</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <EmailIcon color="primary" />
          <Typography fontWeight={600} sx={{ color: getTextColor(mode) }}>Email ID:</Typography>
          <Typography sx={{ color: getTextColor(mode) }}>{user.email || '-'}</Typography>
        </Box>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PhoneIcon color="primary" />
          <Typography fontWeight={600} sx={{ color: getTextColor(mode) }}>Phone Number:</Typography>
          <Typography sx={{ color: getTextColor(mode) }}>{user.number || '-'}</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserDetailsPage;