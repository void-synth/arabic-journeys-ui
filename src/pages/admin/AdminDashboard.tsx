import { AdminLayout } from "@/layouts/AdminLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { adminActivity } from "@/data/mock";
import { Users, GraduationCap, Calendar, TrendingUp, TriangleAlert, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents, useStoredTeachers } from "@/lib/useStoredDirectory";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const sessions = useStoredSessions();
  const students = useStoredStudents();
  const teachers = useStoredTeachers();
  const upcoming = sessions.filter((s) => s.status === "upcoming");
  const completed = sessions.filter((s) => s.status === "completed");
  const cancelled = sessions.filter((s) => s.status === "cancelled");
  const completionRate = sessions.length ? Math.round((completed.length / sessions.length) * 100) : 0;
  const inactiveStudents = students.filter((s) => s.status === "inactive").length;
  const inactiveTeachers = teachers.filter((t) => t.status === "inactive").length;
  const atRiskCount = inactiveStudents + inactiveTeachers + cancelled.length;
  const todayLabel = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

  return (
    <AdminLayout title="Overview">
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
                  Platform overview.
                </h1>
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-foreground/70">
                  Teachers, learners, and sessions in one calm surface—so programs run cleanly week to week.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="lg:col-span-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Teachers" value={teachers.length} icon={GraduationCap} />
            <StatCard title="Learners" value={students.length} icon={Users} />
            <StatCard title="Sessions" value={sessions.length} icon={Calendar} trend={`${cancelled.length} cancelled`} trendUp={cancelled.length === 0} />
            <StatCard title="Completion rate" value={`${completionRate}%`} icon={TrendingUp} trend="target 90%" trendUp={completionRate >= 90} />
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
                    <CardTitle className="font-display text-lg text-foreground">Recent sessions</CardTitle>
                    <Link to="/admin/sessions">
                      <Button variant="ghost" size="sm" className="text-foreground/70 hover:text-foreground">
                        See all <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Latest classes across the entire platform.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {sessions.slice(0, 6).map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{s.title}</p>
                        <p className="mt-1 text-xs text-foreground/60">
                          {s.teacherName} · {s.date}
                        </p>
                      </div>
                      <StatusBadge status={s.status} />
                    </div>
                  ))}
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
                  <CardTitle className="font-display text-lg text-foreground">At-risk summary</CardTitle>
                  <CardDescription>Items that need follow-up.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                    <TriangleAlert className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{atRiskCount} watch items</p>
                      <p className="mt-1 text-sm text-foreground/70">
                        {inactiveStudents} inactive learners · {inactiveTeachers} inactive teachers · {cancelled.length} cancellations
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">Upcoming</p>
                      <p className="mt-2 font-display text-2xl text-foreground tabular-nums">{upcoming.length}</p>
                    </div>
                    <div className="rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/55">Completed</p>
                      <p className="mt-2 font-display text-2xl text-foreground tabular-nums">{completed.length}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-[hsl(160_25%_28%/0.12)] bg-[hsl(42_40%_99%/0.6)] p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <p className="text-sm text-foreground/70">
                      Tip: keep cancellations low by assigning teachers early and confirming meeting links before the weekend.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border border-[hsl(160_25%_28%/0.14)] bg-[hsl(42_40%_99%/0.55)] shadow-[0_18px_55px_-38px_hsl(160_35%_18%/0.12)]">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-lg text-foreground">Latest activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {adminActivity.map((a) => (
                      <li key={a.id} className="flex gap-3 text-sm">
                        <span
                          className={[
                            "mt-1.5 h-2 w-2 rounded-full shrink-0 bg-primary",
                            a.tone === "success" ? "opacity-70" : a.tone === "warning" ? "opacity-45" : "opacity-25",
                          ].join(" ")}
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground">{a.label}</p>
                          <p className="text-foreground/60 text-xs mt-0.5">{a.detail}</p>
                          <p className="text-[10px] uppercase tracking-wider text-foreground/55 mt-1">{a.time}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
