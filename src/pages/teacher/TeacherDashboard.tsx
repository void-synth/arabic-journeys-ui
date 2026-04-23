import { TeacherLayout } from "@/layouts/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentTeacher } from "@/data/mock";
import { Users, Calendar, Clock, BookOpen, ArrowRight, TriangleAlert, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";

export default function TeacherDashboard() {
  const sessions = useStoredSessions();
  const students = useStoredStudents();
  const assignments = useTeacherAssignments();
  const mySessions = sessions.filter((s) => s.teacherId === currentTeacher.id);
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const rosterStudentIds = new Set([...mySessions.flatMap((s) => s.students), ...(assignments[currentTeacher.id] ?? [])]);
  const rosterCount = students.filter((student) => rosterStudentIds.has(student.id)).length;
  const completionRate = mySessions.length ? Math.round((completed.length / mySessions.length) * 100) : 0;
  const priorityMessage =
    cancelled.length > 0
      ? `${cancelled.length} cancelled session${cancelled.length > 1 ? "s" : ""} need follow-up.`
      : upcoming.length === 0
      ? "No upcoming sessions. Consider scheduling the next class."
      : "No urgent issues right now. Your schedule looks healthy.";
  const todayLabel = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <TeacherLayout title="Dashboard">
      <div className="page-container">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-12"
          >
            <Card className="overflow-hidden rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.6)] shadow-[0_22px_70px_-42px_hsl(160_35%_18%/0.16)]">
              <CardContent className="relative p-8 sm:p-10 lg:p-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(160_45%_92%/0.35),transparent_55%)]" aria-hidden />
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-foreground/55">{todayLabel}</p>
                <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.05] text-foreground">
                  Welcome back, {currentTeacher.name.split(" ")[0]}.
                </h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-foreground/70">
                  Your schedule, roster, and quick actions—so you can spend more time teaching and less time chasing links.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="lg:col-span-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
            <StatCard title="Completed" value={completed.length} icon={BookOpen} trend={`${completionRate}% completion`} trendUp />
            <StatCard title="Learners on roster" value={rosterCount} icon={Users} />
            <StatCard title="Cancelled" value={cancelled.length} icon={Calendar} trend="needs follow-up" trendUp={cancelled.length === 0} />
          </div>

          <div className="lg:col-span-12 grid gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <Card className="rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-4">
                    <CardTitle className="font-display text-lg text-foreground">Upcoming sessions</CardTitle>
                    <Link to="/teacher/sessions">
                      <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                        See all <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Your next classes with quick access to each session record.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcoming.length === 0 ? (
                    <p className="py-10 text-center text-sm text-foreground/60">No upcoming sessions.</p>
                  ) : (
                    upcoming.slice(0, 6).map((s) => (
                      <Link
                        key={s.id}
                        to={`/teacher/sessions/${s.id}`}
                        className="flex items-center justify-between gap-4 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">{s.title}</p>
                          <p className="mt-1 text-xs text-foreground/60">
                            {s.date} · {s.time} · {s.duration} min
                          </p>
                        </div>
                        <StatusBadge status={s.status} />
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04 }}
              className="lg:col-span-4 space-y-6"
            >
              <Card className="rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-lg text-foreground">Priority</CardTitle>
                  <CardDescription>What needs attention today.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                    <TriangleAlert className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">Priority check</p>
                      <p className="mt-1 text-sm text-foreground/70">{priorityMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-lg text-foreground">Quick actions</CardTitle>
                  <CardDescription>Common teacher workflows.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <Button
                      variant="outline"
                      className="justify-between rounded-2xl border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground hover:bg-[hsl(42_40%_99%/0.8)]"
                      asChild
                    >
                      <Link to="/teacher/sessions/create">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" aria-hidden />
                          New session
                        </span>
                        <ArrowRight className="h-4 w-4 text-foreground/45" aria-hidden />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-between rounded-2xl border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground hover:bg-[hsl(42_40%_99%/0.8)]"
                      asChild
                    >
                      <Link to="/teacher/students">
                        <span className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-primary" aria-hidden />
                          My learners
                        </span>
                        <ArrowRight className="h-4 w-4 text-foreground/45" aria-hidden />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-between rounded-2xl border-[hsl(160_25%_28%/0.16)] bg-[hsl(42_40%_99%/0.65)] text-foreground hover:bg-[hsl(42_40%_99%/0.8)]"
                      asChild
                    >
                      <Link to="/teacher/attendance">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                          Attendance
                        </span>
                        <ArrowRight className="h-4 w-4 text-foreground/45" aria-hidden />
                      </Link>
                    </Button>

                    <div className="flex items-start gap-3 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                      <Sparkles className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                      <p className="text-sm text-foreground/70">
                        Tip: add the meeting link when you create a session—students will see a “Join class” button automatically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
