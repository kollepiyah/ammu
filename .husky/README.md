# Husky Pre-commit Hooks

## Setup (jalankan sekali)

```bash
npm install
# Husky akan auto-install hook via "prepare" script
```

## Apa yang dilakukan?

`pre-commit` hook akan **memblokir commit** jika ada file sensitive:

- `.env`, `.env.local`, `.env.*`
- `*.keystore`, `*.jks` (Android signing keys)
- `*.key`, `*.pem` (private keys)
- `service-account*.json`, `firebase-adminsdk-*.json`
- `google-services.json`, `GoogleService-Info.plist`
- `secrets/`, `.secrets/`

Plus auto-format file dengan Prettier via `lint-staged`.

## Bypass (DARURAT saja, jangan untuk credentials!)

```bash
git commit --no-verify -m "..."
```

## Test hook

```bash
echo "TEST=1" > .env.test
git add .env.test
git commit -m "test"
# Akan diblokir
git reset HEAD .env.test
rm .env.test
```
