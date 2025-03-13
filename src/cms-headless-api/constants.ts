export const LIFERAY_BASE_URL = 'http://localhost:8080/o';
export const LIFERAY_GRANT_TYPE = 'client_credentials';
export const LIFERAY_CLIENT_ID = 'id-d762052d-f971-fca5-bd07-e64ce37d9';
export const LIFERAY_CLIENT_SECRET = 'secret-08cdab44-8aa7-b332-27d7-d89bfb450';
export const ACCESS_TOKEN_CACHE_TTL = 5 * 60 * 1000; // 5min
export const SITE_DEMO_ID = '20117';
export const LIFERAY_HEADLESS_API_PATHS = {
  LOGIN_OAUTH2: '/oauth2/token',
  GET_BLOGS: `/headless-delivery/v1.0/sites/${SITE_DEMO_ID}/blog-postings`,
  GET_BLOG_DETAIL: `/headless-delivery/v1.0/blog-postings/{blogId}`,
};
export const CACHE_KEYS = {
  ACCESS_TOKEN: 'access_token',
};
