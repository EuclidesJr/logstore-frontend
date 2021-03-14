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

const logstoreService = new LogstoreService();

function init() {
  $("img").prop("src", logoImage);
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
    toastr.error(errorCallback, "Erro ao buscar dados", {timeOut: 3000, closeMethod: 'fadeOut'});
  });
}

function clearModal() {
  $('#new-log-dialog').modal('hide');
  $('#content').val('');
  $('#occurrences').val('');
}

$(function() {
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
  },
  errorCallback => {
    toastr.error(errorCallback, "Erro ao buscar dados", {timeOut: 3000, closeMethod: 'fadeOut'});
  });
})