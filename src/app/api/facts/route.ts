// src/app/api/facts/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Fact } from '../../../data/factsData';

interface ApiResponse {
  facts: Fact[];
  total: number;
  hasMore: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '6';
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || '';
  const timeperiod = searchParams.get('timeperiod') || '';
  const sort = searchParams.get('sort') || 'newest';

  try {
    const factsPath = path.join(process.cwd(), 'src/data/facts/facts_1.json');
    const factsData = await fs.readFile(factsPath, 'utf-8');
    let facts: Fact[] = JSON.parse(factsData);

    // Apply filters
    if (search) {
      const searchLower = search.toLowerCase();
      facts = facts.filter(
        (fact) =>
          fact.question.toLowerCase().includes(searchLower) ||
          fact.answer.toLowerCase().includes(searchLower)
      );
    }

    if (category && category !== 'all') {
      facts = facts.filter((fact) => fact.category === category);
    }

    if (country && country !== 'all') {
      facts = facts.filter((fact) =>
        fact.country.split('/').map((c) => c.trim()).includes(country)
      );
    }

    if (timeperiod && timeperiod !== 'all') {
      facts = facts.filter((fact) => fact.timeperiod === timeperiod);
    }

    // Apply sorting
    if (sort === 'newest') {
      facts.sort((a, b) => b.year - a.year);
    } else if (sort === 'oldest') {
      facts.sort((a, b) => a.year - b.year);
    } else if (sort === 'az') {
      facts.sort((a, b) => a.question.localeCompare(b.question));
    } else if (sort === 'za') {
      facts.sort((a, b) => b.question.localeCompare(a.question));
    }

    // Paginate
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedFacts = facts.slice(startIndex, endIndex);

    return NextResponse.json({
      facts: paginatedFacts,
      total: facts.length,
      hasMore: endIndex < facts.length,
    });
  } catch (error) {
    console.error('Error fetching facts:', error);
    return NextResponse.json({ facts: [], total: 0, hasMore: false }, { status: 500 });
  }
}