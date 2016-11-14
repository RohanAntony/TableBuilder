angular.module('tableDisplay').component('tableDisplay',{
  templateUrl:'components/tableDisplay/template.html',
  controller:['TableDataService',function(TableDataService){
    var ctrl = this;
    ctrl.headings = [];
    ctrl.body = [];
    TableDataService.getCheckedColumnNames(function(headings){
      console.log(headings);
      ctrl.headings = headings;
    })
  }],
})
