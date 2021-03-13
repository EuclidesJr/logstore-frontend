import _ from 'lodash';
import $ from "jquery";
import jqueryValidation from 'jquery-validation';

import Popper from 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-table/dist/bootstrap-table.min.css'

import 'bootstrap-table' 
import 'bootstrap-table/dist/locale/bootstrap-table-pt-BR.js' 

import LogstoreService from "../src/service/LogstoreService";
import { left } from '@popperjs/core';

const logstoreService = new LogstoreService();

$(function() {
  logstoreService.getAll(successCallback => {
    $('#table').bootstrapTable({
      search: true,
      showColumns: false,
      locale: 'pt-BR',
      columns: [{
        field: 'id',
        title: 'ID'
      }, {
        field: 'content',
        sortable: false,
        title: 'Conteúdo'
      }, {
        field: 'occurrences',
        sortable: true,
        order: 'desc',
        title: 'Ocorrências'
      }],
      data: successCallback,
      buttons: [
        {
          text: 'Adicionar',
          icon: 'fa-plus-square',
          attributes: {
            title: 'Adicionar novo log'
          },
          event: {
            'click': () => { $('#new-log-dialog').modal('show'); }
          }
        },
      ],
      showButtonText: true,
      buttonsAlign: left,
      buttonsClass: 'primary'
    })
  },
  errorCallback => {
    console.log(errorCallback);
  });
});

$('#bnt-cancel').on('click', function(e){
  $('#new-log-dialog').modal('hide');
  $('#content').val('');
  $('#occurrences').val('');
});

$('#logForm').on('submit', function(e){
  e.preventDefault();
  console.log("error, result");
  const data = {
    'content': $('#content').val(),
    'occurrences': $('#occurrences').val()
  }
  logstoreService.save(data, successCallback => {
    console.log(successCallback);
    $('#new-log-dialog').modal('hide');
    $('#content').val('');
    $('#occurrences').val('');
  },
  errorCallback => {
    console.log(errorCallback);
  });
})