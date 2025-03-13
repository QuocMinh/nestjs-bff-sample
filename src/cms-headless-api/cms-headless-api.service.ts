import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';
import {
  ACCESS_TOKEN_CACHE_TTL,
  CACHE_KEYS,
  LIFERAY_BASE_URL,
  LIFERAY_CLIENT_ID,
  LIFERAY_CLIENT_SECRET,
  LIFERAY_GRANT_TYPE,
  LIFERAY_HEADLESS_API_PATHS,
} from './constants';
import { CreateCmsHeadlessApiDto } from './dto/create-cms-headless-api.dto';
import { UpdateCmsHeadlessApiDto } from './dto/update-cms-headless-api.dto';

@Injectable()
export class CmsHeadlessApiService {
  private readonly logger = new Logger(CmsHeadlessApiService.name);

  private axiosInstance = axios.create({
    baseURL: LIFERAY_BASE_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // Login to Liferay when the service is created
    this.loginLiferay();

    // Automatically add the access token to the request headers
    this.axiosInstance.interceptors.request.use(async (config) => {
      const accessToken = await this.cacheManager.get(CACHE_KEYS.ACCESS_TOKEN);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    // Automatically refresh the access token when it expires
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === HttpStatus.UNAUTHORIZED) {
          await this.cacheManager.del(CACHE_KEYS.ACCESS_TOKEN);
          return this.loginLiferay().then(() => {
            return this.axiosInstance.request(error.config);
          });
        }
        return Promise.reject(error);
      },
    );
  }

  async loginLiferay() {
    try {
      const response = await this.axiosInstance.post(
        LIFERAY_HEADLESS_API_PATHS.LOGIN_OAUTH2,
        new URLSearchParams({
          grant_type: LIFERAY_GRANT_TYPE,
          client_id: LIFERAY_CLIENT_ID,
          client_secret: LIFERAY_CLIENT_SECRET,
        }),
      );

      const { access_token } = response.data;
      await this.cacheManager.set(
        CACHE_KEYS.ACCESS_TOKEN,
        access_token,
        ACCESS_TOKEN_CACHE_TTL,
      );
      return access_token;
    } catch (error) {
      this.logger.error('Error logging in to Liferay:', error);
      throw new Error('Failed to login to Liferay');
    }
  }

  createBlog(_createCmsHeadlessApiDto: CreateCmsHeadlessApiDto) {
    return 'This action adds a new cmsHeadlessApi';
  }

  async findAllBlogs() {
    try {
      const response = await this.axiosInstance.get(
        LIFERAY_HEADLESS_API_PATHS.GET_BLOGS,
      );
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching blog postings:', error);
      throw new Error('Failed to fetch blog postings');
    }
  }

  async findOneBlog(id: string) {
    try {
      const response = await this.axiosInstance.get(
        LIFERAY_HEADLESS_API_PATHS.GET_BLOG_DETAIL.replace('{blogId}', id),
      );
      return response.data;
    } catch (error) {
      this.logger.error(`Error fetching blog posting with id ${id}:`, error);
      throw new Error(`Failed to fetch blog posting with id ${id}`);
    }
  }

  updateBlog(id: number, _updateCmsHeadlessApiDto: UpdateCmsHeadlessApiDto) {
    return `This action updates a #${id} cmsHeadlessApi`;
  }

  removeBlog(id: number) {
    return `This action removes a #${id} cmsHeadlessApi`;
  }
}
