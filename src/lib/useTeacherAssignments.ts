import { useEffect, useState } from "react";
import { getTeacherStudentMap, TEACHER_ASSIGNMENTS_UPDATED_EVENT } from "@/lib/teacherAssignmentStore";

export function useTeacherAssignments() {
  const [map, setMap] = useState(() => getTeacherStudentMap());

  useEffect(() => {
    function refresh() {
      setMap(getTeacherStudentMap());
    }
    window.addEventListener(TEACHER_ASSIGNMENTS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(TEACHER_ASSIGNMENTS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return map;
}
