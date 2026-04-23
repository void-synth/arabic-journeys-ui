import { StudentLayout } from "@/layouts/StudentLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { currentStudent } from "@/data/mock";
import { Calendar, Clock, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStoredSessions } from "@/lib/useStoredSessions";

export default function StudentDashboard() {
  const sessions = useStoredSessions();
  const mySessions = sessions.filter((s) => s.students.includes(currentStudent.id));
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const completionRate = mySessions.length ? Math.round((completed.length / mySessions.length) * 100) : 0;
  const nextSession = [...upcoming].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const todayLabel = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <StudentLayout title="Dashboard">
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
                  Welcome back, {currentStudent.name.split(" ")[0]}.
                </h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-foreground/70">
                  Your next session, quick links, and the small signals that keep your Arabic routine steady.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="lg:col-span-12 grid gap-4 sm:grid-cols-3">
            <StatCard title="Total sessions" value={mySessions.length} icon={Calendar} />
            <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
            <StatCard title="Completion" value={`${completionRate}%`} icon={BookOpen} trend={`${completed.length} completed`} trendUp />
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
                    <Link to="/student/sessions">
                      <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                        See all <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>What’s next, with join links when available.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcoming.length === 0 ? (
                    <p className="py-10 text-center text-sm text-foreground/60">No upcoming sessions yet.</p>
                  ) : (
                    upcoming.slice(0, 6).map((s) => (
                      <div
                        key={s.id}
                        className="flex flex-col gap-3 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <Link to={`/student/sessions/${s.id}`} className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">{s.title}</p>
                          <p className="mt-1 text-xs text-foreground/60">
                            {s.teacherName} · {s.date} · {s.time}
                          </p>
                        </Link>
                        <div className="flex items-center gap-2 shrink-0">
                          <StatusBadge status={s.status} />
                          {s.meetingLink ? (
                            <a href={s.meetingLink} target="_blank" rel="noreferrer">
                              <Button size="sm" className="rounded-2xl bg-primary text-primary-foreground hover:bg-primary">
                                Join
                              </Button>
                            </a>
                          ) : null}
                        </div>
                      </div>
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
                  <CardTitle className="font-display text-lg text-foreground">Daily note</CardTitle>
                  <CardDescription>One small cue for steady progress.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    Keep your warm-up short: read a paragraph aloud, then write three new words with vowels.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-lg text-foreground">Next session</CardTitle>
                  <CardDescription>Quick access to what’s closest.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nextSession ? (
                    <>
                      <p className="text-sm text-foreground/70">
                        <span className="font-semibold text-foreground">{nextSession.title}</span>
                        <span className="text-foreground/60"> · {nextSession.date} · {nextSession.time}</span>
                      </p>
                      {nextSession.meetingLink ? (
                        <a href={nextSession.meetingLink} target="_blank" rel="noreferrer" className="block">
                          <Button className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary">
                            Join class
                          </Button>
                        </a>
                      ) : (
                        <Button
                          variant="outline"
                          className="w-full rounded-2xl border-[hsl(160_25%_28%/0.18)] bg-[hsl(42_40%_99%/0.6)] text-foreground"
                          asChild
                        >
                          <Link to="/student/sessions">Open sessions</Link>
                        </Button>
                      )}
                    </>
                  ) : (
                    <div className="rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                        <p className="text-sm text-foreground/70">
                          No upcoming session yet. When your teacher schedules the next class, it’ll show up here.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
