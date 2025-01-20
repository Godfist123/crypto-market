"use client";
import { RootState } from "@/store/store";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removePin } from "@/store/slices/PinSlice";
// interface PinedComponentProps {
//   // Define your props here
// }

const PinedComponent: React.FC = () => {
  const data = useSelector((state: RootState) => state.pin);
  console.log(data);
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data.map((coin) => {
        return (
          <Box key={coin.id}>
            <Typography variant="h4">Pin List</Typography>
            <Card
              sx={{ p: 2, m: 2, width: 200 }}
              onClick={() => {
                window.location.href = `/coin/${coin.id}`;
              }}
            >
              <DeleteOutline
                cursor="pointer"
                sx={{ color: "#E2C4C4", marginRight: 2, fontSize: 20 }}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removePin(coin.id));
                }}
              />
            </Card>
          </Box>
        );
      })}
    </div>
  );
};

export default PinedComponent;
