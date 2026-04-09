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
  { name: "Completed", value: 45, color: "hsl(152, 60%, 42%)" },
  { name: "Upcoming", value: 20, color: "hsl(210, 80%, 55%)" },
  { name: "Cancelled", value: 5, color: "hsl(0, 72%, 55%)" },
];

const attendanceData = [
  { week: "W1", rate: 85 },
  { week: "W2", rate: 90 },
  { week: "W3", rate: 78 },
  { week: "W4", rate: 92 },
];

export default function AdminAnalytics() {
  return (
    <AdminLayout title="Analytics">
      <div className="page-container">
        <PageHeader title="Analytics" description="Platform performance and insights" />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Monthly Sessions & Students</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="sessions" fill="hsl(168, 60%, 38%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="students" fill="hsl(35, 90%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Session Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 lg:col-span-2">
            <h3 className="font-semibold text-foreground mb-4">Attendance Rate (%)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="hsl(168, 60%, 38%)" strokeWidth={2} dot={{ fill: "hsl(168, 60%, 38%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
