angular.module('tableDisplay').component('tableDisplay',{
  templateUrl:'components/tableDisplay/template.html',
  controller:['TableDataService',function(TableDataService){
    var ctrl = this;
    ctrl.headings = [];
    ctrl.body = [];
    TableDataService.getCheckedColumnNames(function(headings){
      ctrl.headings = headings;
    })
    TableDataService.getAllRows(function(body){
      ctrl.body = body;
    })
    ctrl.deleteRow = function(index){
      TableDataService.deleteRow(index,function(body){
        // ctrl.body = body;
      })
    }
    ctrl.editRow = function(index){
      //get data from index and pass it to rowBuilder via TableDataService
      //rowBuilder updates TableDataService in return
    }
  }],
})
