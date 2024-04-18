import React from 'react'
import { Box, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';


function LandingPage() {
    const navigate = useNavigate()
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ fontSize: "18px" }}>
        I have created 2 templates of the same test,
      </Typography>
      <Typography sx={{ fontSize: "18px" }}>
        The first design follows your instructions, and the second one is my own
        twist to make it look better.
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          mt: "20px",
        }}
      >
        <Typography
          sx={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => navigate("/template-1")}
        >
          Template 1
        </Typography>
        <Typography
          sx={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => navigate("/template-2")}
        >
          Template 2
        </Typography>
      </Box>
    </Box>
  );
}

export default LandingPage