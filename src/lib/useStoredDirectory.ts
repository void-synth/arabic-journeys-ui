import { useEffect, useState } from "react";
import { DIRECTORY_UPDATED_EVENT, getStudentsStore, getTeachersStore, loadDirectoryStore } from "@/lib/directoryStore";
import type { User } from "@/data/mock";

export function useStoredStudents() {
  const [rows, setRows] = useState<User[]>(() => getStudentsStore());

  useEffect(() => {
    function refresh() {
      void loadDirectoryStore().then((result) => setRows(result.students));
    }
    void loadDirectoryStore().then((result) => setRows(result.students));
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
      void loadDirectoryStore().then((result) => setRows(result.teachers));
    }
    void loadDirectoryStore().then((result) => setRows(result.teachers));
    window.addEventListener(DIRECTORY_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(DIRECTORY_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return rows;
}
