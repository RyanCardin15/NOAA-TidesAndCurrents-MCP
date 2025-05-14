import { FastMCP } from 'fastmcp';

/**
 * Create and configure the FastMCP server
 */
export function createServer() {
  // Create the MCP server with fixed configuration
  const server = new FastMCP({
    name: 'LocalTides',
    version: '1.0.0'
  });

  return server;
}

/**
 * Start the FastMCP server with fixed stdio transport
 */
export function startServer(server: FastMCP) {
  // Start the server using stdio transport
  server.start({ 
    transportType: 'stdio'
  });
} 