// src/app/api/categories/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const categoriesPath = path.join(process.cwd(), 'src/data/categories.json');
    const categoriesData = await fs.readFile(categoriesPath, 'utf-8');
    const categories: string[] = JSON.parse(categoriesData);
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json([], { status: 500 });
  }
}