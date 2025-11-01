# QazekEng Backend (MVP++)

NestJS негізіндегі бекенд API, пайдаланушылардың ағылшынша мәтінін OpenAI арқылы түзетуге мүмкіндік береді.

## Технологиялар

- **NestJS** (TypeScript)
- **PostgreSQL** + TypeORM
- **OpenAI SDK** (GPT-4o)
- **Axios** (WhatsApp сервисіне)
- **JWT Auth**

## Орнату

### 1. Зависимостьтерді орнату

```bash
npm install
```

### 2. Environment файлын құру

`.env.example` файлын `.env` ретінде көшіріп, мәндерді толтырыңыз:

```bash
cp .env.example .env
```

### 3. Database миграциясын орындау

TypeORM синхронизациясын қолдану үшін development режимінде `synchronize: true` орнатуға болады немесе миграцияларды қолдануға болады:

```bash
npm run migration:generate -- -n InitialMigration
npm run migration:run
```

### 4. Серверді іске қосу

```bash
npm run start:dev
```

## API Endpoints

### Auth

- `POST /auth/send-otp` - OTP кодты WhatsApp арқылы жіберу
- `POST /auth/verify-otp` - OTP кодты тексеру және JWT токен алу

### Translate

- `POST /translate` - Мәтінді OpenAI арқылы түзету (Bearer token қажет)

### Dialogs

- `GET /dialogs` - Пайдаланушының диалогтарын алу (Bearer token қажет)

## Database Schema

### users
- `id` (uuid, PK)
- `phone` (varchar, unique)
- `created_at` (timestamp)

### dialogs
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `text_input` (text)
- `text_corrected` (text)
- `explanation` (text)
- `examples` (jsonb)
- `openai_model` (varchar)
- `openai_prompt_tokens` (int)
- `openai_completion_tokens` (int)
- `openai_total_tokens` (int)
- `openai_cost_usd` (numeric(10,6))
- `created_at` (timestamp)

## Ескертпелер

- MVP кезеңінде OTP expire уақыты жоқ
- OpenAI cost нақты API response ішінен (`usage.total_cost`) алынады
- Модель: `gpt-4o`

