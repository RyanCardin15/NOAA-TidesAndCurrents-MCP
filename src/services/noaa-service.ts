import axios from 'axios';

// Base URLs for the different NOAA APIs
const DATA_API_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';
const METADATA_API_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi';

/**
 * Service for interacting with NOAA Tides and Currents APIs
 */
export class NoaaService {

  /**
   * Build parameters for the API request
   * @param params Parameters for the request
   * @returns URL-encoded parameters string
   */
  private buildParams(params: Record<string, any>): string {
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
    const { 
      type, 
      name, 
      lat_min, 
      lat_max, 
      lon_min, 
      lon_max, 
      state, 
      limit, 
      offset, 
      sort_by, 
      sort_order, 
      ...rest 
    } = params;
    
    const endpoint = '/stations.' + (rest.format || 'json');
    
    // Build query parameters with all the filters
    const queryParams: Record<string, any> = { ...rest };
    
    // Add filters only if they are defined
    if (type) queryParams.type = type;
    if (name) queryParams.name = name;
    if (lat_min !== undefined) queryParams.lat_min = lat_min;
    if (lat_max !== undefined) queryParams.lat_max = lat_max;
    if (lon_min !== undefined) queryParams.lon_min = lon_min;
    if (lon_max !== undefined) queryParams.lon_max = lon_max;
    if (state) queryParams.state = state;
    if (limit !== undefined) queryParams.limit = limit;
    if (offset !== undefined) queryParams.offset = offset;
    if (sort_by) queryParams.sort_by = sort_by;
    if (sort_order) queryParams.sort_order = sort_order;
    
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