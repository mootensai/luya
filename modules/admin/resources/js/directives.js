(function() {
    "use strict";

    // form.js
    zaa.directive("zaaLink", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "placeholder": "@placeholder"
            },
            template: function() {
                return '<update-form-redirect data="model"></update-form-redirect>';
            }
        }
    });

    zaa.directive("zaaInjector", function($compile) {
        return {
            restrict: "E",
            replace: true,
            transclude: false,
            scope: {
                "dir": "=",
                "model": "=",
                "options": "=",
                "label": "@label",
                "grid": "@grid",
                "fieldid": "@fieldid",
                "fieldname": "@fieldname",
                "placeholder": "@placeholder",
                "initvalue": "@initvalue"
            },
            link: function($scope, $element) {
                var elmn = $compile(angular.element('<' + $scope.dir + ' options="options" initvalue="{{initvalue}}" fieldid="{{fieldid}}" fieldname="{{fieldname}}" placeholder="{{placeholder}}" model="model" label="{{label}}" i18n="{{grid}}" />'))($scope);
                $element.replaceWith(elmn);
            },
        }
    });
    
    zaa.directive("zaaWysiwyg", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            template: function() {
                return '<textarea ng-wig="model" buttons="bold, italic, link, list1, list2" name="{{name}}"></textarea>';
            }
        }
    });
    
    zaa.directive("zaaNumber", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "placeholder": "@placeholder"
            }, link: function($scope) {
                $scope.$watch(function() { return $scope.model }, function(n, o) {
                    if(angular.isNumber($scope.model)) {
                        $scope.isValid = true;
                    } else {
                        $scope.isValid = false;
                    }
                })
            }, template: function() {
                return '<div class="input input--text" ng-class="{\'input--hide-label\': i18n}"><label class="input__label" for="{{id}}">{{label}}</label><div class="input__field-wrapper"><input id="{{id}}" name="{{name}}" ng-model="model" type="number" min="0" class="input__field" ng-class="{\'invalid\' : !isValid }" placeholder="{{placeholder}}" /></div></div>';
            }
        }
    });
    
    zaa.directive("zaaText", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "placeholder": "@placeholder"
            },
            template: function() {
                return '<div class="input input--text" ng-class="{\'input--hide-label\': i18n}"><label class="input__label" for="{{id}}">{{label}}</label><div class="input__field-wrapper"><input id="{{id}}" maxlength="255" name="{{name}}" ng-model="model" type="text" class="input__field" placeholder="{{placeholder}}" /></div></div>';
            }
        }
    });
    
    zaa.directive("zaaTextarea", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "placeholder": "@placeholder"
            },
            template: function() {
                return '<div class="input input--textarea" ng-class="{\'input--hide-label\': i18n}"><label class="input__label" for="{{id}}">{{label}}</label><div class="input__field-wrapper"><textarea id="{{id}}" name="{{name}}" ng-model="model" type="text" class="input__field" placeholder="{{placeholder}}"></textarea></div></div>';
            }
        }
    });
    
    zaa.directive("zaaPassword", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            template: function() {
                return '<div class="input input--text" ng-class="{\'input--hide-label\': i18n}"><label class="input__label" for="{{id}}">{{label}}</label><div class="input__field-wrapper"><input id="{{id}}" name="{{name}}" ng-model="model" type="password" class="input__field" placeholder="{{placeholder}}" /></div></div>';
            }
        }
    });
    
    zaa.directive("zaaSelect", function($timeout){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "initvalue": "@initvalue"
            },
            link: function(scope) {
                $timeout(function(){
                    scope.$watch(function() { return scope.model }, function(n, o) {
                        if (n === undefined && o === undefined) {
                            if (jQuery.isNumeric(scope.initvalue)) {
                                scope.initvalue = parseInt(scope.initvalue);
                            }
                            scope.model = scope.initvalue;
                        }
                    })
                });
            },
            template: function() {
                return '<div class="input input--select" ng-class="{\'input--hide-label\': i18n}"><label class="input__label" for="{{id}}">{{label}}</label><select name="{{name}}" id="{{id}}" class="input__field browser-default" ng-options="item.value as item.label for item in options" ng-model="model"></select></div>';
            }
        }
    });
    
    /**
     * options = {'true-value' : 1, 'false-value' : 0};
     */
    zaa.directive("zaaCheckbox", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "label": "@label"
            },
            controller: function($scope) {
                if ($scope.options === null) {
                    $scope.valueTrue = 1;
                    $scope.valueFalse = 0;
                } else {
                    $scope.valueTrue = $scope.options['true-value'];
                    $scope.valueFalse = $scope.options['false-value'];  
                }
            },
            template: function() {
                return '<div class="input input--single-checkbox">' +
                            '<input id="{{id}}" name="{{name}}" ng-true-value="{{valueTrue}}" ng-false-value="{{valueFalse}}" ng-model="model" type="checkbox" />' +
                            '<label for="{{id}}" class="input__label">{{label}}</label>' +
                        '</div>';
            }
        }
    });
    
    /** 
     * options arg object:
     * 
     * options.items[] = { "id" : 1, "label" => 'Label for Value 1' }
     * 
     * new
     * 
     * options.items[] = { "value" : 1, "label" => 'Label for Value 1' }
     */
    zaa.directive("zaaCheckboxArray", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname",
                "label": "@label"
            },
            controller: function($scope, $filter) {
                
                if ($scope.model == undefined) {
                    $scope.model = [];
                }
                
                $scope.searchString = '';
                
                $scope.options = [];
                
                $scope.$watch('options', function(n, o) {
                	if (n.hasOwnProperty('items')) {
                    	$scope.optionitems = n.items;
                    }
                });
                
                $scope.filtering = function() {
                    $scope.optionitems = $filter('filter')($scope.options.items, $scope.searchString);
                }
                
                $scope.toggleSelection = function (value) {
                    for (var i in $scope.model) {
                        if ($scope.model[i]["id"] == value.value) {
                            $scope.model.splice(i, 1);
                            return;
                        }
                    }
                    $scope.model.push({ id: value.value});
                }
                
                $scope.isChecked = function(item) {
                    for (var i in $scope.model) {
                        if ($scope.model[i]["id"] == item.value) {
                            return true;
                        }
                    }
                    return false;
                }
            },
            link: function(scope) {
                scope.random = Math.random().toString(36).substring(7);
            },
            template: function() {
                return '<div class="input input--multiple-checkboxes"  ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<input class="input__searchfield" type="text" ng-change="filtering()" ng-model="searchString" placeholder="Suchen" /> {{optionitems.length}} ' + i18n['js_dir_till'] + '{{options.items.length}}'+
                                '<div ng-repeat="(k, item) in optionitems track by k">' +
                                    '<input type="checkbox" ng-checked="isChecked(item)" id="{{random}}_{{k}}" ng-click="toggleSelection(item)" />' +
                                    '<label for="{{random}}_{{k}}">{{item.label}}</label>' +
                                '</div>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaDatetime", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "id": "@fieldid",
                "name": "@fieldname",
                "i18n": "@i18n"
            },
            controller: function($scope) {
                
                var date = new Date();
                
                $scope.slicer = function(value) {
                    return ('0' + value).slice(-2);
                };
                
                $scope.placeholders = {
                    "day": $scope.slicer(date.getDate()),
                    "month": $scope.slicer(date.getMonth() + 1),
                    "year": date.getFullYear(),
                    "hour": $scope.slicer(date.getHours()),
                    "minute": $scope.slicer(date.getMinutes())
                };

                $scope.reform = function() {
                    if ($scope.year != null && $scope.month != null && $scope.day != null && $scope.hour != null && $scope.min != null) {
                        var date = new Date(parseInt($scope.year, 10), parseInt(($scope.month-1), 10), parseInt($scope.day, 10), parseInt($scope.hour, 10), parseInt($scope.min, 10));
                        var mil = date.getTime();
                        $scope.model = (mil/1000);
                    }
                };

                $scope.now = function() {
                    var date = new Date();
                    $scope.day = $scope.slicer(date.getDate());
                    $scope.month = $scope.slicer(date.getMonth() + 1);
                    $scope.year = date.getFullYear();
                    $scope.min = $scope.slicer(date.getMinutes());
                    $scope.hour = $scope.slicer(date.getHours());
                    $scope.reform();
                };
                
                $scope.$watch(function() { return $scope.model }, function(n, o) {
                    if (n !== undefined && n != null) {
                        var date = new Date(n*1000);
                        $scope.day = $scope.slicer(date.getDate());
                        $scope.month = $scope.slicer(date.getMonth() + 1);
                        $scope.year = date.getFullYear();
                        $scope.min = $scope.slicer(date.getMinutes());
                        $scope.hour = $scope.slicer(date.getHours());
                    }
                });
            },
            template: function() {
                return '<div class="input input--date"  ng-class="{\'input--hide-label\': i18n}">' +
                        '<label class="input__label">{{label}}</label>' +
                        '<div class="input__field-wrapper">' +
                                '<input ng-blur="reform()" type="text" ng-model="day" placeholder="{{placeholders.day}}" class="input__field" /><span class="input__divider">.</span>' +
                                '<input ng-blur="reform()" type="text" ng-model="month" placeholder="{{placeholders.month}}" class="input__field" /><span class="input__divider">.</span>' +
                                '<input ng-blur="reform()" type="text" ng-model="year" placeholder="{{placeholders.year}}" class="input__field" style="width:100px;" /><span class="input__divider input__divider--centered input__divider--icon"><i class="material-icons">access_time</i></span>' +
                                '<input ng-blur="reform()" type="text" ng-model="hour" placeholder="{{placeholders.hour}}" class="input__field" /><span class="input__divider input__divider--centered">:</span>' +
                                '<input ng-blur="reform()" type="text" ng-model="min" placeholder="{{placeholders.minute}}" class="input__field" />' +
                                '<button class="input__button btn btn--small grey darken-1" type="button" ng-click="now()">' + i18n['js_dir_set_date'] + '</button>' +
                            '</div>' +
                       '</div>';
            }
        }
    });
    
    zaa.directive("zaaDate", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "id": "@fieldid",
                "name": "@fieldname",
                "i18n": "@i18n"
            },
            controller: function($scope) {
                
                var date = new Date();
                
                $scope.slicer = function(value) {
                    return ('0' + value).slice(-2);
                };
                
                $scope.placeholders = {
                    "day": $scope.slicer(date.getDate()),
                    "month": $scope.slicer(date.getMonth() + 1),
                    "year": date.getFullYear()
                };
                
                $scope.reform = function() {
                    if ($scope.year != null && $scope.month != null && $scope.day != null) {
                        var date = new Date(parseInt($scope.year, 10), parseInt(($scope.month-1), 10), parseInt($scope.day, 10));
                        var mil = date.getTime();
                        $scope.model = (mil/1000);
                    }
                };
                
                $scope.today = function() {
                    var date = new Date();
                    $scope.day = $scope.slicer(date.getDate()),
                    $scope.month = $scope.slicer(date.getMonth() + 1);
                    $scope.year = date.getFullYear();
                    $scope.reform();
                };
                
                $scope.$watch(function() { return $scope.model }, function(n, o) {
                    if (n !== undefined && n != null) {
                        var date = new Date(n*1000);
                        $scope.day = $scope.slicer(date.getDate()),
                        $scope.month = $scope.slicer(date.getMonth() + 1);
                        $scope.year = date.getFullYear();
                    }
                });
            },
            template: function() {
                return '<div class="input input--date" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<input ng-blur="reform()" type="text" ng-model="day" placeholder="{{placeholders.day}}" class="input__field" /><span class="input__divider">.</span>' +
                                '<input ng-blur="reform()" type="text" ng-model="month" placeholder="{{placeholders.month}}" class="input__field" /><span class="input__divider">.</span>' +
                                '<input ng-blur="reform()" type="text" ng-model="year" placeholder="{{placeholders.year}}" class="input__field" style="width:100px;" />' +
                                '<button class="input__button btn btn--small grey darken-1" type="button" ng-click="today()">' + i18n['js_dir_set_date'] + '</button>' +
                            '</div>'
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaTable", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            controller: function($scope) {
                
                if ($scope.model == undefined) {
                    $scope.model = [{0:''}];
                }
                
                $scope.addColumn = function() {
                    var len = 0;
                    for (var o in $scope.model[0]) {
                        len++;
                    }
                    
                    for(var i in $scope.model) {
                         $scope.model[i][len] = '';
                    }
                }
                
                $scope.addRow = function() {
                    var elmn = $scope.model[0];
                    var ins = {};
                    for (var i in elmn) {
                        ins[i] = '';
                    }
                    
                    $scope.model.push(ins);
                }
                
                $scope.removeColumn = function(key) {
                    for (var i in $scope.model) {
                        var item = $scope.model[i];
                        if(item instanceof Array) {
                            item.splice(key, 1);
                        } else {
                            delete item[key];
                        }
                    }
                }

                $scope.moveLeft = function(index) {
                    index = parseInt(index);
                    for (var i in $scope.model) {
                        var oldValue = $scope.model[i][index];
                        $scope.model[i][index] = $scope.model[i][index-1];
                        $scope.model[i][index-1] = oldValue;
                    }
                }

                $scope.moveRight = function(index) {
                    index = parseInt(index);
                    for (var i in $scope.model) {
                        var oldValue = $scope.model[i][index];
                        $scope.model[i][index] = $scope.model[i][index+1];
                        $scope.model[i][index+1] = oldValue;
                    }
                }

                $scope.moveUp = function(index) {
                    index = parseInt(index);
                    var oldRow = $scope.model[index];
                    $scope.model[index] = $scope.model[index-1];
                    $scope.model[index-1] = oldRow;
                }

                $scope.moveDown = function(index) {
                    index = parseInt(index);
                    var oldRow = $scope.model[index];
                    $scope.model[index] = $scope.model[index+1];
                    $scope.model[index+1] = oldRow;
                }
                
                $scope.removeRow = function(key) {
                    $scope.model.splice(key, 1);
                }

                $scope.showRightButton = function(index) {
                    if (parseInt(index) < Object.keys($scope.model[0]).length - 1) {
                        return true;
                    }
                    return false;
                }
                $scope.showDownButton = function(index) {
                    if (parseInt(index) < Object.keys($scope.model).length - 1) {
                        return true;
                    }
                    return false;
                }
            },
            template: function() {
                return '<div class="zaa-table__wrapper">'+
                            '<h5 ng-show="label">{{label}}</h5>' +
                            '<table class="zaa-table">'+
                                '<thead>'+
                                    '<tr>'+
                                        '<td width="30"></td>'+
                                        '<td data-ng-repeat="(hk, hr) in model[0] track by hk">'+
                                            '<div class="zaa-table__cell-toolbar-top">'+
                                                '<button ng-show="{{hk > 0}}" ng-click="moveLeft(hk)" class="btn zaa-table__btn zaa-table__btn--cellmove zaa-table__btn--cellmove-left"><i class="material-icons" style="transform: rotate(180deg);">play_arrow</i></button>' +
                                                '<div class="zaa-table__cell-toolbar-center">'+
                                                    '<button type="button" ng-click="removeColumn(hk)" class="btn-floating zaa-table__btn zaa-table__btn--del" data-drag="true">'+
                                                        '<i class="material-icons">delete</i>'+
                                                    '</button>'+
                                                '</div>'+
                                                '<button ng-click="moveRight(hk)" ng-show="showRightButton(hk)" class="btn zaa-table__btn zaa-table__btn--cellmove zaa-table__btn--cellmove-right"><i class="material-icons">play_arrow</i></button>' +
                                            '</div>'+                                           
                                        '</td>'+
                                    '</tr>'+
                                '</thead>' +
                                '<tr data-ng-repeat="(key, row) in model track by key">'+
                                    '<td>'+                                                  
                                        '<button type="button" class="btn-floating zaa-table__btn zaa-table__btn--del" ng-click="removeRow(key)">'+
                                            '<i class="material-icons">delete</i>'+
                                        '</button>'+
                                        '<div class="zaa-table__cell-toolbar-side">'+
                                            '<button ng-show="{{key > 0}}" ng-click="moveUp(key)" class="btn zaa-table__btn zaa-table__btn--cellmove zaa-table__btn zaa-table__btn--cellmove-top"><i class="material-icons" style="transform: rotate(270deg);">play_arrow</i></button>' +
                                            '<button ng-show="showDownButton(key)" ng-click="moveDown(key)" class="btn zaa-table__btn zaa-table__btn--cellmove zaa-table__btn zaa-table__btn--cellmove-bottom"><i class="material-icons" style="transform: rotate(90deg);">play_arrow</i></button><br/>' +
                                        '</div>'+
                                    '</td>'+
                                    '<td data-ng-repeat="(field,value) in row track by field">'+
                                        '<input type="text" ng-model="model[key][field]"class="zaa-table__input"/>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                            '<button ng-click="addRow()" type="button" class="[ waves-effect waves-light ] btn btn--small">'+i18n['js_dir_table_add_row']+' <i class="material-icons right">add</i></button>'+
                            '<button ng-click="addColumn()" type="button" style="float:right;" class="[ waves-effect waves-light ] btn btn--small">'+i18n['js_dir_table_add_column']+' <i class="material-icons right">add</i></button>'+
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaFileUpload", function($compile){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            template: function() {
                return '<div class="input input--file-upload" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<storage-file-upload ng-model="model"></storage-file-upload>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaImageUpload", function($compile){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            template: function() {
                return '<div class="input input--image-upload" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<storage-image-upload options="options" ng-model="model"></storage-image-upload>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaImageArrayUpload", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            controller: function($scope) {
                
                if ($scope.model == undefined) {
                    $scope.model = [];
                }
                
                $scope.add = function() {
                    $scope.model.push({ imageId : 0, caption : '' });
                };
                
                $scope.remove = function(key) {
                    $scope.model.splice(key, 1);
                };
            },
            template: function() {
                return '<div class="input input--image-array imagearray" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<p class="list__no-entry" ng-hide="model.length > 0">'+i18n['js_dir_no_selection']+'</p>' +
                                '<div ng-repeat="(key,image) in model track by key" class="row list__item">' +

                                    '<div class="list__left row">' +
                                        '<div class="col s8">' +
                                            '<storage-image-upload ng-model="image.imageId" options="options"></storage-image-upload>' +
                                        '</div>' +
                                        '<div class="input-field col s4">' +
                                            '<textarea ng-model="image.caption" class="materialize-textarea"></textarea>' +
                                            '<label>'+i18n['js_dir_image_description']+'</label>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="list__right">' +
                                        '<button type="button" class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)" tabindex="-1"><i class="material-icons">remove</i></button>' +
                                    '</div>' +

                                '</div>' +
                                '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ waves-effect waves-circle waves-light ]"><i class="material-icons">add</i></button>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaFileArrayUpload", function(){
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            controller: function($scope, $element, $timeout) {
                
                if ($scope.model == undefined) {
                    $scope.model = [];
                }
    
                $scope.add = function() {
                    $scope.model.push({ fileId : 0, caption : '' });
                };
                
                $scope.remove = function(key) {
                    $scope.model.splice(key, 1);
                };
    
            },
            template: function() {
                return '<div class="input input--file-array filearray" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<p class="list__no-entry" ng-hide="model.length > 0">'+i18n['js_dir_no_selection']+'</p>' +
                                '<div ng-repeat="(key,file) in model track by key" class="row list__item">' +

                                    '<div class="list__left row">' +
                                        '<div class="filearray__upload col s8">' +
                                            '<storage-file-upload ng-model="file.fileId"></storage-file-upload>' +
                                        '</div>' +
                                        '<div class="input-field col s4">' +
                                            '<input type="text" ng-model="file.caption" class="filearray__description-input" />' +
                                            '<label>'+i18n['js_dir_image_description']+'</label>' +
                                        '</div>' +
                                    '</div>' +

                                    '<div class="list__right">' +
                                        '<button class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" ng-click="remove(key)" tabindex="-1"><i class="material-icons">remove</i></button>' +
                                    '</div>' +
                                '</div>' +
                                '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ waves-effect waves-circle waves-light ]"><i class="material-icons">add</i></button>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    
    zaa.directive("zaaListArray", function() {
        return {
            restrict: "E",
            scope: {
                "model": "=",
                "options": "=",
                "label": "@label",
                "i18n": "@i18n",
                "id": "@fieldid",
                "name": "@fieldname"
            },
            controller: function($scope, $element, $timeout) {
    
                if ($scope.model == undefined) {
                    $scope.model = [];
                }
                
                $scope.add = function() {
                    $scope.model.push({ value : '' });
                    $scope.setFocus();
                };
                
                $scope.remove = function(key) {
                    $scope.model.splice(key, 1);
                };
                
                $scope.refactor = function(key, row) {
                    if (key !== ($scope.model.length -1)) {
                        if (row['value'] == "") {
                            $scope.remove(key);
                        }
                    }
                };
    
                $scope.setFocus = function() {
                    $timeout(function() {
                        var input = $element.children('.list').children('.list__item:last-of-type').children('.list__left').children('input');
    
                        if(input.length == 1) {
                            input[0].focus();
                        }
                    }, 50);
                }

                $scope.moveUp = function(index) {
                    index = parseInt(index);
                    var oldRow = $scope.model[index];
                    $scope.model[index] = $scope.model[index-1];
                    $scope.model[index-1] = oldRow;
                }

                $scope.moveDown = function(index) {
                    index = parseInt(index);
                    var oldRow = $scope.model[index];
                    $scope.model[index] = $scope.model[index+1];
                    $scope.model[index+1] = oldRow;
                }

                $scope.showDownButton = function(index) {
                    if (parseInt(index) < Object.keys($scope.model).length - 1) {
                        return true;
                    }
                    return false;
                }
    
            },
            template: function() {
                return '<div class="input input--list list" ng-class="{\'input--hide-label\': i18n}">' +
                            '<label class="input__label">{{label}}</label>' +
                            '<div class="input__field-wrapper">' +
                                '<p class="list__no-entry" ng-hide="model.length > 0">'+i18n['js_dir_no_selection']+'</p>' +
                                '<div ng-repeat="(key,row) in model track by key" class="list__item">' +
                                    '<div class="list__left" style="width:calc(100% - 140px)">' +
                                        '<input class="list__input" type="text" ng-model="row.value" />' +
                                    '</div>' +
                                    '<div class="list__right" style="width:130px">' +
                                        '<button ng-show="{{key > 0}}" ng-click="moveUp(key)" style="margin-top: 10px"><i class="material-icons" style="transform: rotate(270deg);">play_arrow</i></button>' +
                                        '<button ng-show="showDownButton(key)" ng-click="moveDown(key)"><i class="material-icons" style="transform: rotate(90deg);">play_arrow</i></button>' +
                                        '<button class="btn-floating left list__delete-button [ red lighten-1 ][ waves-effect waves-circle waves-light ]" style="margin-right:10px" ng-click="remove(key)" tabindex="-1"><i class="material-icons">remove</i></button>' +
                                    '</div>' +
                                '</div>' +
                                '<button ng-click="add()" type="button" class="btn-floating left list__add-button [ waves-effect waves-circle waves-light ]"><i class="material-icons">add</i></button>' +
                            '</div>' +
                        '</div>';
            }
        }
    });
    // storage.js
    
    zaa.directive('storageFileUpload', function($http, ServiceFilesData, $filter) {
        return {
            restrict : 'E',
            scope : {
                ngModel : '='
            },
            link : function(scope) {
                
                // ServiceFilesData inhertiance
                
                scope.filesData = ServiceFilesData.data;
                
                scope.$on('service:FilesData', function(event, data) {
                    scope.filesData = data;
                });
                
                // controller logic
                
                scope.modal = true;
                scope.fileinfo = null;
                
                scope.select = function(fileId) {
                    scope.toggleModal();
                    scope.ngModel = fileId;
                }
                
                scope.reset = function() {
                	scope.ngModel = 0;
                	scope.fileinfo = null;
                }
                
                scope.toggleModal = function() {
                    scope.modal = !scope.modal;
                }
                
                scope.$watch(function() { return scope.ngModel }, function(n, o) {
                    if (n != 0 && n != null && n !== undefined) {
                        var filtering = $filter('filter')(scope.filesData, {id: n}, true);
                        if (filtering && filtering.length == 1) {
                            scope.fileinfo = filtering[0];
                        }
                    }
                });
            },
            templateUrl : 'storageFileUpload'
        }
    });
    
    zaa.directive('storageImageThumbnailDisplay', function(ServiceImagesData, ServiceFilesData) {
        return {
            restrict: 'E',
            scope: {
                imageId: '@imageId'
            },
            controller: function($scope, $filter) {
                
                // ServiceFilesData inheritance
                
                $scope.filesData = ServiceFilesData.data;
                
                $scope.$on('service:FilesData', function(event, data) {
                    $scope.filesData = data;
                });
                
                // ServiceImagesData inheritance
                
                $scope.imagesData = ServiceImagesData.data;
                
                $scope.$on('service:ImagesData', function(event, data) {
                    $scope.imagesData = data;
                });
                
                // controller logic
                
                $scope.$watch(function() { return $scope.imageId }, function(n, o) {
                    if (n != 0 && n !== undefined) {
                        
                        var filtering = $filter('findidfilter')($scope.imagesData, n, true);
                        
                        var file = $filter('findidfilter')($scope.filesData, filtering.fileId, true);
                        
                        $scope.imageSrc = file.thumbnail.source;
                    }
                });
                
                $scope.imageSrc = null;
            },
            template: function() {
                return '<div ng-show="imageSrc!==false"><img ng-src="{{imageSrc}}" /></div>';
            }
        }
    });
    
    zaa.directive('storageImageUpload', function($http, $filter, ServiceFiltersData, ServiceImagesData, AdminToastService) {
        return {
            restrict : 'E',
            scope : {
                ngModel : '=',
                options : '=',
            },
            link : function(scope) {
    
                // ServiceImagesData inheritance
                
                scope.imagesData = ServiceImagesData.data;
                
                scope.$on('service:ImagesData', function(event, data) {
                    scope.imagesData = data;
                });
                
                scope.imagesDataReload = function() {
                    return ServiceImagesData.load(true);
                }
                
                // ServiceFiltesrData inheritance
                
                scope.filtersData = ServiceFiltersData.data;
                
                scope.$on('service:FiltersData', function(event, data) {
                    scope.filtersData = data;
                });
                
                // controller logic
                
                scope.noFilters = function() {
                    if (scope.options) {
                        return scope.options.no_filter;
                    }
                }
                
                scope.imageLoading = false;
                
                scope.fileId = 0;
                
                scope.filterId = 0;
                
                scope.imageinfo = null;
                
                scope.filterApply = function() {
                    var items = $filter('filter')(scope.imagesData, {fileId: scope.fileId, filterId: scope.filterId}, true);
                    if (items && items.length == 0) {
                        scope.imageLoading = true;
                        // image does not exists make request.
                        $http.post('admin/api-admin-storage/image-upload', $.param({ fileId : scope.fileId, filterId : scope.filterId }), {
                            headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        }).success(function(success) {
                            if (!success.error) {
                                scope.imagesDataReload().then(function(r) {
                                    scope.ngModel = success.id;
                                    AdminToastService.success(i18n['js_dir_image_upload_ok'], 2000);
                                    scope.imageLoading = false;
                                });
                            }
                        }).error(function(error) {
                        	AdminToastService.error(i18n['js_dir_image_filter_error'], 7000);
                            scope.imageLoading = false;
                        });
                    } else {
                        var item = items[0];
                        scope.ngModel = item.id
                        scope.imageinfo = item;
                    }
                };
                
                scope.$watch(function() { return scope.filterId }, function(n, o) {
                    if (n != null && n !== undefined && scope.fileId !== 0 && n !== o && n != o) {
                        scope.filterApply();
                    }
                });
                
                scope.$watch(function() { return scope.fileId }, function(n, o) {
                	if (n !== undefined && n != null && n != o) {
                		if (n == 0) {
                            scope.filterId = 0;
                            scope.imageinfo = null;
                            scope.ngModel = 0;
                        } else {
                        	scope.filterApply();
                        }
                    }
                });
                
                scope.$watch(function() { return scope.ngModel }, function(n, o) {
                    if (n != 0 && n != null && n !== undefined) {
                        var filtering = $filter('findidfilter')(scope.imagesData, n, true);
                        if (filtering) {
                            scope.imageinfo = filtering;
                            scope.filterId = filtering.filterId;
                            scope.fileId = filtering.fileId;
                        }
                    }
                });
                
                scope.thumb = false;
                
                scope.thumbnailfilter = scope.filtersData['medium-thumbnail'];
                
                scope.$watch('imageinfo', function(n, o) {
                	if (n != 0 && n != null && n !== undefined) {
                		if (n.filterId != 0) {
                			scope.thumb = n;
                		} else {
                			var result = $filter('findthumbnail')(scope.imagesData, n.fileId, scope.thumbnailfilter.id);
                			if (!result) {
                				scope.thumb = n;
                			} else {
                				scope.thumb = result;
                			}
                		}
                	}
                })
            },
            templateUrl : 'storageImageUpload'
        }
    });
    
    zaa.filter("filemanagerdirsfilter", function() {
        return function(input, parentFolderId) {
            var result = [];
            angular.forEach(input, function(value, key) {
                if (value.parentId == parentFolderId) {
                    result.push(value);
                }
            });
            
            return result;
        };
    });
    
    zaa.filter("findthumbnail", function() {
    	return function(input, fileId, thumbnailFilterId) {
    		var result = false;
    		angular.forEach(input, function(value, key) {
    			if (!result) {
	    			if (value.fileId == fileId && value.filterId == thumbnailFilterId) {
	    				result = value;
	    			}
    			}
    		})
    		
    		return result;
    	}
    });
    
    zaa.filter("findidfilter", function() {
        return function(input, id) {
            
            var result = false;
            
            angular.forEach(input, function(value, key) {
                if (value.id == id) {
                    result = value;
                }
            });
            
            return result;
        }
    });
    
    zaa.filter("filemanagerfilesfilter", function() {
        return function(input, folderId, onlyImages) {
            
            var result = [];
            
            angular.forEach(input, function(data) {
                if (onlyImages) {
                    if (data.folderId == folderId && data.isImage == true) {
                        result.push(data);
                    }
                } else {
                    if (data.folderId == folderId) {
                        result.push(data);
                    }
                }
            });
            
            return result;
        };
    });
    
    /**
     * FILE MANAGER DIR
     */
    zaa.directive("storageFileManager", function(Upload, ServiceFoldersData, ServiceFilesData, LuyaLoading, AdminToastService) {
        return {
            restrict : 'E',
            transclude : false,
            scope : {
                allowSelection : '@selection',
                onlyImages : '@onlyImages'
            },
            controller : function($scope, $http, $filter, $timeout) {
                
                // ServiceFoldersData inheritance
                
                $scope.foldersData = ServiceFoldersData.data;
                
                $scope.$on('service:FoldersData', function(event, data) {
                    $scope.foldersData = data;
                });
                
                $scope.foldersDataReload = function() {
                    return ServiceFoldersData.load(true);
                }
                
                // ServiceFilesData inheritance
                
                $scope.filesData = ServiceFilesData.data;
                
                $scope.$on('service:FilesData', function(event, data) {
                    $scope.filesData = data;
                });
                
                $scope.filesDataReload = function() {
                    return ServiceFilesData.load(true);
                }
                
                // upload logic
                
                $scope.$watch('uploadingfiles', function (uploadingfiles) {
                    if (uploadingfiles != null) {
                        $scope.uploadResults = 0;
                        LuyaLoading.start(i18n['js_dir_upload_wait']);
                        for (var i = 0; i < uploadingfiles.length; i++) {
                            $scope.errorMsg = null;
                            (function (uploadingfiles) {
                                $scope.uploadUsingUpload(uploadingfiles);
                            })(uploadingfiles[i]);
                        }
                    }
                });
    
                $scope.$watch('uploadResults', function(n, o) {
                    if ($scope.uploadingfiles != null) {
                        if (n == $scope.uploadingfiles.length) {
                            $scope.filesDataReload().then(function() {
                            	AdminToastService.success(i18n['js_dir_manager_upload_image_ok'], 2000);
                                LuyaLoading.stop();
                            });
                        }
                    }
                })
                
                $scope.uploadUsingUpload = function(file) {
                    file.upload = Upload.upload({
                        url: 'admin/api-admin-storage/files-upload',
                        fields: {'folderId': $scope.currentFolderId},
                        file: file
                    });
    
                    file.upload.then(function (response) {
                        $timeout(function () {
                            $scope.uploadResults++;
                            file.processed = true;
                            file.result = response.data;
                            
                            if (file.result.upload == false) {
                                $scope.errorMsg = file.result.message;
                            }
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.errorMsg = response.status + ': ' + response.data;
                        }
                    });
    
                    file.upload.progress(function (evt) {
                        file.processed = false;
                        // Math.min is to fix IE which reports 200% sometimes
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                    });
                }
                
                // selector logic
                
                $scope.selectedFiles = [];
                
                $scope.toggleSelection = function(file) {
                    if ($scope.allowSelection == 'true') {
                        // parent inject 
                        $scope.$parent.select(file.id);
                        return;
                    }
    
                    var i = $scope.selectedFiles.indexOf(file.id);
                    if (i > -1) {
                        $scope.selectedFiles.splice(i, 1);
                    } else {
                        $scope.selectedFiles.push(file.id);
                    }
                };
    
                $scope.inSelection = function(file) {
                    var response = $scope.selectedFiles.indexOf(file.id);
                    
                    if (response != -1) {
                        return true;
                    }
                    
                    return false;
                };
                
                // folder add
                
                $scope.showFolderForm = false;
                
                $scope.createNewFolder = function(newFolderName) {
                    $http.post('admin/api-admin-storage/folder-create', $.param({ folderName : newFolderName , parentFolderId : $scope.currentFolderId }), {
                        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(transport) {
                        $scope.foldersDataReload().then(function() {
                            $scope.folderFormToggler();
                        })
                    });
                };
                
                $scope.folderFormToggler = function() {
                    $scope.showFolderForm = !$scope.showFolderForm;
                };
                
                // controller logic 
                
                $scope.currentFolderId = 0;
                
                $scope.changeCurrentFolderId = function(folderId) {
                    $scope.currentFolderId = folderId;
                };
                
                $scope.folderUpdateForm = false;
                
                $scope.folderDeleteForm = false;
                
                $scope.folderDeleteConfirmForm = false;
                
                $scope.toggleFolderMode = function(mode) {
                    if (mode == 'edit') {
                        $scope.folderUpdateForm = true;
                        $scope.folderDeleteForm = false;
                        $scope.folderDeleteConfirmForm = false;
                    } else if (mode == 'remove') {
                        $scope.folderUpdateForm = false;
                        $scope.folderDeleteForm = true;
                        $scope.folderDeleteConfirmForm = false;
                    } else if (mode == 'removeconfirm') {
                        $scope.folderUpdateForm = false;
                        $scope.folderDeleteForm = false;
                        $scope.folderDeleteConfirmForm = true;
                    } else {
                        $scope.folderUpdateForm = false;
                        $scope.folderDeleteForm = false;
                        $scope.folderDeleteConfirmForm = false;
                    }
                };
                
                $scope.updateFolder = function(folder) {
                    $http.post('admin/api-admin-storage/folder-update?folderId=' + folder.id, $.param({ name : folder.name }), {
                        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(transport) {
                        $scope.toggleFolderMode(false);
                    });
                }
                
                $scope.checkEmptyFolder = function(folder) {
                    $http.post('admin/api-admin-storage/is-folder-empty?folderId=' + folder.id, $.param({ name : folder.name }), {
                        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(transport) {
                        if (transport == true) {
                            $scope.deleteFolder(folder);
                        } else {
                            $scope.toggleFolderMode('removeconfirm');
                        }
                        /*
                        if (transport == false) {
                            // not empty
                            folder.remove = false;
                            folder.notempty = true;
                        } else {
                            // empty
                            $scope.deleteFolder(folder);
                        }
                        */
                    });
                };

                $scope.deleteFolder = function(folder) {
                    // check if folder is empty
                    $http.post('admin/api-admin-storage/folder-delete?folderId=' + folder.id, $.param({ name : folder.name }), {
                        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(transport) {
                        $scope.foldersDataReload().then(function() {
                            $scope.filesDataReload().then(function() {
                                $scope.toggleFolderMode(false);
                                $scope.currentFolderId = 0;
                            });
                        });
                    });
                };
                
                $scope.fileDetail = false;
                
                $scope.showFoldersToMove = false;
                
                $scope.openFileDetail = function(file) {
                    $scope.fileDetail = file;
                };
                
                $scope.closeFileDetail = function() {
                    $scope.fileDetail = false;
                };
                
                $scope.moveFilesTo = function(folderId) {
                    $http.post('admin/api-admin-storage/filemanager-move-files', $.param({'fileIds' : $scope.selectedFiles, 'toFolderId' : folderId}), {
                        headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                    }).success(function(transport) {
                        $scope.filesDataReload().then(function() {
                            $scope.selectedFiles = [];
                            $scope.showFoldersToMove = false;
                        });
                    });
                };
                
                $scope.removeFiles = function() {
                    AdminToastService.confirm(i18n['js_dir_manager_rm_file_confirm'], function($timeout, $toast) {
                        $http.post('admin/api-admin-storage/filemanager-remove-files', $.param({'ids' : $scope.selectedFiles}), {
                            headers : {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
                        }).success(function(transport) {
                            $scope.filesDataReload().then(function() {
                                $toast.close();
                                AdminToastService.success(i18n['js_dir_manager_rm_file_ok'], 2000);
                                $scope.selectedFiles = [];
                            });
                        });
                    });
                }
                
            },
            templateUrl : 'storageFileManager'
        }
    });

})();