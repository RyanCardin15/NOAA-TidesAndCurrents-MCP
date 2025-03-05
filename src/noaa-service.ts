import axios from 'axios';

// Base URLs for the different NOAA APIs
const DATA_API_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
const METADATA_API_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi';

/**
 * Configuration options for the NOAA service
 */
export interface NoaaConfig {
  applicationName?: string;
}

/**
 * Service for interacting with NOAA Tides and Currents APIs
 */
export class NoaaService {
  private config: NoaaConfig;

  constructor(config: NoaaConfig = {}) {
    this.config = config;
  }

  /**
   * Build parameters for the API request
   * @param params Parameters for the request
   * @returns URL-encoded parameters string
   */
  private buildParams(params: Record<string, any>): string {
    // Add application name if provided in config
    if (this.config.applicationName) {
      params.application = this.config.applicationName;
    }

    // Remove undefined and null values
    const filteredParams = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, any>);

    // Convert to URL parameters
    return new URLSearchParams(filteredParams as Record<string, string>).toString();
  }

  /**
   * Make a request to the Data API
   * @param params Parameters for the request
   * @returns Response data
   */
  async fetchDataApi(params: Record<string, any>): Promise<any> {
    try {
      const queryParams = this.buildParams(params);
      const url = `${DATA_API_BASE_URL}?${queryParams}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`NOAA API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Make a request to the Metadata API
   * @param endpoint Endpoint path
   * @param params Parameters for the request
   * @returns Response data
   */
  async fetchMetadataApi(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const queryParams = this.buildParams(params);
      const url = `${METADATA_API_BASE_URL}${endpoint}${queryParams ? '?' + queryParams : ''}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`NOAA API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Get water level data
   */
  async getWaterLevels(params: Record<string, any>): Promise<any> {
    return this.fetchDataApi({
      ...params,
      product: 'water_level'
    });
  }

  /**
   * Get tide predictions
   */
  async getTidePredictions(params: Record<string, any>): Promise<any> {
    return this.fetchDataApi({
      ...params,
      product: 'predictions'
    });
  }

  /**
   * Get currents data
   */
  async getCurrents(params: Record<string, any>): Promise<any> {
    return this.fetchDataApi({
      ...params,
      product: 'currents'
    });
  }

  /**
   * Get current predictions
   */
  async getCurrentPredictions(params: Record<string, any>): Promise<any> {
    return this.fetchDataApi({
      ...params,
      product: 'currents_predictions'
    });
  }

  /**
   * Get meteorological data (air_temperature, wind, etc.)
   */
  async getMeteorologicalData(params: Record<string, any>): Promise<any> {
    const { product, ...rest } = params;
    return this.fetchDataApi({
      ...rest,
      product
    });
  }

  /**
   * Get list of stations
   */
  async getStations(params: Record<string, any>): Promise<any> {
    const { type, ...rest } = params;
    const endpoint = '/stations.' + (rest.format || 'json');
    const queryParams = type ? { type, ...rest } : rest;
    
    return this.fetchMetadataApi(endpoint, queryParams);
  }

  /**
   * Get station details
   */
  async getStationDetails(params: Record<string, any>): Promise<any> {
    const { station, ...rest } = params;
    const endpoint = `/stations/${station}/details.` + (rest.format || 'json');
    
    return this.fetchMetadataApi(endpoint, rest);
  }
} 