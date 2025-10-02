import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../services/api";
import { Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Analytics() {
  const [bySport, setBySport] = useState([]);
  const [byDate, setByDate] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllBookings();
        const all = res.data || [];
        const sportMap = {};
        const dateMap = {};
        all.forEach(b => {
          sportMap[b.sportType] = (sportMap[b.sportType] || 0) + 1;
          dateMap[b.bookingDate] = (dateMap[b.bookingDate] || 0) + 1;
        });
        setBySport(Object.entries(sportMap).map(([name, value]) => ({ name, value })));
        setByDate(Object.entries(dateMap).map(([date, value]) => ({ date, value })).sort((a,b)=>a.date.localeCompare(b.date)));
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div>
      <h4>Analytics</h4>
      <div className="row">
        <div className="col-md-6">
          <Card className="p-3">
            <h5>Bookings by Sport</h5>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={bySport} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                    {bySport.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="col-md-6">
          <Card className="p-3">
            <h5>Bookings by Date</h5>
            <div style={{ height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={byDate}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
