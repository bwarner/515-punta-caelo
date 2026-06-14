import { NextRequest, NextResponse } from "next/server";

import { databaseRequest } from "../../../../tina/__generated__/client";

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json();

    const result = await databaseRequest({ query, variables });

    return NextResponse.json(result);
  } catch (error) {
    console.error("TinaCMS API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "TinaCMS GraphQL endpoint - use POST with query and variables",
  });
}
