import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createServer } from 'node:net';
import { constants } from 'node:os';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const require = createRequire(import.meta.url);
const cwd = fileURLToPath(new URL('../', import.meta.url));
const baseUrl = 'http://127.0.0.1:3000';
const args = process.argv.slice(2);
const children = new Set();
const controller = new AbortController();
let stopping = false;
let server;

function exitStatus(code, signal) {
  return code ?? (signal ? 128 + (constants.signals[signal] ?? 1) : 1);
}

function launch(cli, cliArgs) {
  const child = spawn(process.execPath, [cli, ...cliArgs], {
    cwd,
    stdio: 'inherit',
    shell: false,
    detached: false,
  });
  children.add(child);
  child.done = new Promise((resolve) => {
    child.once('error', (error) => {
      console.error(`[seo-verify] ${error.message}`);
      resolve(1);
    });
    child.once('exit', (code, signal) => resolve(exitStatus(code, signal)));
  });
  return child;
}

async function terminate(child) {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null) return;
  if (process.platform === 'win32') {
    // npm starts the checker through a command shell: kill its entire tree.
    await new Promise((resolve) => {
      const killer = spawn('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], {
        stdio: 'ignore',
        shell: false,
        timeout: 4000,
      });
      killer.once('error', () => {
        child.kill('SIGKILL');
        resolve();
      });
      killer.once('exit', resolve);
    });
  } else {
    child.kill('SIGTERM');
    await Promise.race([child.done, delay(1000)]);
    if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
  }
}

async function stop(code, message) {
  if (stopping) return;
  stopping = true;
  controller.abort();
  if (message) console.error(`[seo-verify] ${message}`);
  await Promise.all([...children].map(terminate));
  clearTimeout(workTimer);
  clearTimeout(hardTimer);
  process.exit(code);
}

// Reserve five seconds for tree cleanup within the 100-second total budget.
const workTimer = setTimeout(() => void stop(124, 'Time limit reached; cleaning up.'), 95_000);
const hardTimer = setTimeout(() => {
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) child.kill('SIGKILL');
  }
  console.error('[seo-verify] Hard 100-second timeout.');
  process.exit(124);
}, 100_000);

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(signal, () => void stop(exitStatus(null, signal), `Received ${signal}.`));
}
process.on('uncaughtException', (error) => void stop(1, error.stack ?? error.message));
process.on('unhandledRejection', (error) => void stop(1, String(error)));

async function ensurePortUnused() {
  await new Promise((resolve, reject) => {
    const probe = createServer();
    probe.once('error', (error) => reject(new Error(
      `Cannot exclusively bind 127.0.0.1:3000; refusing to reuse a server (${error.code}).`,
    )));
    probe.listen({ host: '127.0.0.1', port: 3000, exclusive: true }, () => {
      probe.close((error) => error ? reject(error) : resolve());
    });
  });
}

function validateArgs() {
  for (let i = 0; i < args.length; i += 2) {
    const flag = args[i];
    const value = args[i + 1];
    if (flag === '--stage' && (value === 'A' || value === 'B')) continue;
    // npm run itself uses a shell. Restrict paths to safe filesystem characters.
    if (flag === '--report-json' && value && /^[a-zA-Z0-9 _./:\\-]+$/.test(value)
      && !value.startsWith('-')) continue;
    throw new Error('Usage: seo-verify.mjs [--stage A|B] [--report-json PATH]. Report paths may contain letters, digits, spaces, _, ., /, :, \\, and -.');
  }
}

async function waitUntilReady() {
  const deadline = Date.now() + 45_000;
  while (Date.now() < deadline && !stopping) {
    try {
      const response = await fetch(baseUrl, {
        redirect: 'manual',
        signal: AbortSignal.any([
          controller.signal,
          AbortSignal.timeout(Math.min(2000, Math.max(1, deadline - Date.now()))),
        ]),
      });
      await response.body?.cancel();
      if (response.status >= 200 && response.status < 400) return;
    } catch (error) {
      if (controller.signal.aborted) throw error;
    }
    await delay(Math.min(250, Math.max(1, deadline - Date.now())), undefined, {
      signal: controller.signal,
    });
  }
  throw new Error('Server did not become ready within 45 seconds. Ensure a production build exists.');
}

async function main() {
  validateArgs();
  const nextCli = require.resolve('next/dist/bin/next');
  let npmCli = process.env.npm_execpath;
  if (!npmCli) {
    try {
      npmCli = require.resolve('npm/bin/npm-cli.js');
    } catch {
      throw new Error('Cannot resolve the npm CLI. Launch through npm run seo:verify so npm_execpath is provided.');
    }
  }
  await ensurePortUnused();
  if (stopping) return;
  server = launch(nextCli, ['start', '--hostname', '127.0.0.1', '--port', '3000']);
  server.done.then((code) => {
    if (!stopping) void stop(code || 1, 'Owned Next.js server exited unexpectedly.');
  });
  await waitUntilReady();
  if (stopping) return;
  const checker = launch(npmCli, ['run', 'seo:check', '--', '--base-url', baseUrl, ...args]);
  await stop(await checker.done);
}

main().catch((error) => void stop(1, error.message));
