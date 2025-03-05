import { NoaaService } from './noaa-service.js';
import { ZodSchema } from 'zod';
import {
  GetWaterLevelsSchema,
  GetTidePredictionsSchema,
  GetCurrentsSchema,
  GetCurrentPredictionsSchema,
  GetMeteorologicalDataSchema,
  GetStationsSchema,
  GetStationDetailsSchema
} from './types.js';

// MCP Tool type
interface MCPTool<TParams = any, TResult = any> {
  name: string;
  description: string;
  inputSchema: ZodSchema<TParams>;
  handler: (params: TParams) => Promise<TResult>;
}

// Class for the MCP server
export class McpServer {
  private tools: MCPTool[];
  private noaaService: NoaaService;

  constructor(noaaService: NoaaService) {
    this.noaaService = noaaService;
    this.tools = this.initializeTools();
  }

  // Initialize the tools
  private initializeTools(): MCPTool[] {
    // Water Levels tool
    const getWaterLevels: MCPTool = {
      name: "get_water_levels",
      description: "Get water level data for a station",
      inputSchema: GetWaterLevelsSchema,
      handler: async (params) => {
        return this.noaaService.getWaterLevels(params);
      }
    };

    // Tide Predictions tool
    const getTidePredictions: MCPTool = {
      name: "get_tide_predictions",
      description: "Get tide prediction data",
      inputSchema: GetTidePredictionsSchema,
      handler: async (params) => {
        return this.noaaService.getTidePredictions(params);
      }
    };

    // Currents tool
    const getCurrents: MCPTool = {
      name: "get_currents",
      description: "Get currents data for a station",
      inputSchema: GetCurrentsSchema,
      handler: async (params) => {
        return this.noaaService.getCurrents(params);
      }
    };

    // Current Predictions tool
    const getCurrentPredictions: MCPTool = {
      name: "get_current_predictions",
      description: "Get current predictions",
      inputSchema: GetCurrentPredictionsSchema,
      handler: async (params) => {
        return this.noaaService.getCurrentPredictions(params);
      }
    };

    // Meteorological Data tool
    const getMeteorologicalData: MCPTool = {
      name: "get_meteorological_data",
      description: "Get meteorological data",
      inputSchema: GetMeteorologicalDataSchema,
      handler: async (params) => {
        return this.noaaService.getMeteorologicalData(params);
      }
    };

    // Stations tool
    const getStations: MCPTool = {
      name: "get_stations",
      description: "Get list of stations",
      inputSchema: GetStationsSchema,
      handler: async (params) => {
        return this.noaaService.getStations(params);
      }
    };

    // Station Details tool
    const getStationDetails: MCPTool = {
      name: "get_station_details",
      description: "Get detailed information about a station",
      inputSchema: GetStationDetailsSchema,
      handler: async (params) => {
        return this.noaaService.getStationDetails(params);
      }
    };

    return [
      getWaterLevels,
      getTidePredictions,
      getCurrents,
      getCurrentPredictions,
      getMeteorologicalData,
      getStations,
      getStationDetails
    ];
  }

  // Method to get all tools
  getTools(): { name: string, description: string }[] {
    return this.tools.map(tool => ({
      name: tool.name,
      description: tool.description
    }));
  }

  // Method to handle tool execution
  async executeTool(toolName: string, params: any): Promise<any> {
    const tool = this.tools.find(t => t.name === toolName);
    if (!tool) {
      throw new Error(`Tool '${toolName}' not found`);
    }

    // Validate the parameters against the schema
    const validatedParams = tool.inputSchema.parse(params);
    
    // Execute the tool handler
    return tool.handler(validatedParams);
  }
} 