import _ from 'lodash';
import './main.css';
import api from './api.js';
import handle from './handle.js';

handle.storage();
api.getWeatherData(localStorage.getItem("location"));