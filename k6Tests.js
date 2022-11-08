// response time (latency)
// goal <2000 ms under load

// throughput: requests processed per second (RPS/QPS/RPM)
// goal: 100rps on EC2

// error rate: how often does a response generate an error
// goal: <1% under load
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests must complete below 2.0s
  },
};
// last qID: 3518964
// last pID: 1000011
const randomProductID = Math.floor(Math.random() * (1000012 - 1) + 1);
const randomQuestionID = Math.floor(Math.random() * (3518965 - 1) + 1);

const BASE_URL = 'http://localhost:3000';

export default () => {
  // local test
  http.get(`${BASE_URL}/qa/questions?product_id=${randomProductID}`);
  // http.get(`${BASE_URL}/qa/questions/${randomQuestionID}/answers`);
  sleep(1);
  // const responses = http.batch([
  //   ['GET', `${BASE_URL}/qa/questions?product_id=${randomProductID}`],
  //   ['GET', `${BASE_URL}/qa/questions/${randomQuestionID}/answers`],
  // ]);
  // sleep(1);
};
