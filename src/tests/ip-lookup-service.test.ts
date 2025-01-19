import { IPLookupService } from '../application/services/ip-lookup-service';
import { IIPRepository } from '../domain/interfaces/ip-repository';
import { IPInfo } from '../domain/entities/ip-info';
import { IPLookupAPI } from '../infrastructure/external/ip-lookup-api';

// Mock the dependencies
jest.mock('../infrastructure/external/ip-lookup-api', () => ({
  IPLookupAPI: {
    fetchIPInfo: jest.fn(),
  },
}));
jest.mock('../domain/interfaces/ip-repository');

describe('IPLookupService', () => {
  let ipRepositoryMock: jest.Mocked<IIPRepository>;
  let ipLookupService: IPLookupService;

  beforeEach(() => {
    ipRepositoryMock = {
      getByIp: jest.fn(),
      saveIp: jest.fn(),
      removeByIp: jest.fn(),
    };
    ipLookupService = new IPLookupService(ipRepositoryMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getIPInfo', () => {
    it('should return cached data if it exists', async () => {
      // Arrange
      const ip = '192.168.0.1';
      const cachedIpInfo: IPInfo = {
        ip,
        country: 'US',
        city: 'New York',
        region: 'NY',
        timezone: 'GMT',
      };

      ipRepositoryMock.getByIp.mockResolvedValue(cachedIpInfo);

      // Act
      const result = await ipLookupService.getIPInfo(ip);

      // Assert
      expect(result.source).toBe('cache');
      expect(result.data).toEqual(cachedIpInfo);
      expect(ipRepositoryMock.getByIp).toHaveBeenCalledWith(ip);
      expect(IPLookupAPI.fetchIPInfo).not.toHaveBeenCalled();
    });

    it('should fetch from API and save to the repository if no cache exists', async () => {
      // Arrange
      const ip = '192.168.0.1';
      const ipData: IPInfo = {
        ip,
        country: 'US',
        city: 'Los Angeles',
        region: 'CA',
        timezone: 'GMT',
      };

      ipRepositoryMock.getByIp.mockResolvedValue(null);
      (IPLookupAPI.fetchIPInfo as jest.Mock).mockResolvedValue(ipData);

      // Act
      const result = await ipLookupService.getIPInfo(ip);

      // Assert
      expect(result.source).toBe('api');
      expect(result.data).toEqual(ipData);
      expect(ipRepositoryMock.getByIp).toHaveBeenCalledWith(ip);
      expect(IPLookupAPI.fetchIPInfo).toHaveBeenCalledWith(ip);
      expect(ipRepositoryMock.saveIp).toHaveBeenCalledWith(ip, ipData);
    });

    it('should handle errors when fetching from the API', async () => {
      // Arrange
      const ip = '192.168.0.1';

      ipRepositoryMock.getByIp.mockResolvedValue(null);
      (IPLookupAPI.fetchIPInfo as jest.Mock).mockRejectedValue(new Error('API Error'));

      // Act & Assert
      await expect(ipLookupService.getIPInfo(ip)).rejects.toThrow('API Error');
      expect(ipRepositoryMock.getByIp).toHaveBeenCalledWith(ip);
      expect(IPLookupAPI.fetchIPInfo).toHaveBeenCalledWith(ip);
    });
  });

  describe('deleteIPInfo', () => {
    it('should return true if the IP was successfully deleted', async () => {
      // Arrange
      const ip = '192.168.0.1';
      ipRepositoryMock.removeByIp.mockResolvedValue(true);

      // Act
      const result = await ipLookupService.deleteIPInfo(ip);

      // Assert
      expect(result).toBe(true);
      expect(ipRepositoryMock.removeByIp).toHaveBeenCalledWith(ip);
    });

    it('should return false if the IP could not be deleted', async () => {
      // Arrange
      const ip = '192.168.0.1';
      ipRepositoryMock.removeByIp.mockResolvedValue(false);

      // Act
      const result = await ipLookupService.deleteIPInfo(ip);

      // Assert
      expect(result).toBe(false);
      expect(ipRepositoryMock.removeByIp).toHaveBeenCalledWith(ip);
    });
  });
});
