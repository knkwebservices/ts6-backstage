<p align="center">
  <img src="docs/backstage-banner.svg" alt="TS6 Backstage — TeamSpeak 6 voice, right in your browser" width="100%">
</p>

# TS6 Backstage

**Join a TeamSpeak 6 server straight from your browser — no TeamSpeak client to install.**

TS6 Backstage is a self-hosted web client and voice gateway for TeamSpeak 6 (TeamSpeak 3 works too). Share one link, and your friends can hop into your channels, talk, and chat from any modern browser on desktop or phone.

It's maintained by [K & K Web Services](https://knkws.com) and runs alongside [TS6 Roadie](https://github.com/knkwebservices/ts6-roadie), our music and server-tools bot for TeamSpeak 6. Live on the **TGSC Gaming Community** server.

> **Based on [WebSpeak](https://github.com/EchoSixHIYA/WebSpeak-client-for-TeamSpeak) by EchoSixHIYA.** TS6 Backstage is a modified fork of that project. All credit for the original code goes to its author.

---

## What it does

- **Voice in the browser:** Opus audio, push-to-talk or voice activation, mute, mic test, and per-person volume
- **Full channel tree:** see who's in each channel and move between channels
- **Chat:** channel, server and private messages, plus pokes and whispers
- **Share audio:** on desktop, share a window or browser tab's sound with your channel
- **Invite links:** create links that expire or can be revoked
- **Admin console:** default server, access rules, sessions, connection history, logs and database backups
- **Optional low-delay voice (WebRTC)** with automatic fallback
- **Light and dark themes**, mobile-friendly layout, English / Deutsch / 中文

---

## Quick start

### Option 1: Docker Compose (Linux)

```bash
git clone --depth 1 https://github.com/knkwebservices/ts6-backstage.git
cd ts6-backstage
docker compose pull
docker compose up -d
```

Open `http://<your-host>:3040`. Data is kept in the `webspeak-data` Docker volume.
Don't run `docker compose down -v`; that deletes the database and admin settings.

### Option 2: Windows or Linux package (no Node.js needed)

1. Download the `windows-x64.zip` or `linux-x64.tar.gz` package from the [releases page](https://github.com/EchoSixHIYA/WebSpeak-client-for-TeamSpeak/releases/latest).
2. Extract it to its own folder.
3. Run `start-webspeak.cmd` on Windows or `./start-webspeak.sh` on Linux.

### Option 3: From source

Requires Node.js 22.5+, Git, Python, Make and a C/C++ build toolchain.

```bash
npm ci --ignore-scripts
npm run prepare:sdk
npm rebuild @discordjs/opus --foreground-scripts
npm --prefix web ci
npm --prefix web run build
npm run build
npm start
```

---

## First-time setup

1. Go to `http://<your-host>:3040/admin`.
2. Sign in with `admin` / `admin` and **change the password right away** (at least 12 characters).
3. On the **Servers** page, set your default TeamSpeak server, for example `tgscgo.net#9987`.
4. Put it behind HTTPS before sharing it publicly. Browsers only allow microphone access on secure pages.

### HTTPS with Caddy

```caddyfile
talk.example.com {
    reverse_proxy 127.0.0.1:3040
}
```

### Ports

| Port | What it's for |
| --- | --- |
| `3040/TCP` | Web page and WebSocket (put this behind your HTTPS proxy) |
| `40000–40099/UDP` | Only if you turn on WebRTC low-delay voice |
| `9987/UDP` (outbound) | Connecting to your TeamSpeak server |

### Using it with TS6 Roadie

Every Backstage user reaches TeamSpeak from the gateway's IP address. If Roadie's `ipguard` cog is enabled, exempt that IP so web users aren't flagged as clones or for country/VPN checks.

---

## Requirements and notes

- A current Chrome, Edge, Firefox or Safari browser
- Up to 100 browser users per instance
- The gateway must be able to reach your TeamSpeak server
- TS6 Backstage is a community project. It is **not** an official TeamSpeak product; TeamSpeak names and trademarks belong to their owners.

---

## Credits and license

- **Original project:** [WebSpeak](https://github.com/EchoSixHIYA/WebSpeak-client-for-TeamSpeak) by [EchoSixHIYA](https://github.com/EchoSixHIYA)
- **TeamSpeak protocol SDK:** [EchoSixHIYA/teamspeak-js](https://github.com/EchoSixHIYA/teamspeak-js)
- **WebRTC:** [werift](https://github.com/shinyoshiaki/werift-webrtc) (MIT)

**Modification notice:** this fork was modified by K & K Web Services beginning October 2026 (renamed to TS6 Backstage, new README and branding). See the commit history for every change.

Licensed under the [GNU Affero General Public License v3.0 only](LICENSE), the same as the original. If you run a modified version of this software for users over a network, you must offer those users the corresponding source code. The full source of TS6 Backstage is available in this repository.
