#### 框架技术及参考
- [Bootstrap](https://v3.bootcss.com/)
- [jQuery](http://jquery.cuishifeng.cn/)
- [jQuery CDN](https://code.jquery.com/) => 可用于直接引入线上jQuery
- [js正则表达式大全](https://www.cnblogs.com/my-effort/p/6306706.html)

#### 页面构建
引用bootstrap组件（直接复制api中代码修改即可，，基本不用自己写css样式代码）

<input type="email" required> => h5写法，会自动校验格式，，但是样式简单，一般没用，需要自己定义样式

```
 // 必填，并且为邮箱格式
 <input type="email" class="form-control" id="inputEmail3" placeholder="Email" required="true" email="true"> 
 // 由于自定义样式及校验封装, 类似于required、email这种计算机词汇容易造成识别问题，所以建议修改名称为data-required这种格式
 <input type="email" class="form-control" id="inputEmail3" placeholder="Email" data-required="true" data-email="true">
```

#### 校验架构规则引擎设计
**要求：**
- 不同的项目，不同的页面都要适用
- 每一个表单域都需要适用
- 必须可配置（软编码）
- 规则引擎要求能满足80%的用户需求，并且用户可以扩展增加特殊的规则

```
目标：
     不需要校验  input type='submit | button | image | reset'
     需要校验    input type='radio | checkbox | file | reset' 
                select
                list
                textarea
规则：
      required:    必填
      email:       必须是邮箱地址
      regex：      格式必须符合正则表达式
      integer:     必须是整数
      number:      必须是数字
      min:         最小值
      man:         最大值
      min-length:  最小长度
      man-length:  最大长度
      ...

```

#### 手写校验架构的实现

```
// 基本结构（闭包）
// "函数名"的传入，便于之后版本更新，函数名称冲突时修改
(function(){

})(window, function(){}, "函数名");
```