// response time (latency)
// throughput: requests processed per second (RPS/QPS/RPM)
// error rate: how often does a response generate an error

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  discardResponseBodies: true,
  scenarios: {
    oneRPS: {
      executor: 'constant-arrival-rate',
      exec: 'oneRPS',
      rate: 1,
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 10,
    },
    tenRPS: {
      executor: 'constant-arrival-rate',
      exec: 'tenRPS',
      rate: 10,
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 60,
      startTime: '5s',
    },
    hundredRPS: {
      executor: 'constant-arrival-rate',
      exec: 'hundredRPS',
      rate: 100,
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 600,
      startTime: '10s',
    },
    thousandRPS: {
      executor: 'constant-arrival-rate',
      exec: 'thousandRPS',
      rate: 1000,
      timeUnit: '1s',
      duration: '5s',
      preAllocatedVUs: 6000,
      startTime: '20s',
    },
  },
  thresholds: {
    'http_req_duration{scenario:oneRPS}': ['p(99)<5000'],
    'http_req_duration{scenario:tenRPS}': ['p(99)<5000'],
    'http_req_duration{scenario:hundredRPS}': ['p(99)<5000'],
    'http_req_duration{scenario:thousandRPS}': ['p(99)<5000'],
    'http_req_failed{scenario:oneRPS}': ['rate<0.01'],
    'http_req_failed{scenario:tenRPS}': ['rate<0.01'],
    'http_req_failed{scenario:hundredRPS}': ['rate<0.01'],
    'http_req_failed{scenario:thousandRPS}': ['rate<0.01'],
  },
};

const randomProductID = Math.floor(Math.random() * (1000012 - 1) + 1);
const randomQuestionID = Math.floor(Math.random() * (3518965 - 1) + 1);

const lastTenPID = Math.floor(Math.random() * (1000011 - 900010 + 1) + 900010);

const lastTenQID = Math.floor(Math.random() * (3518964 - 3167068 + 1) + 3167068);

const controlPID = 220409;
const controlPIDTen = 950009;

const BASE_URL = 'http://localhost:3000';

export function oneRPS() {
  // getAllQuestions local test
  http.get(`${BASE_URL}/qa/questions?product_id=${220409}&page=1&count=5`, {
    tags: { my_custom_tag: 'oneRPS' },
  });
  sleep(1);
}

export function tenRPS() {
  // getAllQuestions local test
  http.get(`${BASE_URL}/qa/questions?product_id=${220409}&page=1&count=5`, {
    tags: { my_custom_tag: 'tenRPS' },
  });
  sleep(1);
}

export function hundredRPS() {
  // getAllQuestions local test
  http.get(`${BASE_URL}/qa/questions?product_id=${220409}&page=1&count=5`, {
    tags: { my_custom_tag: 'hundredRPS' },
  });
  sleep(1);
}
export function thousandRPS() {
  // getAllQuestions local test
  http.get(`${BASE_URL}/qa/questions?product_id=${220409}&page=1&count=5`, {
    tags: { my_custom_tag: 'thousandRPS' },
  });
  sleep(1);
}
// // getAnswers local test
// http.get(`${BASE_URL}/qa/questions/${randomQuestionID}/answers`);
// export function thousandRPS() {
//   // getAllQuestions local test
//   http.get(`${BASE_URL}/qa/questions?product_id=${220409}&page=1&count=5`, {
//     tags: { my_custom_tag: 'thousandRPS' },
//   });
//   sleep(1);
// }

// last 10% getAllQuestions
// http.get(`${BASE_URL}/qa/questions?product_id=${lastTenPID}&page=1&count=5`);
// last 10% getAnswers
// http.get(`${BASE_URL}/qa/questions/${lastTenQID}/answers`);

// UPDATE HELPFUL COUNT
// http.put(`${BASE_URL}/qa/questions/:${randomQuestionID}/helpful`);
