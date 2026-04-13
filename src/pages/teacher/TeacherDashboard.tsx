import { TeacherLayout } from "@/layouts/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { sessions, currentTeacher, getStudentsForTeacher } from "@/data/mock";
import { Users, Calendar, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export default function TeacherDashboard() {
  const mySessions = sessions.filter((s) => s.teacherId === currentTeacher.id);
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const rosterCount = getStudentsForTeacher(currentTeacher.id).length;
  const sessionMixData = [
    { status: "Upcoming", count: upcoming.length },
    { status: "Completed", count: completed.length },
    { status: "Cancelled", count: cancelled.length },
  ];
  const sessionMixConfig = {
    count: { label: "Sessions", color: "hsl(160 42% 38%)" },
  } satisfies ChartConfig;

  return (
    <TeacherLayout title="Dashboard">
      <div className="page-container">
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Your sessions" value={mySessions.length} icon={Calendar} />
          <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
          <StatCard title="Completed" value={completed.length} icon={BookOpen} />
          <StatCard title="Learners on roster" value={rosterCount} icon={Users} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass-card rounded-[var(--radius-lg)] border-white/55 bg-white/80 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="mb-1 flex items-center justify-between">
                  <CardTitle className="font-display text-lg text-foreground">Upcoming sessions</CardTitle>
                  <Link to="/teacher/sessions">
                    <Button variant="ghost" size="sm">
                      View all
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your schedule at a glance with quick access to each room.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {upcoming.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No upcoming sessions</p>}
                {upcoming.map((s) => (
                  <Link
                    key={s.id}
                    to={`/teacher/sessions/${s.id}`}
                    className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-muted/60"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{s.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {s.date} · {s.time} · {s.duration} min
                      </p>
                    </div>
                    <StatusBadge status={s.status} />
                  </Link>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <Card className="glass-card rounded-[var(--radius-lg)] border-white/55 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-display text-lg text-foreground">Session mix</CardTitle>
                <CardDescription>Distribution across upcoming, completed, and cancelled sessions.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={sessionMixConfig} className="h-[190px] w-full">
                  <BarChart accessibilityLayer data={sessionMixData} margin={{ left: -8, right: 6 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Bar dataKey="count" radius={10} fill="var(--color-count)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-6"
        >
          <Card className="glass-card rounded-[var(--radius-lg)] border-white/55 bg-white/80 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="font-display text-lg text-foreground">Quick actions</CardTitle>
              <CardDescription>Common workflows for class management.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/teacher/sessions/create">
                  <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">New session</span>
                  </Button>
                </Link>
                <Link to="/teacher/students">
                  <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">My learners</span>
                  </Button>
                </Link>
                <Link to="/teacher/attendance">
                  <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">Attendance</span>
                  </Button>
                </Link>
                <Link to="/teacher/notifications">
                  <Button variant="outline" className="flex h-auto w-full flex-col gap-1.5 rounded-xl border-border bg-background/80 py-4 hover:bg-muted/80">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium">Alerts</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </TeacherLayout>
  );
}
