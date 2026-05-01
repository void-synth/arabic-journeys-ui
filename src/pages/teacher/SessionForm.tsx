import { TeacherLayout } from "@/layouts/TeacherLayout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { removeStoredKey, writeStoredJSON } from "@/lib/localStorageJson";
import { createSession, loadSessions, updateSession } from "@/lib/sessionStore";
import { useStoredSessions } from "@/lib/useStoredSessions";
import { useStoredStudents } from "@/lib/useStoredDirectory";
import { useTeacherAssignments } from "@/lib/useTeacherAssignments";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/auth";
import { logEvent } from "@/lib/analytics";

type SessionDraft = {
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  description: string;
  studentIds: string[];
  meetingLink: string;
};

const emptyDraft = (): SessionDraft => ({
  title: "",
  subject: "",
  date: "",
  time: "",
  duration: "60",
  description: "",
  studentIds: [],
  meetingLink: "",
});

function loadSessionDraftPatch(key: string): Partial<SessionDraft> {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const p = JSON.parse(raw) as Partial<SessionDraft>;
    return p && typeof p === "object" ? p : {};
  } catch {
    return {};
  }
}

export default function SessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const sessions = useStoredSessions();
  const students = useStoredStudents();
  const assignments = useTeacherAssignments();
  const session = id ? sessions.find((s) => s.id === id) : null;
  const auth = useAuth();
  const teacherId = auth.userId;
  const teacherName = auth.userName || "Teacher";
  const isEdit = !!session;
  const draftKey = `neoarabi_session_draft_${id ?? "new"}`;

  const initial = useMemo(() => {
    const patch = loadSessionDraftPatch(draftKey);
    if (session) {
      const base: SessionDraft = {
        title: session.title,
        subject: session.subject,
        date: session.date,
        time: session.time,
        duration: String(session.duration),
        description: session.description,
        studentIds: [...session.students],
        meetingLink: session.meetingLink ?? "",
      };
      return {
        ...base,
        ...patch,
        studentIds: patch.studentIds?.length ? patch.studentIds : base.studentIds,
      };
    }
    return { ...emptyDraft(), ...patch };
  }, [session, draftKey]);

  const [title, setTitle] = useState(initial.title);
  const [subject, setSubject] = useState(initial.subject);
  const [date, setDate] = useState(initial.date);
  const [time, setTime] = useState(initial.time);
  const [duration, setDuration] = useState(initial.duration);
  const [description, setDescription] = useState(initial.description);
  const [studentIds, setStudentIds] = useState<string[]>(initial.studentIds);
  const [meetingLink, setMeetingLink] = useState(initial.meetingLink);

  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkHelperText, setLinkHelperText] = useState("");
  const assignableStudents = useMemo(() => {
    const fromAssignments = new Set(teacherId ? assignments[teacherId] ?? [] : []);
    const fromSessions = new Set(
      sessions
        .filter((row) => teacherId && row.teacherId === teacherId)
        .flatMap((row) => row.students)
    );
    const allowed = new Set([...fromAssignments, ...fromSessions]);
    // Fallback: if admin hasn't assigned yet, keep teacher usable by showing all learners.
    if (allowed.size === 0) return students;
    return students.filter((row) => allowed.has(row.id));
  }, [assignments, sessions, students, teacherId]);

  function toggleStudent(sid: string) {
    setStudentIds((prev) => (prev.includes(sid) ? prev.filter((x) => x !== sid) : [...prev, sid]));
  }

  async function handleGenerateMeetLink() {
    if (supabase) {
      setLinkHelperText("Google Meet links are provisioned after you save the session.");
      return;
    }
    setIsGeneratingLink(true);
    setLinkHelperText("");
    await new Promise((resolve) => setTimeout(resolve, 900));
    const token = Math.random().toString(36).slice(2, 5);
    const token2 = Math.random().toString(36).slice(2, 5);
    const token3 = Math.random().toString(36).slice(2, 5);
    const generatedLink = `https://meet.google.com/${token}-${token2}-${token3}`;
    setMeetingLink(generatedLink);
    setLinkHelperText("Mock Meet link generated. You can replace it with a real one later.");
    setIsGeneratingLink(false);
  }

  async function handleCopyLink() {
    if (!meetingLink) return;
    try {
      await navigator.clipboard.writeText(meetingLink);
      setLinkHelperText("Link copied to clipboard.");
    } catch {
      setLinkHelperText("Copy failed. Please copy manually.");
    }
  }

  function persistDraft() {
    writeStoredJSON(draftKey, {
      title,
      subject,
      date,
      time,
      duration,
      description,
      studentIds,
      meetingLink,
    } satisfies SessionDraft);
  }

  function handlePrimary() {
    void (async () => {
    if (!title.trim()) {
      toast.error("Add a session title.");
      return;
    }
    if (!date || !time) {
      toast.error("Select date and time.");
      return;
    }
    const parsedDuration = Number(duration);
    if (!Number.isFinite(parsedDuration) || parsedDuration < 15) {
      toast.error("Duration must be at least 15 minutes.");
      return;
    }
    if (studentIds.length === 0) {
      toast.error("Select at least one learner.");
      return;
    }
    if (!teacherId) {
      toast.error("No active teacher session. Please sign in again.");
      return;
    }
    persistDraft();
    const payload = {
      title: title.trim(),
      subject: subject.trim() || "General",
      date,
      time,
      duration: parsedDuration,
      description: description.trim() || "Session details pending.",
      meetingLink: meetingLink.trim(),
      students: studentIds,
      teacherId,
      teacherName,
      status: session?.status ?? ("upcoming" as const),
    };
    let savedSession = null;
    if (isEdit && id) {
      savedSession = await updateSession(id, payload);
      toast.success("Session updated.");
    } else {
      savedSession = await createSession(payload);
      toast.success("Session created.");
      logEvent("teacher_session_created", { sessionId: savedSession.id });
    }
    if (supabase && auth.userId && savedSession) {
      const startAt = new Date(`${savedSession.date}T${savedSession.time}:00Z`).toISOString();
      let calendarEventId: string | undefined;
      if (isEdit && id) {
        const existingEvent = await supabase.from("sessions").select("calendar_event_id").eq("id", id).maybeSingle();
        calendarEventId = (existingEvent.data?.calendar_event_id as string | null) ?? undefined;
      }
      const shouldProvisionMeet = !meetingLink.trim() || Boolean(calendarEventId);
      if (shouldProvisionMeet) {
      const provision = await supabase.functions.invoke("google-calendar-provision", {
        body: {
          action: "upsert",
          sessionId: savedSession.id,
          teacherId: auth.userId,
          title: savedSession.title,
          description: savedSession.description,
          startAt,
          durationMinutes: savedSession.duration,
          calendarEventId,
        },
      });
      if (provision.error) {
        toast.error(`Meet provisioning failed: ${provision.error.message}`);
      } else {
        toast.success("Google Meet synced for this session.");
      }
      }
      await loadSessions();
    }
    removeStoredKey(draftKey);
    navigate("/teacher/sessions");
    })();
  }

  function handleCancel() {
    navigate("/teacher/sessions");
  }

  function handleSaveDraft() {
    persistDraft();
    toast.message("Draft saved in this browser only.");
  }

  return (
    <TeacherLayout title={isEdit ? "Edit Session" : "Create Session"}>
      <div className="page-container max-w-2xl">
        <PageHeader title={isEdit ? "Edit Session" : "Create New Session"} description={isEdit ? "Update session details" : "Fill in the details for your new session"} />
        <div className="surface-panel p-6 sm:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-title">Title</Label>
              <Input id="session-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Session title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-subject">Subject</Label>
              <Input id="session-subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Arabic 101" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session-date">Date</Label>
              <Input id="session-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-time">Time</Label>
              <Input id="session-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-duration">Duration (min)</Label>
              <Input
                id="session-duration"
                type="number"
                min={15}
                step={5}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-meet">Meeting Link</Label>
            <div className="flex gap-2">
              <Input
                id="session-meet"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
              />
              <Button type="button" variant="outline" onClick={handleCopyLink} disabled={!meetingLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Button type="button" variant="secondary" onClick={handleGenerateMeetLink} disabled={isGeneratingLink}>
                {isGeneratingLink ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Meet link
                  </>
                )}
              </Button>
              <span className="text-xs text-muted-foreground">
                Google-linked sessions generate and sync Meet links after save.
              </span>
            </div>
            {linkHelperText ? <p className="text-xs text-emerald-700">{linkHelperText}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="session-desc">Description</Label>
            <Textarea id="session-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Session description..." rows={3} />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium leading-none">Students</span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {assignableStudents.map((s) => (
                <label key={s.id} className="flex items-center gap-2 p-2 rounded-lg border border-border hover:bg-muted/50 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={studentIds.includes(s.id)}
                    onChange={() => toggleStudent(s.id)}
                    className="rounded border-border text-primary"
                  />
                  {s.name}
                </label>
              ))}
            </div>
            {assignableStudents.length === 0 ? (
              <p className="text-xs text-muted-foreground">No learners assigned to you yet. Ask admin to assign learners first.</p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="button" onClick={handlePrimary}>
              {isEdit ? "Update Session" : "Create Session"}
            </Button>
            <Button type="button" variant="secondary" onClick={handleSaveDraft}>
              Save draft
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}
