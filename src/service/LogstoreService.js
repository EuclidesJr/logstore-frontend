const RESOURCE_NAME = 'http://localhost:8080/logstore-0.0.1-SNAPSHOT';

export default class LogstoreService {
  getAll(successCallback, errorCallback) {
    $.get( `${RESOURCE_NAME}/log` )
      .done(function( data ) {
        successCallback( data );
      })
      .fail(function(error) {
        errorCallback( error );
      });
  }

  save(log, successCallback, errorCallback) {
    $.post({
      url: `${RESOURCE_NAME}/log`,
      data: JSON.stringify(log),
      crossDomain: true,
      contentType: 'application/json',
    })
    .done(function( data ) {
      console.log(data);
      successCallback( data );
    })
    .fail(function(error) {
      console.log(error);
      errorCallback( error );
    });
  }
}