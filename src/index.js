import _ from 'lodash';
import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());