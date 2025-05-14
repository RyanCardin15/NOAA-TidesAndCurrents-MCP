import { FastMCP } from 'fastmcp';
import { ParameterSchema } from '../interfaces/parameters.js';
import { NoaaParametersService } from '../services/noaa-parameters-service.js';

/**
 * Register parameter tools with the MCP server
 */
export function registerParameterTools(server: FastMCP, parametersService: NoaaParametersService) {
  /**
   * Add parameter definitions tool
   */
  server.addTool({
    name: 'get_parameter_definitions',
    description: 'Get information about valid parameter values for NOAA API requests',
    parameters: ParameterSchema,
    execute: async (params) => {
      try {
        const { parameter } = params;

        // If no parameter specified, return all parameter types and their descriptions
        if (!parameter) {
          return JSON.stringify({
            time_zones: parametersService.getTimeZones(),
            datums: parametersService.getDatums(),
            units: parametersService.getUnits(),
            tide_intervals: parametersService.getTidePredictionIntervals(),
            current_intervals: parametersService.getCurrentPredictionIntervals(),
            velocity_types: parametersService.getVelocityTypes(),
            products: parametersService.getMeteorologicalProducts(),
            station_types: parametersService.getStationTypes(),
            date_formats: parametersService.getDateFormats(),
            output_formats: parametersService.getOutputFormats()
          });
        }

        // Return specific parameter information based on the parameter type
        let result;
        switch (parameter) {
          case 'time_zones':
            result = parametersService.getTimeZones();
            break;
          case 'datums':
            result = parametersService.getDatums();
            break;
          case 'units':
            result = parametersService.getUnits();
            break;
          case 'tide_intervals':
            result = parametersService.getTidePredictionIntervals();
            break;
          case 'current_intervals':
            result = parametersService.getCurrentPredictionIntervals();
            break;
          case 'velocity_types':
            result = parametersService.getVelocityTypes();
            break;
          case 'products':
            result = parametersService.getMeteorologicalProducts();
            break;
          case 'station_types':
            result = parametersService.getStationTypes();
            break;
          case 'date_formats':
            result = parametersService.getDateFormats();
            break;
          case 'output_formats':
            result = parametersService.getOutputFormats();
            break;
          default:
            throw new Error(`Unknown parameter type: ${parameter}`);
        }

        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get parameter definitions: ${error.message}`);
        }
        throw new Error('Failed to get parameter definitions');
      }
    }
  });
} 