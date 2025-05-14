import axios from 'axios';

/**
 * Provides information about valid NOAA Tides and Currents API parameters
 */
export class NoaaParametersService {
  /**
   * Get valid time zone values
   */
  getTimeZones(): { id: string, description: string }[] {
    return [
      { id: 'gmt', description: 'Greenwich Mean Time' },
      { id: 'lst', description: 'Local Standard Time' },
      { id: 'lst_ldt', description: 'Local Standard/Local Daylight Time' }
    ];
  }

  /**
   * Get valid datum values
   */
  getDatums(): { id: string, description: string }[] {
    return [
      { id: 'MHHW', description: 'Mean Higher High Water' },
      { id: 'MHW', description: 'Mean High Water' },
      { id: 'MTL', description: 'Mean Tide Level' },
      { id: 'MSL', description: 'Mean Sea Level' },
      { id: 'MLW', description: 'Mean Low Water' },
      { id: 'MLLW', description: 'Mean Lower Low Water' },
      { id: 'NAVD', description: 'North American Vertical Datum' },
      { id: 'STND', description: 'Station Datum' }
    ];
  }

  /**
   * Get valid units
   */
  getUnits(): { id: string, description: string }[] {
    return [
      { id: 'english', description: 'English units (feet, mph, etc.)' },
      { id: 'metric', description: 'Metric units (meters, kph, etc.)' }
    ];
  }

  /**
   * Get valid intervals for tide predictions
   */
  getTidePredictionIntervals(): { id: string, description: string }[] {
    return [
      { id: 'hilo', description: 'High/low tide predictions only' },
      { id: 'h', description: 'Hourly predictions' },
      { id: '6', description: '6-minute predictions' },
      { id: '30', description: '30-minute predictions' },
      { id: '60', description: '60-minute predictions' }
    ];
  }

  /**
   * Get valid intervals for current predictions
   */
  getCurrentPredictionIntervals(): { id: string, description: string }[] {
    return [
      { id: 'MAX_SLACK', description: 'Maximum flood/ebb and slack predictions only' },
      { id: '6', description: '6-minute predictions' },
      { id: '30', description: '30-minute predictions' },
      { id: '60', description: '60-minute predictions' }
    ];
  }

  /**
   * Get valid velocity types for current predictions
   */
  getVelocityTypes(): { id: string, description: string }[] {
    return [
      { id: 'default', description: 'Default velocity reporting (flood/ebb direction)' },
      { id: 'speed_dir', description: 'Speed and direction format' }
    ];
  }

  /**
   * Get valid meteorological products
   */
  getMeteorologicalProducts(): { id: string, description: string }[] {
    return [
      { id: 'air_temperature', description: 'Air temperature' },
      { id: 'water_temperature', description: 'Water temperature' },
      { id: 'wind', description: 'Wind speed and direction' },
      { id: 'air_pressure', description: 'Barometric pressure' },
      { id: 'air_gap', description: 'Air gap (distance between bridge and water surface)' },
      { id: 'conductivity', description: 'Conductivity' },
      { id: 'visibility', description: 'Visibility' },
      { id: 'humidity', description: 'Relative humidity' },
      { id: 'salinity', description: 'Salinity' },
      { id: 'hourly_height', description: 'Verified hourly height water level' },
      { id: 'high_low', description: 'Verified high/low water level' },
      { id: 'daily_mean', description: 'Verified daily mean water level' },
      { id: 'monthly_mean', description: 'Verified monthly mean water level' },
      { id: 'one_minute_water_level', description: 'One-minute water level data' },
      { id: 'datums', description: 'Datums' }
    ];
  }

  /**
   * Get valid station types
   */
  getStationTypes(): { id: string, description: string }[] {
    return [
      { id: 'waterlevels', description: 'Water level stations' },
      { id: 'currentpredictions', description: 'Current prediction stations' },
      { id: 'currents', description: 'Current observation stations' },
      { id: 'tidepredictions', description: 'Tide prediction stations' },
      { id: 'weather', description: 'Weather stations' },
      { id: 'ports', description: 'Physical Oceanographic Real-Time System (PORTS) stations' }
    ];
  }

  /**
   * Get valid date formats
   */
  getDateFormats(): { format: string, description: string, example: string }[] {
    return [
      { format: 'YYYYMMDD', description: 'Year, month, day without separators', example: '20230401' },
      { format: 'MM/DD/YYYY', description: 'Month/day/year with separators', example: '04/01/2023' },
      { format: 'today', description: 'Current date', example: 'today' },
      { format: 'latest', description: 'Latest available data', example: 'latest' },
      { format: 'recent', description: 'Most recent data', example: 'recent' }
    ];
  }

  /**
   * Get valid output formats
   */
  getOutputFormats(): { id: string, description: string }[] {
    return [
      { id: 'json', description: 'JSON format' },
      { id: 'xml', description: 'XML format' },
      { id: 'csv', description: 'CSV format (not available for all endpoints)' }
    ];
  }
} 