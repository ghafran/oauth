
# Prep

create ecs instance and assign public to to oauth.vital.chat

```
ssh -i ~/.ssh/kp_x.pem ubuntu@oauth.vital.chat
cat ~/.ssh/id_rsa.pub | ssh -i ~/.ssh/kp_x.pem ubuntu@oauth.vital.chat 'cat >> .ssh/authorized_keys'
ssh ubuntu@oauth.vital.chat
```

# Setup

```
scp web/ssl/*.pem ubuntu@oauth.vital.chat:/home/ubuntu

ssh ubuntu@oauth.vital.chat
sudo su

curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

cd /srv/
git clone https://github.com/ghafran/oauth.git
cd oauth
npm install

cp /home/ubuntu/*.pem /srv/oauth/web/ssl
```

# Run 

```
cd /srv/oauth
git pull
node --inspect=8080 main.js
```

# Debug

```
ssh -N -L 8080:localhost:8080 ubuntu@oauth.vital.chat
http://localhost:8080/json
```


# SSL

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
docker rm sslcertgen
docker run -it --name sslcertgen --entrypoint="/bin/sh" -v "$(pwd):/ssl" \
-e "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" \
-e "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" \
certbot/certbot -c "pip install certbot-dns-route53; \
certbot certonly \
--preferred-challenges dns \
--cert-name oauth.vital.chat \
--email ghafranabbas@gmail.com \
--agree-tos \
--no-eff-email \
--manual-public-ip-logging-ok \
--dns-route53 \
--dns-route53-propagation-seconds 30 \
--domains oauth.vital.chat; \
cd /etc/letsencrypt/live/oauth.vital.chat; \
cp *.pem /ssl; \
/bin/sh;"

exit
docker rm sslcertgen
```