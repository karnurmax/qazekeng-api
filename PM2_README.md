# PM2 Ecosystem Configuration

## Орнату

1. **PM2 орнату** (егер орнатылмаған болса):
```bash
npm install -g pm2
```

2. **Production build**:
```bash
npm run build
```

3. **PM2 іске қосу**:
```bash
npm run pm2:start
```

## Пайдалы командалар

### Бастау/Тоқтату
```bash
npm run pm2:start    # Қосылу
npm run pm2:stop     # Тоқтату
npm run pm2:restart  # Қайта бастау
npm run pm2:delete   # Жою
```

### Мониторинг
```bash
npm run pm2:logs     # Логтарды көру
npm run pm2:monit    # Мониторинг панелі
```

### Басқа командалар
```bash
pm2 status           # Статусты көру
pm2 list             # Барлық процесс тізімі
pm2 show qazekeng-api # Толық ақпарат
pm2 save             # Текущая конфигурацияны сақтау
pm2 startup          # Автостарт орнату
```

## Конфигурация сипаттамасы

- **name**: `qazekeng-api` - Процесс атауы
- **instances**: `1` - Процесс саны
- **max_memory_restart**: `1G` - Memory limit (1GB)
- **autorestart**: `true` - Автоматты қайта бастау
- **max_restarts**: `10` - Максималды қайта бастау саны
- **log_file**: `./logs/pm2-combined.log` - Лог файлы

## Environment Variables

`.env` файлын `.env.production` ретінде сақтаңыз немесе PM2 ecosystem-де `env` секциясына қосыңыз:

```javascript
env: {
  NODE_ENV: 'production',
  PORT: 3000,
  DATABASE_URL: 'your-database-url',
  JWT_SECRET: 'your-jwt-secret',
  OPENAI_API_KEY: 'your-openai-key',
  // ... басқа environment variables
}
```

## Автостарт орнату (өздігінен қосылу)

```bash
pm2 startup
pm2 save
```

Бұл командалар PM2-ны система қосылғанда автоматты түрде қосылуға орнатады.

## Қайта бастау кезінде кодты жаңарту

```bash
npm run build
npm run pm2:restart
```

