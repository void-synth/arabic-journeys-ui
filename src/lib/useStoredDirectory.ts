import { useEffect, useState } from "react";
import { DIRECTORY_UPDATED_EVENT, getStudentsStore, getTeachersStore } from "@/lib/directoryStore";
import type { User } from "@/data/mock";

export function useStoredStudents() {
  const [rows, setRows] = useState<User[]>(() => getStudentsStore());

  useEffect(() => {
    function refresh() {
      setRows(getStudentsStore());
    }
    window.addEventListener(DIRECTORY_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DIRECTORY_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return rows;
}

export function useStoredTeachers() {
  const [rows, setRows] = useState<User[]>(() => getTeachersStore());

  useEffect(() => {
    function refresh() {
      setRows(getTeachersStore());
    }
    window.addEventListener(DIRECTORY_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DIRECTORY_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return rows;
}
