export type MessageRole = 'user' | 'assistant';

const STORAGE_KEY = 'ai-assistant-message-roles';

function readRoleMap(): Record<string, MessageRole> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeRoleMap(map: Record<string, MessageRole>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function rememberMessageRoles(entries: Array<{ id: string; role: MessageRole }>) {
  const map = readRoleMap();
  for (const entry of entries) map[entry.id] = entry.role;
  writeRoleMap(map);
}

export function getRememberedRole(id: string): MessageRole | undefined {
  return readRoleMap()[id];
}
