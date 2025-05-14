import { FastMCP } from 'fastmcp';
import { NoaaService } from '../services/noaa-service.js';
import { MoonPhaseService } from '../services/moon-phase-service.js';
import { SunService } from '../services/sun-service.js';
import { registerWaterTools } from './water-tools.js';
import { registerStationTools } from './station-tools.js';
import { registerMoonTools } from './moon-tools.js';
import { registerSunTools } from './sun-tools.js';

/**
 * Register all tools with the MCP server
 */
export function registerAllTools(server: FastMCP) {
  // Create service instances
  const noaaService = new NoaaService();
  const moonPhaseService = new MoonPhaseService();
  const sunService = new SunService();
  
  // Register tools by category
  registerWaterTools(server, noaaService);
  registerStationTools(server, noaaService);
  registerMoonTools(server, moonPhaseService);
  registerSunTools(server, sunService);
  
  return {
    noaaService,
    moonPhaseService,
    sunService
  };
} 