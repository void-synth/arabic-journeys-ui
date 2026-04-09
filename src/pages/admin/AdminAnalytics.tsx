import { AdminLayout } from "@/layouts/AdminLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Jan", sessions: 12, students: 30 },
  { month: "Feb", sessions: 18, students: 35 },
  { month: "Mar", sessions: 24, students: 42 },
  { month: "Apr", sessions: 20, students: 48 },
];

const statusData = [
  { name: "Completed", value: 45, color: "hsl(152, 55%, 36%)" },
  { name: "Upcoming", value: 20, color: "hsl(215, 75%, 48%)" },
  { name: "Cancelled", value: 5, color: "hsl(0, 72%, 48%)" },
];

const attendanceData = [
  { week: "W1", rate: 85 },
  { week: "W2", rate: 90 },
  { week: "W3", rate: 78 },
  { week: "W4", rate: 92 },
];

const axisColor = "hsl(220, 12%, 42%)";
const gridColor = "hsl(220, 16%, 88%)";
const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid hsl(220 16% 88%)",
  background: "hsl(0 0% 100% / 0.96)",
  color: "hsl(220 20% 18%)",
  boxShadow: "0 12px 40px hsl(220 25% 20% / 0.12)",
};

export default function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="page-container">
        <PageHeader
          title="Analytics"
          description="Organization-wide trends. Teachers only see analytics for their own teaching; this page is for admins."
        />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Monthly sessions & students</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="sessions" fill="hsl(160, 62%, 48%)" radius={[6, 6, 0, 0]} name="Sessions" />
                <Bar dataKey="students" fill="hsl(38, 96%, 54%)" radius={[6, 6, 0, 0]} name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Session status mix</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={88}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="glass-card rounded-[var(--radius-lg)] p-5 md:p-6 lg:col-span-2">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Attendance rate (%)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: axisColor }} axisLine={false} tickLine={false}                 domain={[60, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="rate" stroke="hsl(160, 62%, 52%)" strokeWidth={2.5} dot={{ fill: "hsl(160, 62%, 52%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
