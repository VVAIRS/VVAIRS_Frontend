import React from "react";
import { Box } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { keyframes } from "@mui/system";

const showHide = keyframes`
  0% { opacity: 0; transform: translateY(6px) scale(0.8); }
  10% { opacity: 1; transform: translateY(0) scale(1); }
  30% { opacity: 1; }
  40% { opacity: 0; transform: translateY(-6px) scale(0.8); }
  100% { opacity: 0; }
`;

export default function SequentialAILoader() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={60}
            width={120}
        >
            <SmartToyOutlinedIcon
                sx={{
                    position: "absolute",
                    fontSize: 42,
                    animation: `${showHide} 2.4s infinite`,
                }}
            />
            <PsychologyOutlinedIcon
                sx={{
                    position: "absolute",
                    fontSize: 42,
                    animation: `${showHide} 2.4s infinite 0.8s`,
                }}
            />
            <AutoAwesomeOutlinedIcon
                sx={{
                    position: "absolute",
                    fontSize: 42,
                    animation: `${showHide} 2.4s infinite 1.6s`,
                }}
            />
        </Box>
    );
}
