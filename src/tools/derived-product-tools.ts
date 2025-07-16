import { FastMCP } from 'fastmcp';
import { DpapiService } from '../services/dpapi-service.js';
import { 
  SeaLevelTrendsSchema,
  ExtremeWaterLevelsSchema,
  HighTideFloodingDailySchema,
  HighTideFloodingMonthlySchema,
  HighTideFloodingSeasonalSchema,
  HighTideFloodingAnnualSchema,
  HighTideFloodingProjectionsSchema,
  HighTideFloodingLikelihoodsSchema,
  TopTenWaterLevelsSchema
} from '../schemas/dpapi.js';

/**
 * Register derived product tools with the MCP server
 */
export function registerDerivedProductTools(server: FastMCP, dpapiService: DpapiService) {
  // Sea Level Trends tool
  server.addTool({
    name: 'get_sea_level_trends',
    description: 'Get sea level trends and error margins for a station',
    parameters: SeaLevelTrendsSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getSeaLevelTrends(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get sea level trends: ${error.message}`);
        }
        throw new Error('Failed to get sea level trends');
      }
    }
  });

  // Extreme Water Levels tool
  server.addTool({
    name: 'get_extreme_water_levels',
    description: 'Get extreme water levels and exceedance probabilities for a station',
    parameters: ExtremeWaterLevelsSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getExtremeWaterLevels(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get extreme water levels: ${error.message}`);
        }
        throw new Error('Failed to get extreme water levels');
      }
    }
  });

  // High Tide Flooding Daily tool
  server.addTool({
    name: 'get_high_tide_flooding_daily',
    description: 'Get high tide flooding daily count data for a station',
    parameters: HighTideFloodingDailySchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingDaily(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding daily data: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding daily data');
      }
    }
  });

  // High Tide Flooding Monthly tool
  server.addTool({
    name: 'get_high_tide_flooding_monthly',
    description: 'Get high tide flooding monthly count data for a station',
    parameters: HighTideFloodingMonthlySchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingMonthly(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding monthly data: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding monthly data');
      }
    }
  });

  // High Tide Flooding Seasonal tool
  server.addTool({
    name: 'get_high_tide_flooding_seasonal',
    description: 'Get high tide flooding seasonal count data for a station',
    parameters: HighTideFloodingSeasonalSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingSeasonal(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding seasonal data: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding seasonal data');
      }
    }
  });

  // High Tide Flooding Annual tool
  server.addTool({
    name: 'get_high_tide_flooding_annual',
    description: 'Get high tide flooding annual count data for a station',
    parameters: HighTideFloodingAnnualSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingAnnual(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding annual data: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding annual data');
      }
    }
  });

  // High Tide Flooding Projections tool
  server.addTool({
    name: 'get_high_tide_flooding_projections',
    description: 'Get high tide flooding decadal projections for sea level rise scenarios',
    parameters: HighTideFloodingProjectionsSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingProjections(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding projections: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding projections');
      }
    }
  });

  // High Tide Flooding Likelihoods tool
  server.addTool({
    name: 'get_high_tide_flooding_likelihoods',
    description: 'Get high tide flooding daily likelihoods for a station',
    parameters: HighTideFloodingLikelihoodsSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getHighTideFloodingLikelihoods(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get high tide flooding likelihoods: ${error.message}`);
        }
        throw new Error('Failed to get high tide flooding likelihoods');
      }
    }
  });

  // Top Ten Water Levels tool
  server.addTool({
    name: 'get_top_ten_water_levels',
    description: 'Get top ten highest or lowest water levels for a station',
    parameters: TopTenWaterLevelsSchema,
    execute: async (params) => {
      try {
        const result = await dpapiService.getTopTenWaterLevels(params);
        return JSON.stringify(result);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Failed to get top ten water levels: ${error.message}`);
        }
        throw new Error('Failed to get top ten water levels');
      }
    }
  });
}