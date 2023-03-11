# Evented App

## Running Expo on a local network in Docker

> The docker-compose file has been setup to share the ports needed for expo
> to function. This shares the relevant ports on 0.0.0.0.
> Using the vscode settings appeared to just use 127.0.0.1 so compose was
> needed to allow mobile testing.

The alternative to this setup is to use an ngrok tunnel.

Inform react native of the hosts lan port:

```sh
REACT_NATIVE_PACKAGER_HOSTNAME=192.168.50.70 npx expo start
```

## Supabase

supabase link --project-ref

| item              | value                       |
|-------------------|-----------------------------|
| project ref       | happibhddeazlkchgste
| url               | https://happibhddeazlkchgste.supabase.co
| anon key          | $SUPABASE_ANON_KEY
| api url           | $SUPABASE_API_URL


### Type Generation

```sh
npx supabase gen types typescript --local >| supabase/types.ts
```


## Local Builds

Create a local build using:

```sh
eas build --platform ios --local
```

### Setup

```sh
# install node
brew install node@16
brew link node@16

# install eas
npm install -g eas-cli
```
