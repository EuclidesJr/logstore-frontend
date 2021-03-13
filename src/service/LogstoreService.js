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
}