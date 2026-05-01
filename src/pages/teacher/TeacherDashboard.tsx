import { TeacherLayout } from "@/layouts/TeacherLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Users, CalendarBlank, Clock, BookOpen, ArrowRight, WarningCircle, Sparkle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";
import { useAuth } from "@/lib/auth";
import "./TeacherDashboard.css";

export default function TeacherDashboard() {
  const auth = useAuth();
  const teacherId = auth.userId;
  const sessions = useStoredSessions();
  const students = useStoredStudents();
  const assignments = useTeacherAssignments();
  const mySessions = sessions.filter((s) => teacherId && s.teacherId === teacherId);
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const rosterStudentIds = new Set([...mySessions.flatMap((s) => s.students), ...(teacherId ? assignments[teacherId] ?? [] : [])]);
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
        <div className="dashboard-grid">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="dashboard-span-full"
          >
            <Card className="dashboard-hero-card">
              <CardContent className="dashboard-hero-content">
                <div className="dashboard-hero-glow" aria-hidden />
                <p className="dashboard-kicker">{todayLabel}</p>
                <h1 className="dashboard-title font-display">
                  Welcome back, {(auth.userName || "Teacher").split(" ")[0]}.
                </h1>
                <p className="dashboard-subtitle">
                  Your schedule, roster, and quick actions—so you can spend more time teaching and less time chasing links.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="dashboard-stats dashboard-span-full">
            <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
            <StatCard title="Completed" value={completed.length} icon={BookOpen} trend={`${completionRate}% completion`} trendUp />
            <StatCard title="Learners on roster" value={rosterCount} icon={Users} />
            <StatCard title="Cancelled" value={cancelled.length} icon={CalendarBlank} trend="needs follow-up" trendUp={cancelled.length === 0} />
          </div>

          <div className="dashboard-layout-main dashboard-span-full">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dashboard-main-col"
            >
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <div className="dashboard-header-row">
                    <CardTitle className="dashboard-card-title font-display">Upcoming sessions</CardTitle>
                    <Link to="/teacher/sessions">
                      <Button variant="ghost" size="sm" className="dashboard-ghost-btn">
                        See all <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Your next classes with quick access to each session record.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcoming.length === 0 ? (
                    <div className="dashboard-empty-box dashboard-empty-box-lg">
                      <div className="dashboard-empty-split">
                        <div className="dashboard-empty-row">
                          <Sparkle className="dashboard-empty-icon dashboard-empty-icon-lg" aria-hidden />
                          <div>
                            <p className="dashboard-section-title">No upcoming sessions yet</p>
                            <p className="dashboard-copy">
                              Create your next class so learners see it on their dashboard with join links when you add them.
                            </p>
                          </div>
                        </div>
                        <div className="dashboard-empty-actions">
                          <Button asChild className="dashboard-primary-btn">
                            <Link to="/teacher/sessions/create">New session</Link>
                          </Button>
                          <Button variant="outline" asChild className="dashboard-outline-btn">
                            <Link to="/teacher/sessions">All sessions</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    upcoming.slice(0, 6).map((s) => (
                      <Link
                        key={s.id}
                        to={`/teacher/sessions/${s.id}`}
                        className="dashboard-session-row dashboard-session-row-teacher"
                      >
                        <div className="dashboard-session-link">
                          <p className="dashboard-session-title">{s.title}</p>
                          <p className="dashboard-session-meta">
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
              className="dashboard-side-col"
            >
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title font-display">Priority</CardTitle>
                  <CardDescription>What needs attention today.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="dashboard-empty-box">
                    <WarningCircle className="dashboard-empty-icon" aria-hidden />
                    <div className="dashboard-session-link">
                      <p className="dashboard-section-title">Priority check</p>
                      <p className="dashboard-copy">{priorityMessage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title font-display">Quick actions</CardTitle>
                  <CardDescription>Common teacher workflows.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="dashboard-action-grid">
                    <Button
                      variant="outline"
                      className="dashboard-action-btn"
                      asChild
                    >
                      <Link to="/teacher/sessions/create">
                        <span className="flex items-center gap-2">
                          <CalendarBlank className="h-4 w-4 text-primary" aria-hidden />
                          New session
                        </span>
                        <ArrowRight className="h-4 w-4 text-foreground/45" aria-hidden />
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="dashboard-action-btn"
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
                      className="dashboard-action-btn"
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

                    <div className="dashboard-empty-box">
                      <Sparkle className="dashboard-empty-icon" aria-hidden />
                      <p className="dashboard-copy">
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
