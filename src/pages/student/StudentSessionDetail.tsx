import { StudentLayout } from "@/layouts/StudentLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Link as LinkIcon } from "lucide-react";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useAuth } from "@/lib/auth";
import { logEvent } from "@/lib/analytics";

export default function StudentSessionDetail() {
  const auth = useAuth();
  const studentId = auth.userId;
  const { id } = useParams();
  const sessions = useStoredSessions();
  const session = sessions.find((s) => s.id === id);
  const isAssigned = session ? (studentId ? session.students.includes(studentId) : false) : false;

  useEffect(() => {
    if (!session?.id || !isAssigned) return;
    logEvent("session_detail_opened", { sessionId: session.id, surface: "student_detail" });
  }, [session?.id, isAssigned]);

  if (!session) {
    return (
      <StudentLayout title="Session Not Found">
        <div className="page-container text-center py-20">
          <p className="text-muted-foreground">Session not found.</p>
          <Link to="/student/sessions"><Button variant="outline" className="mt-4">Back</Button></Link>
        </div>
      </StudentLayout>
    );
  }

  if (!isAssigned) {
    return (
      <StudentLayout title="Access Restricted">
        <div className="page-container text-center py-20">
          <p className="text-muted-foreground">You can only view sessions assigned to your profile.</p>
          <Link to="/student/sessions">
            <Button variant="outline" className="mt-4">
              Back to my sessions
            </Button>
          </Link>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout title="Session Detail">
      <div className="page-container max-w-2xl">
        <PageHeader title={session.title} actions={<Link to="/student/sessions"><Button variant="ghost">Back</Button></Link>} />
        <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-8 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />{session.date}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4" />{session.time} · {session.duration}min</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" />by {session.teacherName}</div>
            <StatusBadge status={session.status} />
          </div>
          <p className="text-sm text-muted-foreground">{session.description}</p>
          {session.meetingLink && session.status === "upcoming" && (
            <a
              href={session.meetingLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => logEvent("join_clicked", { sessionId: session.id, surface: "student_detail" })}
            >
              <Button className="mt-2"><LinkIcon className="h-4 w-4 mr-2" />Join Session</Button>
            </a>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
