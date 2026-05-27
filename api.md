### `/api/login`

- **Метод**: `POST`
- **Backend** получает `{login: string, password: string}`
  - `login` - строка длиной от 3 до 40 символов
  - `password` - строка длиной от 8 до 255 символов
- **Frontend** получает `boolean`
  - `true`, если пользователь есть
  - `false`, если пользователя нет

### `/api/is_auth`

- **Метод**: `GET`
- **Backend** получает ничего
- **Frontend** получает `boolean`
  - `true`, если пользователь вошел в систему (чекается через куки)
  - `false`, если нет

### `/api/register`

- **Метод**: `POST`
- **Backend** получает `{login: string, password: string}`
  - `login` - строка длиной от 3 до 40 символов
  - `password` - строка длиной от 8 до 255 символов
- **Frontend** получает `boolean`
  - `true`, если новый пользователь создался
  - `false`, если нет