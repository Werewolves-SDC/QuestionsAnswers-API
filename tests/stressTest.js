// response time (latency)
// throughput: requests processed per second (RPS/QPS/RPM)
// error rate: how often does a response generate an error

import http from 'k6/http';
import { sleep } from 'k6';
// to run test: npm run stress-test

export const options = {
  stages: [
    { duration: '5s', target: 250 },
    { duration: '10s', target: 250 },
    { duration: '5s', target: 500 },
    { duration: '10s', target: 500 },
    { duration: '5s', target: 1000 },
    { duration: '10s', target: 1000 },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(99)<2000'],
  },
};

const randomProductID = Math.floor(Math.random() * (1000012 - 1) + 1);
const randomQuestionID = Math.floor(Math.random() * (3518965 - 1) + 1);

const lastTenPID = Math.floor(Math.random() * (1000011 - 900010 + 1) + 900010);

const lastTenQID = Math.floor(Math.random() * (3518964 - 3167068 + 1) + 3167068);

const controlPID = 220409;
const controlPIDTen = 950009;

const BASE_URL = 'http://localhost:3000';

export default function () {
  // getAllQuestions local test
  http.get(`${BASE_URL}/qa/questions?product_id=${lastTenPID}&page=1&count=5`);
  sleep(1);
}
