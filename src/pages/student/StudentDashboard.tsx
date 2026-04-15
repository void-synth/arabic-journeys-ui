import { StudentLayout } from "@/layouts/StudentLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentStudent } from "@/data/mock";
import { Calendar, Clock, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useStoredSessions } from "@/lib/useStoredSessions";

export default function StudentDashboard() {
  const sessions = useStoredSessions();
  const mySessions = sessions.filter((s) => s.students.includes(currentStudent.id));
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const completionRate = mySessions.length ? Math.round((completed.length / mySessions.length) * 100) : 0;
  const nextSession = [...upcoming].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const learningFlowData = [
    { stage: "Upcoming", count: upcoming.length },
    { stage: "Completed", count: completed.length },
    { stage: "Cancelled", count: cancelled.length },
  ];
  const learningFlowConfig = {
    count: { label: "Sessions", color: "hsl(215 75% 48%)" },
  } satisfies ChartConfig;

  return (
    <StudentLayout title="Dashboard">
      <div className="page-container">
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <StatCard title="Total sessions" value={mySessions.length} icon={Calendar} />
          <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
          <StatCard title="Completed" value={completed.length} icon={BookOpen} trend={`${completionRate}% completion`} trendUp />
        </div>

        <Card className="mb-6 border-white/55 bg-white/80 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground">Next session</p>
            {nextSession ? (
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  {nextSession.title} with {nextSession.teacherName} · {nextSession.date} at {nextSession.time}
                </p>
                {nextSession.meetingLink ? (
                  <a href={nextSession.meetingLink} target="_blank" rel="noreferrer">
                    <Button size="sm">Join class</Button>
                  </a>
                ) : null}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">No upcoming class yet. Check back after scheduling updates.</p>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass-card rounded-[var(--radius-lg)] border-white/55 bg-white/80 backdrop-blur-xl">
              <CardHeader className="pb-3">
                <div className="mb-1 flex items-center justify-between">
                  <CardTitle className="font-display text-lg text-foreground">Upcoming sessions</CardTitle>
                  <Link to="/student/sessions">
                    <Button variant="ghost" size="sm">
                      View all
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your next classes and direct join links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                {upcoming.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No upcoming sessions</p>}
                {upcoming.map((s) => (
                  <div
                    key={s.id}
                    className="flex flex-col gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <Link to={`/student/sessions/${s.id}`} className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm">{s.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {s.teacherName} · {s.date} · {s.time}
                      </p>
                    </Link>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusBadge status={s.status} />
                      {s.meetingLink && (
                        <a href={s.meetingLink} target="_blank" rel="noreferrer">
                          <Button size="sm" className="rounded-lg">
                            Join
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
            <Card className="glass-card rounded-[var(--radius-lg)] border-white/55 bg-white/80 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="font-display text-lg text-foreground">Learning flow</CardTitle>
                <CardDescription>How your sessions are moving this cycle.</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={learningFlowConfig} className="h-[190px] w-full">
                  <AreaChart accessibilityLayer data={learningFlowData} margin={{ left: -8, right: 8 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="stage" tickLine={false} axisLine={false} tickMargin={10} />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-count)"
                      fill="var(--color-count)"
                      fillOpacity={0.26}
                      strokeWidth={2.3}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </StudentLayout>
  );
}
