// app/[lang]/config/adrs-lists.ts
import { CommandLineInterfaceLessonsList } from "../adrs/command-line-interface/command-line-interface-lessons-list";
import { BackendLessonsList } from "../adrs/back-end/back-end-lessons-list";
import { FrontendLessonsList } from "../adrs/front-end/frontend-lessons-list";
import { ReleasingLessonsList } from "../adrs/releasing/releasing-lessons-list";
import { TextEditorsIDELessonsList } from "../adrs/text-editors-ide/text-editors-ide-lessons-list";
import { ToolsLessonsList } from "../adrs/tools/tools-lessons-list";

export const adrsListMap: Record<string, any> = {
  "back-end": BackendLessonsList,
  "command-line-interface": CommandLineInterfaceLessonsList,
  "front-end": FrontendLessonsList,
  releasing: ReleasingLessonsList,
  "text-editors-ide": TextEditorsIDELessonsList,
  tools: ToolsLessonsList,
} as const;

export type AdrSlug = keyof typeof adrsListMap;

export interface Category {
  id: string;
  name: string;
  mainPageSlug?: AdrSlug;
  adrs: { slug: AdrSlug; label: string }[];
}

type Dictionary = Record<string, string>;

// ──────────────────────────────────────────────────────────────
// Raw categories using translation keys
// ──────────────────────────────────────────────────────────────
const rawCategories: Category[] = [
  {
    id: "software-engineering",
    name: "subject.software-engineering",
    mainPageSlug: "front-end",
    adrs: [
      { slug: "tools", label: "tools" },
      { slug: "text-editors-ide", label: "text-editors-ide" },
      { slug: "command-line-interface", label: "command-line-interface" },
      { slug: "front-end", label: "front-end" },
      { slug: "back-end", label: "back-end" },
      { slug: "releasing", label: "releasing" },
    ],
  },
  {
    id: "physics",
    name: "subject.physics",
    mainPageSlug: "",
    adrs: [],
  },
  {
    id: "chemistry",
    name: "subject.chemistry",
    mainPageSlug: "",
    adrs: [],
  },
  {
    id: "biology",
    name: "subject.biology",
    mainPageSlug: "",
    adrs: [],
  },
  {
    id: "computer-science",
    name: "subject.computer-science",
    mainPageSlug: "",
    adrs: [],
  },
  {
    id: "engineering",
    name: "subject.engineering",
    mainPageSlug: "",
    adrs: [],
  },
  {
    id: "mathematics",
    name: "subject.mathematics",
    mainPageSlug: "",
    adrs: [],
  },
];

export const getLocalizedCategories = (dict: Dictionary): Category[] => {
  return rawCategories.map((cat) => ({
    ...cat,
    name: dict[cat.name] ?? cat.name,
    adrs: cat.adrs.map((item) => ({
      ...item,
      label: dict[item.label] ?? item.label,
    })),
  }));
};

export function getCategoryBySlug(slug: AdrSlug | ""): Category | undefined {
  return rawCategories.find((cat) =>
    cat.adrs.some((item) => item.slug === slug),
  );
}

export const getAdrSelectOptions = (dict?: Dictionary) =>
  dict ? getLocalizedCategories(dict) : rawCategories;
