import React from "react";
import { Typography, Card, CardContent } from "@mui/material";

const TurfList = () => {
  const turfs = ["Green Park", "City Sports Arena", "Elite Turf"];

  return (
    <div className="container mt-4">
      <Typography variant="h4" gutterBottom>
        Available Turfs
      </Typography>
      {turfs.map((t, i) => (
        <Card key={i} className="mt-2">
          <CardContent>
            <Typography variant="h6">{t}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TurfList;
