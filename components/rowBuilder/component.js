angular.module('rowBuilder').component('rowBuilder',{
  templateUrl:'components/rowBuilder/template.html',
  controller:['TableDataService',function(TableDataService){
    var ctrl = this;
    ctrl.columnNames = [];
    ctrl.row = {};
    TableDataService.getAllColumnNames(function(columnNames){
      ctrl.columnNames = columnNames;
    })
    ctrl.addRow = function(rowObject){
      var row = {};
      ctrl.columnNames.forEach(function(column){
        row[column] = ctrl.row[column];
        ctrl.row[column] = '';
      })
      TableDataService.addRow(row);
    }
  }]
})
