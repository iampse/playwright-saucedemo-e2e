import express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.MOCK_API_PORT ? Number(process.env.MOCK_API_PORT) : 3001;

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * POST /auth/login
 * - success: { token: "mock-token", user: { username: "standard_user" } }
 * - failure: 401 + { error: { code, message } }
 */
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body ?? {};

  // 입력 검증 (계약을 명확히)
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'username and password must be strings',
      },
    });
  }

  // SauceDemo와 동일한 계정명/비번 컨셉을 흉내
  const isValid = username === 'standard_user' && password === 'secret_sauce';

  if (!isValid) {
    return res.status(401).json({
      error: {
        code: 'INVALID_CREDENTIALS',
        message: 'Username and password do not match',
      },
    });
  }

  return res.status(200).json({
    token: 'mock-token',
    user: { username },
  });
});

app.listen(PORT, () => {
  console.log(`[mock-api] listening on http://localhost:${PORT}`);
});
