
# Prep

create ecs instance and assign public to to oauth.vital.chat

```
ssh -i ~/.ssh/kp_x.pem ubuntu@oauth.vital.chat
cat ~/.ssh/id_rsa.pub | ssh -i ~/.ssh/kp_x.pem ubuntu@oauth.vital.chat 'cat >> .ssh/authorized_keys'
ssh ubuntu@oauth.vital.chat
```

# Setup

```
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

cd /srv/
git clone https://github.com/ghafran/oauth.git
cd oauth
npm install
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