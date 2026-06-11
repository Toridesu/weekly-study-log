import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEY } from "../constants";
import type { NewStudyLog, StudyLog } from "../types";
import { parseStoredLogs } from "../utils";

const loadLogs = (): StudyLog[] => {
  if (typeof window === "undefined") return [];

  try {
    return parseStoredLogs(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return [];
  }
};

export const useStudyLogs = () => {
  const [logs, setLogs] = useState<StudyLog[]>(loadLogs);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    } catch {
      // The app remains usable when storage is unavailable.
    }
  }, [logs]);

  const addLog = useCallback((log: NewStudyLog) => {
    setLogs((currentLogs) => [
      ...currentLogs,
      { ...log, id: crypto.randomUUID() },
    ]);
  }, []);

  const deleteLog = useCallback((id: string) => {
    setLogs((currentLogs) => currentLogs.filter((log) => log.id !== id));
  }, []);

  return { logs, addLog, deleteLog };
};
