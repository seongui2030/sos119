import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    enabled: Boolean(process.env.REMOTE_MCP_URL),
    serverLabel: process.env.MCP_SERVER_LABEL || "sos119-tools",
    message: process.env.REMOTE_MCP_URL
      ? "Remote MCP server is configured."
      : "MCP is optional. Set REMOTE_MCP_URL to enable it."
  });
}