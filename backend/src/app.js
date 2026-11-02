const express = require('express');

const events = [
  {
    id: 1,
    name: 'Кубок города',
    description: 'Заплыв на 100 метров вольным стилем',
    is_finished: false,
  },
  {
    id: 2,
    name: 'Осенний чемпионат',
    description: 'Финальный заплыв на 50 метров',
    is_finished: true,
  },
];

const scoreboard = [
  [{ id: 1, event_id: 1, time: '00:52.31', lane: 4 }],
  [{ id: 2, event_id: 1, time: '00:53.08', lane: 2 }],
  [{ id: 3, event_id: 1, time: '00:54.17', lane: 5 }],
];

const app = express();

app.use(express.json());
app.use((request, response, next) => {
  response.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  });

  if (request.method === 'OPTIONS') {
    return response.sendStatus(204);
  }

  return next();
});

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.get('/api/get_events/', (_request, response) => {
  response.json(events);
});

app.get('/api/scoreboard/:eventId', (request, response) => {
  const eventId = Number(request.params.eventId);
  const results = scoreboard.filter(([result]) => result.event_id === eventId);

  response.json(results);
});

app.post('/api/login/', (request, response) => {
  response.json({
    id: 1,
    username: request.body.username ?? 'demo',
    is_admin: Boolean(request.body.is_admin),
    authenticated: true,
  });
});

app.post('/api/create_user/', (request, response) => {
  response.status(201).json({
    id: 2,
    username: request.body.username ?? 'demo',
    is_admin: Boolean(request.body.is_admin),
    created: true,
  });
});

app.post('/api/post_time/', (request, response) => {
  response.status(201).json({
    id: 4,
    event_id: request.body.event_id ?? 1,
    time: request.body.time ?? '00:55.00',
    lane: request.body.lane ?? 1,
  });
});

app.post('/api/add_event/', (request, response) => {
  response.status(201).json({
    id: 3,
    name: request.body.name ?? 'Новый заплыв',
    description: request.body.description ?? 'Тестовое соревнование',
    is_finished: false,
  });
});

app.post('/api/finish_event/:eventId', (request, response) => {
  response.json({
    id: Number(request.params.eventId),
    is_finished: true,
  });
});

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found',
    path: request.originalUrl,
  });
});

module.exports = { app, events, scoreboard };
