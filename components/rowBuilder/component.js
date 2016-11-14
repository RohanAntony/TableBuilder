angular.module('rowBuilder').component('rowBuilder',{
  templateUrl:'components/rowBuilder/template.html',
  controller:['TableDataService',function(TableDataService){
    var ctrl = this;
    ctrl.columnNames = [];
    ctrl.row = {};
    TableDataService.getAllColumnNames(function(columnNames){
      ctrl.columnNames = columnNames;
    })
    ctrl.addRow = function(){
      //add new row to the table
    }
  }]
})
