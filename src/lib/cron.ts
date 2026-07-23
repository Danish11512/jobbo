// Foundation for cron-based job scraping. Not yet consumed.
// Bun.cron provides in-process scheduling — no external cron daemon needed.

import type { Database } from 'bun:sqlite';

type Scraper = (db: Database) => Promise<void>;

const scrapers: Record<string, Scraper> = {};

export function registerScraper(name: string, fn: Scraper): void {
  scrapers[name] = fn;
}

export function startCron(schedule: string, scraperName: string): void {
  const fn = scrapers[scraperName];
  if (!fn) {
    throw new Error(`No scraper registered with name "${scraperName}"`);
  }
  Bun.cron(schedule, async function () {
    const { db } = await import('./db');
    await fn(db);
  });
}
