// "bootstrapValidator" 传入函数名称便于之后jQuery有更新，名称冲突时修改
/**
 * plug: 插件名
 */
(function(global, factory, plug) {
  factory.call(global, global.jQuery, plug)
})(window, function($, plug){
  // 闭包
  // 配置常量-默认值
  var __DEFS__ = {
    __find__: "input, select, list, textarea", // 校验的表单元素
    __filter__: "[type=submit], [type=button], [type=image], [type=reset]", // 需要排除的元素
    __err__: "-error",
    __hint__: "* faild valid"
  }
  // 配置常量-默认配置项
  var __OPS__ = {
    raise: "change"
  }
  // 配置常量-配置规则引擎
  var __RULES__ = {
    "required": function(){
      var val = this.val();
      console.log(val, 'val')
      return val !== null && val !== undefined && val !== "";
    },
    "email": function(){
      return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.val());
    },
    "regex": function(config){
      return new RegExp(config).test(this.val());
    },
    "integer": function(){
      return false
    },
    "number": function(){
      return false
    },
    "min": function(){
      return false
    },
    "man": function(){
      return false
    },
    "min-length": function(){
      return false
    },
    "man-length": function(){
      return false
    }
    // 其他规则，并且用户可扩展...
  }
  // 将方法扩展到jQuery上
  $.fn[plug] = function(options) {
    // 核心代码
    var $this = $(this); // 通过jQuery核心函数返回的变量
    options = $.extend(__OPS__, options); // 扩展配置项
    var $fields = $this.find(__DEFS__.__find__).not(__DEFS__.__filter__);  // 找到目标元素
    $fields.on(options.raise, function(){ // 绑定校验事件
      var $field = $(this); // 当前被校验的目标元素
      var $group = $field.parents(".form-group").removeClass("has-success has-error"); // 找到group元素，并移除样式
      $field.next(".help-block").remove(); // 清空提示信息
      var result, _e,_r = true; // 当次校验结果，默认为true(有的没有校验规则，需要保证校验通过)
      $.each(__RULES__, function(rule, valid){ // 迭代
        _r = $field.data(rule); // 检测是否配置当前校验项
        if (_r) {
          result = valid.call($field, _r); // 校验结果
          $group.addClass(result?"has-success":"has-error"); // 根据校验结果添加样式
          if (!result) {
            _e = $field.data(rule+__DEFS__.__err__) || __DEFS__.__hint__; // 错误提示
            $field.after("<span class=\"help-block\">"+_e+"</span>"); // 添加错误提示
          }
          return result; // 一旦出现校验结果为false，停止继续校验后面内容。没有配置的校验项，不会进行校验。
        }
      })
    })
  }
}, "bootstrapValidator");