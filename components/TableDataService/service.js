angular.module('TableDataService').factory('TableDataService',['$rootScope',function($rootScope){
  let fact = this;
  let columnData;  //stores all the column as objects
  let body;    //stores each row as an object with key as columnNames

  //private functions
  (function(){
    fact.columnData = [];
    fact.body = [];
  })(); //constructor function
  function publishColumnChanges(){
    $rootScope.$broadcast('UpdateTableHeadings',{
      columnData:fact.columnData,
    });
  }
  function subscribeColumnChanges(callback){
    $rootScope.$on('UpdateTableHeadings',function(event,data){
      callback(data.columnData);
    })
  }

  //public columnName functions
  function deleteColumn(index,callback){
    console.log(fact.columnData);
    fact.columnData.splice(index,1);
    callback(fact.columnData);
    publishColumnChanges();
  }
  function addColumn(column,callback){
    fact.columnData.push(column);
    callback(fact.columnData);
    publishColumnChanges();
  }
  function setColumns(columnData){
    fact.columnData = columnData;
    publishColumnChanges();
  }
  function getColumns(columnData){
    subscribeColumnChanges(function(columnData){
      fact.columnData = columnData;
    })
  }
  function getCheckedColumnNames(callback){
    subscribeColumnChanges(function(columnData){
      let names = [];
      columnData.forEach(function(column){
        if(column.checked){
          names.push(column.name);
        }
      })
      callback(names);
    })
  }
  function getAllColumnNames(callback){
    subscribeColumnChanges(function(columnData){
      let names = [];
      columnData.forEach(function(column){
        names.push(column.name);
      })
      callback(names);
    })
  }

  return {
    deleteColumn:deleteColumn,
    addColumn:addColumn,
    setColumns:setColumns,
    getColumns:getColumns,
    getCheckedColumnNames:getCheckedColumnNames,
    getAllColumnNames:getAllColumnNames,
  }
}])
