import { type NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest, slug: string[]): Promise<Response> {
  const API_V2_URL = process.env.API_V2_URL;
  if (!API_V2_URL) {
    return NextResponse.json({ error: "API_V2_URL not configured" }, { status: 503 });
  }

  const path = slug.join("/");
  const searchParams = request.nextUrl.search;
  const targetUrl = `${API_V2_URL}/v2/${path}${searchParams}`;

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (!["host", "connection", "transfer-encoding"].includes(key.toLowerCase())) {
      headers.set(key, value);
    }
  });

  const body =
    request.method !== "GET" && request.method !== "HEAD" ? await request.arrayBuffer() : undefined;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
    // @ts-expect-error Node.js fetch specific option
    duplex: "half",
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (!["transfer-encoding", "connection"].includes(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxy(request, (await params).slug);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxy(request, (await params).slug);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxy(request, (await params).slug);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string[] }> }) {
  return proxy(request, (await params).slug);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return proxy(request, (await params).slug);
}
