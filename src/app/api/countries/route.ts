// src/app/api/countries/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const countriesPath = path.join(process.cwd(), 'src/data/countries.json');
    const countriesData = await fs.readFile(countriesPath, 'utf-8');
    const countries: string[] = JSON.parse(countriesData);
    return NextResponse.json(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json([], { status: 500 });
  }
}