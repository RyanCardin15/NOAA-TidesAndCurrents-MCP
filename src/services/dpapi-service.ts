import axios from 'axios';

// Base URL for the NOAA Derived Product API
const DPAPI_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/dpapi/prod';

/**
 * Service for interacting with NOAA Derived Product API (DPAPI)
 */
export class DpapiService {

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
   * Make a request to the DPAPI
   * @param endpoint Endpoint path
   * @param params Parameters for the request
   * @returns Response data
   */
  async fetchDpapi(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const queryParams = this.buildParams(params);
      const url = `${DPAPI_BASE_URL}${endpoint}${queryParams ? '?' + queryParams : ''}`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`NOAA DPAPI Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      }
      throw error;
    }
  }

  /**
   * Get sea level trends for a station
   * @param params Parameters including station ID and affiliation
   * @returns Sea level trend data
   */
  async getSeaLevelTrends(params: Record<string, any>): Promise<any> {
    const { station, affil = 'Global', format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/sltrends', {
      station,
      affil,
      format,
      ...rest
    });
  }

  /**
   * Get extreme water levels for a station
   * @param params Parameters including station ID and units
   * @returns Extreme water level data
   */
  async getExtremeWaterLevels(params: Record<string, any>): Promise<any> {
    const { station, units = 'english', format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/ewl', {
      station,
      units,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding daily count data
   * @param params Parameters including station ID, date range, and thresholds
   * @returns Daily flood count data
   */
  async getHighTideFloodingDaily(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/daily', {
      station,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding monthly count data
   * @param params Parameters including station ID, date range, and thresholds
   * @returns Monthly flood count data
   */
  async getHighTideFloodingMonthly(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/monthly', {
      station,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding seasonal count data
   * @param params Parameters including station ID, seasons, and thresholds
   * @returns Seasonal flood count data
   */
  async getHighTideFloodingSeasonal(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/seasonal', {
      station,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding annual count data
   * @param params Parameters including station ID, year range, and thresholds
   * @returns Annual flood count data
   */
  async getHighTideFloodingAnnual(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/annual', {
      station,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding decadal projections
   * @param params Parameters including station ID, scenario, and decade
   * @returns Decadal projection data
   */
  async getHighTideFloodingProjections(params: Record<string, any>): Promise<any> {
    const { station, scenario = 'all', format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/projections', {
      station,
      scenario,
      format,
      ...rest
    });
  }

  /**
   * Get high tide flooding daily likelihoods
   * @param params Parameters including station ID and date
   * @returns Daily likelihood data
   */
  async getHighTideFloodingLikelihoods(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/htf/likelihoods', {
      station,
      format,
      ...rest
    });
  }

  /**
   * Get top ten water levels for a station
   * @param params Parameters including station ID and analysis type
   * @returns Top ten water level data
   */
  async getTopTenWaterLevels(params: Record<string, any>): Promise<any> {
    const { station, format = 'json', ...rest } = params;
    
    return this.fetchDpapi('/topten', {
      station,
      format,
      ...rest
    });
  }
}