<<<<<<< HEAD
(async () => {
  const http = require('http');
  const base = { hostname: 'localhost', port: 3000 };

  function post(path, data) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(data);
      const options = {
        hostname: base.hostname,
        port: base.port,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };
      const req = http.request(options, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: body ? JSON.parse(body) : null }));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  try {
    console.log('Creating time...');
    const t = await post('/api/times', { nome: 'Flamengo', fundacao: '1895-11-17' });
    console.log('Time status', t.status);
    console.log('Time body', t.body);

    console.log('Creating jogador...');
    const j = await post('/api/jogadores', { nome: 'joao', posicao: 'lateral', numero: 10, timeId: t.body.id });
    console.log('Jogador status', j.status);
    console.log('Jogador body', j.body);
  } catch (err) {
    console.error('Error during smoke test', err);
    process.exit(1);
  }
})();
=======
(async () => {
  const http = require('http');
  const base = { hostname: 'localhost', port: 3000 };

  function post(path, data) {
    return new Promise((resolve, reject) => {
      const payload = JSON.stringify(data);
      const options = {
        hostname: base.hostname,
        port: base.port,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };
      const req = http.request(options, (res) => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body: body ? JSON.parse(body) : null }));
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });
  }

  try {
    console.log('Creating time...');
    const t = await post('/api/times', { nome: 'Flamengo', fundacao: '1895-11-17' });
    console.log('Time status', t.status);
    console.log('Time body', t.body);

    console.log('Creating jogador...');
    const j = await post('/api/jogadores', { nome: 'joao', posicao: 'lateral', numero: 10, timeId: t.body.id });
    console.log('Jogador status', j.status);
    console.log('Jogador body', j.body);
  } catch (err) {
    console.error('Error during smoke test', err);
    process.exit(1);
  }
})();
>>>>>>> Parte-Milena
