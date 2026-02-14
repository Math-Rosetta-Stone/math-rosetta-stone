# rosseta-stone-math

## scripts

```bash
pip3 install pymysql openpyxl dotenv
cd scripts
python3 terms_populate.py
```

## Domain

Install the school vpn first https://security.utoronto.ca/services/vpn/usage-guide/

Connect the vpn with utorid

```bash
ssh your_utorid@kielstra-vm.utsc.utoronto.ca
```

## Process Manager (PM2)

```bash
pnpm build
pm2 start npx --name "my-nextjs-app" -- next start
pm2 save
pm2 startup
```

## Reverse Proxy

```bash
sudo systemctl status nginx
```
