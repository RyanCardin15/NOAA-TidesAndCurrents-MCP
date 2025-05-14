import { FastMCP } from 'fastmcp';
import { MoonPhaseService } from '../services/moon-phase-service.js';
import { 
  MoonPhaseParamsSchema, 
  MoonPhasesRangeParamsSchema, 
  NextMoonPhaseParamsSchema 
} from '../interfaces/moon.js';

/**
 * Register moon-related tools with the MCP server
 */
export function registerMoonTools(server: FastMCP, moonPhaseService: MoonPhaseService) {
  // Add moon phase tool
  server.addTool({
    name: 'get_moon_phase',
    description: 'Get moon phase information for a specific date',
    parameters: MoonPhaseParamsSchema,
    execute: async (params) => {
      try {
        const result = moonPhaseService.getMoonPhase(params);
        if (params.format === 'text') {
          return `Moon phase for ${result.date}: ${result.phaseName} (${(result.illumination * 100).toFixed(1)}% illuminated)`;
        }
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get moon phase: ${error.message}`);
        }
        throw new Error('Failed to get moon phase');
      }
    }
  });

  // Add moon phases range tool
  server.addTool({
    name: 'get_moon_phases_range',
    description: 'Get moon phase information for a date range',
    parameters: MoonPhasesRangeParamsSchema,
    execute: async (params) => {
      try {
        const results = moonPhaseService.getMoonPhasesRange(params);
        if (params.format === 'text') {
          return results.map(result => 
            `${result.date}: ${result.phaseName} (${(result.illumination * 100).toFixed(1)}% illuminated)`
          ).join('\n');
        }
        return JSON.stringify(results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get moon phases: ${error.message}`);
        }
        throw new Error('Failed to get moon phases');
      }
    }
  });

  // Add next moon phase tool
  server.addTool({
    name: 'get_next_moon_phase',
    description: 'Get the next occurrence(s) of a specific moon phase',
    parameters: NextMoonPhaseParamsSchema,
    execute: async (params) => {
      try {
        const results = moonPhaseService.getNextMoonPhase(params);
        if (params.format === 'text') {
          return results.map(result => 
            `Next ${result.phase}: ${result.date}`
          ).join('\n');
        }
        return JSON.stringify(results);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get next moon phase: ${error.message}`);
        }
        throw new Error('Failed to get next moon phase');
      }
    }
  });
} 