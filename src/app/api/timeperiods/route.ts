// src/app/api/timeperiods/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const timeperiodsPath = path.join(process.cwd(), 'src/data/timeperiods.json');
    const timeperiodsData = await fs.readFile(timeperiodsPath, 'utf-8');
    const timeperiods: string[] = JSON.parse(timeperiodsData);
    return NextResponse.json(timeperiods);
  } catch (error) {
    console.error('Error fetching timeperiods:', error);
    return NextResponse.json([], { status: 500 });
  }
}