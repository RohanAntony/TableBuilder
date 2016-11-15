angular.module('columnBuilder').component('columnBuilder',{
  templateUrl:'components/columnBuilder/template.html',
  controller:['$window','TableDataService',function($window,TableDataService){
    var ctrl = this;
    ctrl.columnData = [];
    TableDataService.getColumns(function(columnData){
      ctrl.columnData = columnData;
    })
    ctrl.rePublish = function(){
      TableDataService.setColumns(ctrl.columnData);
    }
    ctrl.deleteColumn = function(index){
      TableDataService.deleteColumn(index,function(columns){
        ctrl.columnData = columns;
      })
    }
    ctrl.addNewColumn = function(){
      let name = $window.prompt('Enter new column name!!!');
      if(name == null){
        ctrl.message = 'No new column was added!!';
        ctrl.showMessage = true;
      }else{
        ctrl.message = '';
        ctrl.showMessage = false;
        TableDataService.addColumn({
          checked:true,
          name:name
        },function(columnData){ //callback
          TableDataService.getColumns(function(columnData2){
            ctrl.columnData = columnData2;
          })
        })
      }
    }
  }]
})
