import { StudentLayout } from "@/layouts/StudentLayout";
import { StatCard } from "@/components/shared/StatCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CalendarBlank, Clock, BookOpen, ArrowRight, Sparkle, UserCircle, Bell, MegaphoneSimple, CheckCircle } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useAuth } from "@/lib/auth";
import { getTotalOnboardingSteps, readStudentOnboarding } from "@/lib/studentOnboarding";
import { buildDailyCue, buildTrackSummary } from "@/lib/studentOnboardingCopy";
import { logEvent } from "@/lib/analytics";
import { useStoredNotifications } from "@/lib/useStoredNotifications";
import { markNotificationRead } from "@/lib/notificationStore";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const auth = useAuth();
  const studentId = auth.userId;
  const sessions = useStoredSessions();
  const mySessions = sessions.filter((s) => (studentId ? s.students.includes(studentId) : false));
  const upcoming = mySessions.filter((s) => s.status === "upcoming");
  const completed = mySessions.filter((s) => s.status === "completed");
  const cancelled = mySessions.filter((s) => s.status === "cancelled");
  const completionRate = mySessions.length ? Math.round((completed.length / mySessions.length) * 100) : 0;
  const nextSession = [...upcoming].sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];
  const todayLabel = new Date().toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
  const onboarding = studentId ? readStudentOnboarding(studentId) : null;
  const onboardingComplete = onboarding?.status === "completed";
  const onboardingStep = onboarding ? onboarding.currentStep + 1 : 1;
  const onboardingTotalSteps = onboarding ? getTotalOnboardingSteps(onboarding) : 4;
  const personalizedTrack = onboardingComplete && onboarding ? buildTrackSummary(onboarding.profile.goal, onboarding.profile.level) : null;
  const personalizedDailyCue =
    onboardingComplete && onboarding
      ? buildDailyCue(onboarding.profile)
      : "Finish onboarding to unlock a personalized plan and next actions.";
  const notifications = useStoredNotifications("student");
  const unreadNotifications = notifications.filter((row) => !row.read);
  const topNotifications = notifications.slice(0, 4);
  const firstName = (auth.userName || "Student").split(" ")[0];
  const nextActionLabel = !onboardingComplete
    ? "Continue onboarding"
    : nextSession?.meetingLink
      ? "Join next class"
      : "Open sessions";
  const nextActionHref = !onboardingComplete
    ? "/onboarding"
    : nextSession?.meetingLink
      ? nextSession.meetingLink
      : "/student/sessions";
  const isExternalNextAction = Boolean(onboardingComplete && nextSession?.meetingLink);

  return (
    <StudentLayout title="Dashboard">
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
                <h1 className="dashboard-title font-display">Welcome back, {firstName}.</h1>
                <p className="dashboard-subtitle">
                  {personalizedTrack
                    ? `${personalizedTrack} Your next session and practice cues are tuned to this path.`
                    : "Your next session, quick links, and the small signals that keep your Arabic routine steady."}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {!onboardingComplete ? (
            <Card className="dashboard-card dashboard-span-full">
              <CardContent className="dashboard-onboarding-content">
                <div>
                  <p className="dashboard-section-title">Complete your student setup</p>
                  <p className="dashboard-copy">
                    You are on step {onboardingStep} of {onboardingTotalSteps}. Finish onboarding to unlock personalized recommendations.
                  </p>
                </div>
                <Button asChild className="dashboard-primary-btn">
                  <Link to="/onboarding">Continue onboarding</Link>
                </Button>
              </CardContent>
            </Card>
          ) : null}

          <div className="dashboard-stats dashboard-span-full">
            <StatCard title="Total sessions" value={mySessions.length} icon={CalendarBlank} />
            <StatCard title="Upcoming" value={upcoming.length} icon={Clock} />
            <StatCard title="Completion" value={`${completionRate}%`} icon={BookOpen} trend={`${completed.length} completed`} trendUp />
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
                  <CardTitle className="dashboard-card-title font-display">Profile snapshot</CardTitle>
                  <CardDescription>Your learning details at a glance.</CardDescription>
                </CardHeader>
                <CardContent className="dashboard-profile-grid">
                  <div className="dashboard-profile-avatar">
                    <UserCircle size={44} weight="duotone" className="text-primary" aria-hidden />
                  </div>
                  <div className="dashboard-profile-item">
                    <p className="dashboard-profile-label">Learner</p>
                    <p className="dashboard-profile-value">{auth.userName || "Student"}</p>
                  </div>
                  <div className="dashboard-profile-item">
                    <p className="dashboard-profile-label">Current level</p>
                    <p className="dashboard-profile-value">{onboarding?.profile.level ?? "Not set yet"}</p>
                  </div>
                  <div className="dashboard-profile-item">
                    <p className="dashboard-profile-label">Primary goal</p>
                    <p className="dashboard-profile-value">{onboarding?.profile.goal?.replaceAll("_", " ") ?? "Not set yet"}</p>
                  </div>
                  <div className="dashboard-profile-item">
                    <p className="dashboard-profile-label">Study mode</p>
                    <p className="dashboard-profile-value">{onboarding?.profile.learningMode?.replaceAll("_", " ") ?? "Not set yet"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card dashboard-action-banner">
                <CardContent className="dashboard-action-banner-content">
                  <div>
                    <p className="dashboard-section-title">Primary action</p>
                    <p className="dashboard-copy">
                      {!onboardingComplete
                        ? "Complete onboarding to unlock a stronger class plan and reminders."
                        : nextSession
                          ? `Your next class is ${nextSession.title} on ${nextSession.date} at ${nextSession.time}.`
                          : "No class is currently scheduled. Keep checking your sessions list for updates."}
                    </p>
                  </div>
                  {isExternalNextAction ? (
                    <a
                      href={nextActionHref}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => logEvent("join_clicked", { sessionId: nextSession?.id, surface: "dashboard_banner" })}
                    >
                      <Button className="dashboard-primary-btn">{nextActionLabel}</Button>
                    </a>
                  ) : (
                    <Button asChild className="dashboard-primary-btn">
                      <Link to={nextActionHref}>{nextActionLabel}</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <div className="dashboard-header-row">
                    <CardTitle className="dashboard-card-title font-display">Upcoming sessions</CardTitle>
                    <Link to="/student/sessions">
                      <Button variant="ghost" size="sm" className="dashboard-ghost-btn">
                        See all <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>What’s next, with join links when available.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {upcoming.length === 0 ? (
                    <p className="dashboard-empty-text">No upcoming sessions yet.</p>
                  ) : (
                    upcoming.slice(0, 6).map((s) => (
                      <div
                        key={s.id}
                        className="dashboard-session-row"
                      >
                        <Link to={`/student/sessions/${s.id}`} className="dashboard-session-link">
                          <p className="dashboard-session-title">{s.title}</p>
                          <p className="dashboard-session-meta">
                            {s.teacherName} · {s.date} · {s.time}
                          </p>
                        </Link>
                        <div className="dashboard-row-actions">
                          <StatusBadge status={s.status} />
                          {s.meetingLink ? (
                            <a
                              href={s.meetingLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => logEvent("join_clicked", { sessionId: s.id, surface: "dashboard" })}
                            >
                              <Button size="sm" className="dashboard-primary-btn">
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
              className="dashboard-side-col"
            >
              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title font-display">Notifications</CardTitle>
                  <CardDescription>
                    {unreadNotifications.length} unread out of {notifications.length}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="dashboard-notifications-list">
                  {topNotifications.length === 0 ? (
                    <p className="dashboard-copy">No notifications right now.</p>
                  ) : (
                    topNotifications.map((item) => (
                      <div key={item.id} className="dashboard-notification-row">
                        <div className="dashboard-notification-head">
                          <p className="dashboard-session-title">{item.title}</p>
                          {!item.read ? <span className="dashboard-notification-dot" aria-hidden /> : null}
                        </div>
                        <p className="dashboard-session-meta">{item.message}</p>
                        <div className="dashboard-notification-actions">
                          <span className="dashboard-session-meta">{new Date(item.createdAt).toLocaleDateString()}</span>
                          {!item.read ? (
                            <button
                              type="button"
                              className="dashboard-mark-read"
                              onClick={() => markNotificationRead(item.id, true)}
                            >
                              Mark as read
                            </button>
                          ) : (
                            <span className="dashboard-notification-read">
                              <CheckCircle size={14} weight="fill" aria-hidden />
                              Read
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title font-display">Reminders</CardTitle>
                  <CardDescription>Quick awareness panel for this week.</CardDescription>
                </CardHeader>
                <CardContent className="dashboard-reminder-list">
                  <div className="dashboard-reminder-row">
                    <Bell className="dashboard-empty-icon" weight="duotone" aria-hidden />
                    <p className="dashboard-copy">
                      {nextSession
                        ? `Next class: ${nextSession.title} on ${nextSession.date} at ${nextSession.time}.`
                        : "No upcoming class yet. Your teacher will publish one soon."}
                    </p>
                  </div>
                  <div className="dashboard-reminder-row">
                    <Sparkle className="dashboard-empty-icon" weight="duotone" aria-hidden />
                    <p className="dashboard-copy">{personalizedDailyCue}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dashboard-card">
                <CardHeader className="dashboard-card-header">
                  <CardTitle className="dashboard-card-title font-display">School board</CardTitle>
                  <CardDescription>Program updates and student resources.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="dashboard-board-row">
                    <MegaphoneSimple className="dashboard-empty-icon" weight="duotone" aria-hidden />
                    <p className="dashboard-copy">Weekly attendance digest is available in your sessions page.</p>
                  </div>
                  <Button variant="outline" className="dashboard-outline-btn dashboard-btn-full" asChild>
                    <Link to="/student/sessions">Open sessions</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}
