# Postman Collection - QazekEng API

## Орнату

1. **Postman-ды ашыңыз**
2. **Collection импорттау:**
   - Import батырмасын басыңыз
   - `QazekEng_API.postman_collection.json` файлын таңдаңыз
3. **Environment импорттау (опционал):**
   - Import батырмасын басыңыз
   - `QazekEng_API.postman_environment.json` файлын таңдаңыз
   - Environment-ты таңдаңыз (оң жақтағы environment dropdown-да)

## Environment Variables

- `base_url` - API base URL (default: `http://localhost:3000`)
- `otp_code` - OTP код (автоматты толтырылады)
- `jwt_token` - JWT токен (автоматты толтырылады)

## Endpoints

### Auth

1. **Send OTP** (`POST /auth/send-otp`)
   - OTP код жіберу
   - Егер WhatsApp қате берсе, response-та `code` полесі болады
   - Тест скрипт автоматты түрде кодты environment-қа сақтайды

2. **Verify OTP** (`POST /auth/verify-otp`)
   - OTP кодты тексеру
   - JWT токен алу
   - Токен автоматты түрде environment-қа сақталады

### Translate

3. **Translate Text** (`POST /translate`)
   - Мәтінді түзету
   - JWT токен қажет (Bearer token)
   - Автоматты түрде `jwt_token` environment variable-ды қолданады

### Dialogs

4. **Get User Dialogs** (`GET /dialogs`)
   - Пайдаланушы диалогтарын алу
   - JWT токен қажет (Bearer token)
   - Автоматты түрде `jwt_token` environment variable-ды қолданады

## Тестілеу реті

1. **Send OTP** - OTP код жіберу
   - Телефон нөмірін өзгертіңіз
   - Егер WhatsApp қате берсе, response-та `code` полесінен кодты көріңіз

2. **Verify OTP** - OTP кодты тексеру
   - `{{otp_code}}` автоматты түрде толтырылады (Send OTP-тан кейін)
   - Немесе қолмен кодты енгізіңіз

3. **Translate Text** - Мәтін түзету
   - JWT токен автоматты түрде қолданылады

4. **Get User Dialogs** - Диалогтарды алу
   - JWT токен автоматты түрде қолданылады

## Ескертпелер

- Барлық endpoint-тер `{{base_url}}` переменнаясын қолданады
- JWT токен Verify OTP-тан кейін автоматты түрде сақталады
- Тест скрипттер код пен токенді автоматты түрде сақтайды

