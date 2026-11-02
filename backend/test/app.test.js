const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');

const { app } = require('../src/app');

let baseUrl;
let server;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });

  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('health endpoint reports readiness', async () => {
  const response = await fetch(`${baseUrl}/health`);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('access-control-allow-origin'), '*');
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('events endpoint returns the active hardcoded event', async () => {
  const response = await fetch(`${baseUrl}/api/get_events/`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.length, 2);
  assert.deepEqual(body[0], {
    id: 1,
    name: 'Кубок города',
    description: 'Заплыв на 100 метров вольным стилем',
    is_finished: false,
  });
});

test('scoreboard endpoint keeps the tuple shape expected by the client', async () => {
  const response = await fetch(`${baseUrl}/api/scoreboard/1`);
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.length, 3);
  assert.deepEqual(body[0][0], {
    id: 1,
    event_id: 1,
    time: '00:52.31',
    lane: 4,
  });
});

test('write endpoints return deterministic acknowledgements', async () => {
  const loginResponse = await fetch(`${baseUrl}/api/login/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'judge', is_admin: true }),
  });
  const userResponse = await fetch(`${baseUrl}/api/create_user/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: 'timer', is_admin: false }),
  });
  const timeResponse = await fetch(`${baseUrl}/api/post_time/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ event_id: 1, time: '00:51.42', lane: 3 }),
  });
  const createResponse = await fetch(`${baseUrl}/api/add_event/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Тест', description: 'Проверка' }),
  });
  const finishResponse = await fetch(`${baseUrl}/api/finish_event/1`, {
    method: 'POST',
  });
  const eventsResponse = await fetch(`${baseUrl}/api/get_events/`);

  assert.deepEqual(await loginResponse.json(), {
    id: 1,
    username: 'judge',
    is_admin: true,
    authenticated: true,
  });
  assert.equal(userResponse.status, 201);
  assert.deepEqual(await userResponse.json(), {
    id: 2,
    username: 'timer',
    is_admin: false,
    created: true,
  });
  assert.equal(timeResponse.status, 201);
  assert.deepEqual(await timeResponse.json(), {
    id: 4,
    event_id: 1,
    time: '00:51.42',
    lane: 3,
  });
  assert.equal(createResponse.status, 201);
  assert.deepEqual(await createResponse.json(), {
    id: 3,
    name: 'Тест',
    description: 'Проверка',
    is_finished: false,
  });
  assert.deepEqual(await finishResponse.json(), {
    id: 1,
    is_finished: true,
  });
  assert.equal((await eventsResponse.json()).length, 2);
});

test('unknown routes return a JSON 404', async () => {
  const response = await fetch(`${baseUrl}/api/unknown`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: 'Not found',
    path: '/api/unknown',
  });
});
