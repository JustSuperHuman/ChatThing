import { type Session } from "next-auth";

interface LocalMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface LocalChatThread {
  id: string;
  title: string;
  createdAt: Date;
  messages: LocalMessage[];
}

// Intermediate types for parsing from JSON
type LocalMessageWithStringDate = Omit<LocalMessage, "createdAt"> & {
  createdAt: string;
};
type LocalChatThreadWithStringDate = Omit<
  LocalChatThread,
  "createdAt" | "messages"
> & {
  createdAt: string;
  messages: LocalMessageWithStringDate[];
};

const LOCAL_STORAGE_KEY = "chatHistory";

function isValidLocalMessage(
  message: unknown,
): message is LocalMessageWithStringDate {
  if (typeof message !== "object" || message === null) return false;
  const localMessage = message as Record<string, unknown>; // Use Record
  return (
    typeof localMessage.id === "string" &&
    (localMessage.role === "user" || localMessage.role === "assistant") &&
    typeof localMessage.content === "string" &&
    typeof localMessage.createdAt === "string" &&
    !isNaN(new Date(localMessage.createdAt).getTime())
  );
}

function isValidLocalChatThread(
  thread: unknown,
): thread is LocalChatThreadWithStringDate {
  if (typeof thread !== "object" || thread === null) return false;
  const localThread = thread as Record<string, unknown>; // Use Record
  return (
    typeof localThread.id === "string" &&
    typeof localThread.title === "string" &&
    typeof localThread.createdAt === "string" &&
    !isNaN(new Date(localThread.createdAt).getTime()) &&
    Array.isArray(localThread.messages) &&
    localThread.messages.every(isValidLocalMessage)
  );
}

function getLocalChatHistory(): LocalChatThread[] {
  if (typeof window === "undefined") {
    return [];
  }
  const history = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (history) {
    try {
      // Parse history without reviving dates.
      const parsedHistory: unknown = JSON.parse(history);

      if (
        Array.isArray(parsedHistory) &&
        parsedHistory.every(isValidLocalChatThread)
      ) {
        // The data is validated, now we can safely cast and convert dates.
        return parsedHistory.map((thread) => ({
          ...thread,
          createdAt: new Date(thread.createdAt),
          messages: thread.messages.map((message) => ({
            ...message,
            createdAt: new Date(message.createdAt),
          })),
        }));
      } else {
        console.error(
          "Parsed local chat history does not match expected structure.",
        );
        return [];
      }
    } catch (error) {
      console.error("Failed to parse local chat history:", error);
      return [];
    }
  }
  return [];
}

function saveLocalChatHistory(history: LocalChatThread[]): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save local chat history:", error);
  }
}

export function createLocalChatThread(
  title: string,
  initialMessage: { role: "user" | "assistant"; content: string },
): LocalChatThread {
  const newThread: LocalChatThread = {
    id: crypto.randomUUID(),
    title: title,
    createdAt: new Date(),
    messages: [
      {
        id: crypto.randomUUID(),
        role: initialMessage.role,
        content: initialMessage.content,
        createdAt: new Date(),
      },
    ],
  };
  const history = getLocalChatHistory();
  saveLocalChatHistory([newThread, ...history]);
  return newThread;
}

export function addLocalMessageToThread(
  threadId: string,
  message: { role: "user" | "assistant"; content: string },
): LocalChatThread | undefined {
  const history = getLocalChatHistory();
  const threadIndex = history.findIndex((thread) => thread.id === threadId);

  if (threadIndex > -1) {
    const existingThread = history[threadIndex];
    if (existingThread) {
      // Add check for undefined
      const updatedThread: LocalChatThread = {
        id: existingThread.id,
        title: existingThread.title,
        createdAt: existingThread.createdAt,
        messages: [
          ...existingThread.messages,
          {
            id: crypto.randomUUID(),
            role: message.role,
            content: message.content,
            createdAt: new Date(),
          },
        ],
      };
      history[threadIndex] = updatedThread;
      saveLocalChatHistory(history);
      return updatedThread;
    }
  }
  return undefined;
}

export function getLocalChatThreads(): LocalChatThread[] {
  return getLocalChatHistory();
}

export function getLocalChatThread(
  threadId: string,
): LocalChatThread | undefined {
  const history = getLocalChatHistory();
  return history.find((thread) => thread.id === threadId);
}

export function deleteLocalChatThread(threadId: string): void {
  const history = getLocalChatHistory();
  const updatedHistory = history.filter((thread) => thread.id !== threadId);
  saveLocalChatHistory(updatedHistory);
}
