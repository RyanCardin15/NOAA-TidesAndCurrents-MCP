#!/usr/bin/env node
import { FastMCP } from 'fastmcp';
import { createServer, startServer } from './server/config.js';
import { registerAllTools } from './tools/index.js';

// Create and configure the MCP server
const server = createServer();

// Register all tools
const services = registerAllTools(server);

// Start the server
startServer(server); 