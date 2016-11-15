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
  function publishRowChanges(){
    $rootScope.$broadcast('UpdateTableBody',{
      body:fact.body,
    });
  }
  function subscribeRowChanges(callback){
    $rootScope.$on('UpdateTableBody',function(event,data){
      callback(data.body);
    })
  }

  //public columnName functions
  function deleteColumn(index,callback){
    var name = fact.columnData[index].name;
    fact.body.forEach(function(rowData,index){
      delete fact.body[index][name];
    })
    console.log(fact.body);
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
  function getColumns(callback){
    subscribeColumnChanges(function(columnData){
      callback(fact.columnData);
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

  //row operations
  function addRow(rowData){
    fact.body.push(rowData);
    publishRowChanges();
  }
  function getAllRows(callback){
    subscribeRowChanges(function(body){
      callback(fact.body);
    })
  }
  function deleteRow(index,callback){
    fact.body.splice(index,1);
    callback(fact.body);
    publishRowChanges();
  }

  return {
    deleteColumn:deleteColumn,
    addColumn:addColumn,
    setColumns:setColumns,
    getColumns:getColumns,
    getCheckedColumnNames:getCheckedColumnNames,
    getAllColumnNames:getAllColumnNames,
    addRow:addRow,
    getAllRows:getAllRows,
    deleteRow:deleteRow
  }
}])
