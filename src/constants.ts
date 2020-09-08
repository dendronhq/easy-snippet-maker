export const DENDRON_WS_NAME = "dendron.code-workspace";
export const extensionQualifiedId = `dendron.dendron`;

type KeyBinding = {
  key?: string;
  mac?: string;
  windows?: string;
  when?: string;
};

type CommandEntry = {
  key: string;
  title: string;
  keybindings?: KeyBinding;
  group: "notes" | "workspace" | "pods" | "dev" | "hierarchies" | "navigation"| "bundled";
  /**
   * Skip doc generation
   */
  skipDocs?: boolean;
  desc?: string;
  docs?: string;
  docLink?: string;
  docAnchor?: string;
  docPreview?: string;
};

const CMD_PREFIX = "Dendron:";
export const ICONS = {
  STUB: "gist-new",
  SCHEMA: "repo",
};

export const DENDRON_COMMANDS: { [key: string]: CommandEntry } = {
  // --- Notes
  GOTO_GLOBAL_SNIPPET: {
    key: "dendron.gotoGlobalSnippet",
    title: `Dendron: Goto Global Snippet`,
    group: "bundled",
    skipDocs: true,
  },
  CREATE_GLOBAL_SNIPPET: {
    key: "dendron.createGlobalSnippet",
    title: `Dendron: Create Global Snippet`,
    group: "bundled",
    skipDocs: true,
  },
};

export type ConfigKey = keyof typeof CONFIG;

const _noteDateDesc = (type: "journal" | "scratch") =>
  `date format used for ${type} notes`;
const _noteNameDesc = (type: "journal" | "scratch") =>
  `named used for ${type} notes`;
const _noteAddBehaviorDesc = (type: "journal" | "scratch") =>
  `strategy for adding new ${type} notes`;
export const _noteAddBehaviorEnum = [
  "childOfDomain",
  "childOfDomainNamespace",
  "childOfCurrent",
  "asOwnDomain",
];

export const CONFIG = {
  DAILY_JOURNAL_DOMAIN: {
    key: "dendron.dailyJournalDomain",
    type: "string",
    default: "daily",
    description: "domain where daily journals are kept",
  }
};
