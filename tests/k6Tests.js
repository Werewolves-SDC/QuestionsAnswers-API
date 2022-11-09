// response time (latency)
// goal <2000 ms under load

// throughput: requests processed per second (RPS/QPS/RPM)
// goal: 100rps on EC2

// error rate: how often does a response generate an error
// goal: <1% under load
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // vus: 10,
  // duration: '30s',
  thresholds: {
    http_req_duration: ['p(99)<5000'], // 99% of requests must complete below 2.0s
    http_req_failed: ['rate<0.01'],
  },
};
// last qID: 3518964
// last 10%: 3167068 -3518964
// last pID: 900010 - 1000011
const randomProductID = Math.floor(Math.random() * (1000012 - 1) + 1);
const randomQuestionID = Math.floor(Math.random() * (3518965 - 1) + 1);

const lastTenPID = Math.floor(Math.random() * (1000011 - 900010 + 1) + 900010);

const lastTenQID = Math.floor(Math.random() * (3518964 - 3167068 + 1) + 3167068);

const BASE_URL = 'http://localhost:3000';

export default () => {
  // getAllQuestions local test
  // http.get(`${BASE_URL}/qa/questions?product_id=${randomProductID}&page=1&count=5`);
  // getAnswers local test
  http.get(`${BASE_URL}/qa/questions/${randomQuestionID}/answers`);

  // last 10% getAllQuestions
  // http.get(`${BASE_URL}/qa/questions?product_id=${lastTenPID}&page=1&count=5`);
  // last 10% getAnswers
  // http.get(`${BASE_URL}/qa/questions/${lastTenQID}/answers`);

  sleep(1);
  // const responses = http.batch([
  //   ['GET', `${BASE_URL}/qa/questions?product_id=${randomProductID}`],
  //   ['GET', `${BASE_URL}/qa/questions/${randomQuestionID}/answers`],
  // ]);
  // sleep(1);
};
