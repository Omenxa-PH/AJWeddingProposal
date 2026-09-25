# Deployment

The site is deployed to `aj-wedding-proposal.omnexaph.com` by the GitHub Actions workflow in `.github/workflows/deploy.yml` whenever `main` changes.

## One-time server setup

From this repository, copy the Nginx configuration to the server:

```sh
scp -i ~/.ssh/id_ed25519_deploy deploy/nginx-aj-wedding-proposal.conf administrator@93.127.142.121:/tmp/aj-wedding-proposal.conf
```

Then run these commands on the Ubuntu server as an administrator:

```sh
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/aj-wedding-proposal
sudo chown -R administrator:administrator /var/www/aj-wedding-proposal
sudo install -m 644 /tmp/aj-wedding-proposal.conf /etc/nginx/sites-available/aj-wedding-proposal
sudo ln -s /etc/nginx/sites-available/aj-wedding-proposal /etc/nginx/sites-enabled/aj-wedding-proposal
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d aj-wedding-proposal.omnexaph.com
```

The DNS `A` record for `aj-wedding-proposal.omnexaph.com` must point to the server before running Certbot.

## GitHub repository secrets

Add these secrets under **Settings > Secrets and variables > Actions**:

- `SERVER_HOST`: server IP address
- `SERVER_USER`: `administrator`
- `SERVER_PATH`: `/var/www/aj-wedding-proposal`
- `SERVER_SSH_KEY`: the private SSH key corresponding to a public key installed in the server user's `~/.ssh/authorized_keys`

Do not put the server password or private key in the repository. After the secrets are configured, pushing to `main` deploys the site automatically.
