import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const BookingList = ({ bookings, onDelete }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Typography>No bookings available</Typography>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((b) => (
            <li key={b.id} style={{ marginBottom: 12 }}>
              <Card
                sx={{
                  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={8}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        <span
                          className="material-icons"
                          style={{
                            fontSize: "20px",
                            color: "#1976d2",
                            verticalAlign: "middle",
                            marginRight: "5px",
                          }}
                        >
                          sports_soccer
                        </span>
                        {b.customerName}
                      </Typography>
                      <Typography variant="body2">{b.sportType}</Typography>
                      <Typography variant="body2">{b.bookingDate}</Typography>
                      <Typography variant="body2">{b.timeSlot}</Typography>
                      <Typography variant="body2">{b.duration} hrs</Typography>
                    </Grid>

                <Grid item xs={12} md={4} container justifyContent="flex-end">
<Button
variant="outlined"
color="error"
startIcon={
<span
className="material-icons"
style={{ fontSize: "20px" }}
>
delete
</span>
}
onClick={() => onDelete && onDelete(b.id)}
>
Delete
</Button>
</Grid>
</Grid>
</CardContent>
</Card>
</li>
))}
</ul>
)}
</Box>
);
};

export default BookingList;