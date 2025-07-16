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
 * Start the FastMCP server with configurable transport
 */
export function startServer(server: FastMCP) {
  // Check command line arguments for transport type
  const args = process.argv.slice(2);
  const httpIndex = args.indexOf('--http');
  const portIndex = args.indexOf('--port');
  
  if (httpIndex !== -1) {
    // HTTP transport mode
    const port = portIndex !== -1 && args[portIndex + 1] ? parseInt(args[portIndex + 1]) : 3000;
    console.log(`Starting NOAA MCP server on HTTP port ${port}`);
    server.start({ 
      transportType: 'httpStream',
      httpStream: {
        endpoint: '/sse',
        port: port
      }
    });
  } else {
    // Default stdio transport
    console.log('Starting NOAA MCP server with stdio transport');
    server.start({ 
      transportType: 'stdio'
    });
  }
} 