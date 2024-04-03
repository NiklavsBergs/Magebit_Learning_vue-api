import { Router } from 'express';
import request from 'request';

module.exports = ({ config }) => {
  const api = Router();

  api.get('/day', (req, res) => {
    const { date } = req.query;
    const { accessToken } = config.extensions.weather;
    var url;

    if (!date || date === '') {
      url = `http://api.weatherapi.com/v1/current.json?key=${accessToken}&q=Riga&aqi=no`;
    } else {
      url = `http://api.weatherapi.com/v1/future.json?key=${accessToken}&q=Riga&dt=${date}`;
    }

    request(
      {
        url
      },
      (error, response, body) => {
        let apiResult;
        const errorResponse = error || body.error;

        if (errorResponse) {
          apiResult = { code: 500, result: errorResponse };
        } else {
          const responseBody = JSON.parse(body);
          apiResult = { code: 200, result: responseBody };
        }

        res.status(apiResult.code).json(apiResult);
      }
    );
  });

  api.get('/forecast', (req, res) => {
    const { accessToken } = config.extensions.weather;
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${accessToken}&q=Riga&days=3&aqi=no&alerts=no`;

    request(
      {
        url
      },
      (error, response, body) => {
        let apiResult;
        const errorResponse = error || body.error;

        if (errorResponse) {
          apiResult = { code: 500, result: errorResponse };
        } else {
          const responseBody = JSON.parse(body);
          apiResult = { code: 200, result: responseBody };
        }

        res.status(apiResult.code).json(apiResult);
      }
    );
  });

  return api;
};
