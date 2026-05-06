import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const REPO_ROOT = path.resolve(process.cwd(), '..');
const AGENTS_DIR = path.join(REPO_ROOT, '.claude', 'agents');
const PLAYBOOKS_DIR = path.join(REPO_ROOT, '.claude', 'playbooks');
const SKILLS_DIR = path.join(REPO_ROOT, '.claude', 'skills');

export type AgentDoc = {
  slug: string;
  name: string;
  description: string;
  model?: string;
  body: string;
};

export type PlaybookDoc = {
  slug: string;
  title: string;
  body: string;
};

export type SkillDoc = {
  slug: string;
  name: string;
  description: string;
  body: string;
};

function readMarkdown(file: string) {
  const raw = fs.readFileSync(file, 'utf-8');
  return matter(raw);
}

export function getAllAgents(): AgentDoc[] {
  if (!fs.existsSync(AGENTS_DIR)) return [];
  return fs
    .readdirSync(AGENTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = readMarkdown(path.join(AGENTS_DIR, f));
      return {
        slug: f.replace(/\.md$/, ''),
        name: (data.name as string) || f.replace(/\.md$/, ''),
        description: (data.description as string) || '',
        model: data.model as string | undefined,
        body: content.trim(),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getAgent(slug: string): AgentDoc | null {
  return getAllAgents().find((a) => a.slug === slug) ?? null;
}

export function getAllPlaybooks(): PlaybookDoc[] {
  if (!fs.existsSync(PLAYBOOKS_DIR)) return [];
  return fs
    .readdirSync(PLAYBOOKS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(PLAYBOOKS_DIR, f), 'utf-8');
      const titleMatch = raw.match(/^#\s+(.+)$/m);
      return {
        slug: f.replace(/\.md$/, ''),
        title: titleMatch ? titleMatch[1] : f.replace(/\.md$/, ''),
        body: raw.trim(),
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getPlaybook(slug: string): PlaybookDoc | null {
  return getAllPlaybooks().find((p) => p.slug === slug) ?? null;
}

export function getAllSkills(): SkillDoc[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((d) => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory())
    .map((d) => {
      const file = path.join(SKILLS_DIR, d, 'SKILL.md');
      if (!fs.existsSync(file)) return null;
      const { data, content } = readMarkdown(file);
      return {
        slug: d,
        name: (data.name as string) || d,
        description: (data.description as string) || '',
        body: content.trim(),
      };
    })
    .filter((x): x is SkillDoc => x !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}
