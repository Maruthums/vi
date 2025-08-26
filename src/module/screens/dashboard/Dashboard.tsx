import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Colors } from "../../utils/color";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 7 }, (_, i) => currentYear - 6 + i);

const data = years.map((year) => ({
  year,
  users: Math.floor(Math.random() * 500 + 100), // 100–600
  active: Math.floor(Math.random() * 300 + 50),  // 50–350
}));

const DashboardUserChart: React.FC = () => {
  return (
    <Card
      sx={{
        borderRadius: 1,
        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
        m: 2,
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold" color={Colors.greys.DarkGrey}>
            User Growth Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {years[0]} - {years[years.length - 1]}
          </Typography>
        </Box>

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={Colors.greens.LightGreen} stopOpacity={0.9} />
                <stop offset="95%" stopColor={Colors.greens.lightGreenTran} stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#555" }} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Bar
              dataKey="users"
              barSize={28}
              radius={[10, 10, 0, 0]}
              fill="url(#barGradient)"
              name="Total Users"
            />
            <Line
              type="monotone"
              dataKey="active"
              stroke={Colors.greens.DarkGreen}
              strokeWidth={3}
              dot={{ r: 5, fill: Colors.greens.LightGreen }}
              name="Active Users"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashboardUserChart;
