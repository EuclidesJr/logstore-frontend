import _ from 'lodash';
import $ from "jquery";

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap-table' ;
import 'bootstrap-table/dist/bootstrap-table.min.css';
import 'bootstrap-table/dist/locale/bootstrap-table-pt-BR.js';

import LogstoreService from "../src/service/LogstoreService";
import { left } from '@popperjs/core';

import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import logoImage from './assets/cingo-logo.png';
import faviocon from './assets/cropped-Favicon.png';

const logstoreService = new LogstoreService();

function operateFormatter(value, row, index) {
  return [
    '<a class="btn btn-secondary remove" style="text-decoration:none" href="javascript:void(0)" title="Remover">',
    'Remover',
    '</a>'
  ].join('')
}

window.operateEvents = {
  'click .remove': function (e, value, row, index) {
    logstoreService.delete(row.id,  () => {
      toastr.success("Sucesso", "Dados inseridos com sucesso", {timeOut: 3000, closeMethod: 'fadeOut'});
      init();
    },
    errorCallback => {
      toastr.error(errorCallback, "Erro ao buscar dados", {timeOut: 3000, closeMethod: 'fadeOut'});
    });
  }
}

function initTable(data) {
  $('#table').bootstrapTable('destroy').bootstrapTable({
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
    },
    {
      field: 'operate',
      title: 'Ações',
      align: 'center',
      events: window.operateEvents,
      formatter: operateFormatter
    }],
    data: data,
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
}

function init() {
  logstoreService.getAll(successCallback => {
    initTable(successCallback);
  },
  errorCallback => {
    toastr.error(errorCallback, "Erro ao buscar dados", {timeOut: 3000, closeMethod: 'fadeOut'});
  });
}

function clearModal() {
  $('#new-log-dialog').modal('hide');
  $('#content').val('');
  $('#occurrences').val('');
}

$(function() {
  $("img").prop("src", logoImage);
  $("#favicon-link").prop("href", faviocon);
  init();
});

window.clearModal = clearModal;

$('#logForm').on('submit', function(e){
  e.preventDefault();
  const data = {
    'content': $('#content').val(),
    'occurrences': $('#occurrences').val()
  }
  logstoreService.save(data, () => {
    toastr.success("Sucesso", "Dados inseridos com sucesso", {timeOut: 3000, closeMethod: 'fadeOut'});
    clearModal();
    init();
  },
  errorCallback => {
    toastr.error(errorCallback, "Erro ao buscar dados", {timeOut: 3000, closeMethod: 'fadeOut'});
  });
})