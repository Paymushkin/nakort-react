/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Оптимизация производительности
  compress: true,
  poweredByHeader: false,
  // Настройка Sass для подавления предупреждений
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  // Отключение кэширования в режиме разработки
  webpack: (config, { dev }) => {
    // В dev отключаем кэш вебпака, чтобы стили и компоненты обновлялись без залипаний
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  // SEO оптимизация
  async headers() {
    const headers = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      }
    ];

    // Отключение кэширования в режиме разработки
    if (process.env.NODE_ENV === 'development') {
      headers.push(
        {
          key: 'Cache-Control',
          value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
        },
        {
          key: 'Pragma',
          value: 'no-cache'
        },
        {
          key: 'Expires',
          value: '0'
        }
      );
    }

    return [
      {
        source: '/:path*',
        headers
      }
    ];
  }
};

module.exports = nextConfig;

