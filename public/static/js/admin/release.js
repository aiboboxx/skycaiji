/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';function ReleaseClass(formid,releid){this.formid='#'+formid;this.releid=releid}
ReleaseClass.prototype={constructor:ReleaseClass,init:function(){var $_o=this;$($_o.formid+' select[name="module"]').bind('change',function(){$($_o.formid+' .rele-module').hide();$($_o.formid+' .rele-module[module="'+$(this).val()+'"]').show()});$('#btn_import_release').bind('click',function(){windowModal('导入配置会覆盖当前任务的发布设置，且不可恢复',ulink('release/import'))});$('#rele_module_cms .btn-cms-detect').bind('click',function(){$_o.cms_detect()});$('#rele_module_cms .btn-cms-bind').bind('click',function(){$_o.cms_bind()});$('#rele_module_cms').on('change','select[name="cms[app]"]',function(){var cmsApp=$(this).val();$_o.cms_bind({cms:{app:cmsApp}})});$('#cms_list').on('click','li a',function(){var path=$(this).attr('path');if(path){$($_o.formid+' [name="cms[path]"]').val(path);$('#cms_tab a[href="#cms_tab_bind"]').tab('show');$_o.cms_bind()}});$('#rele_module_cms').on('change','select[name^="cms_app[param]"]',function(){var cusName=$(this).attr('name').replace('cms_app[param]','cms_app[custom]');if($(this).val()=='custom:'){$('input[name="'+cusName+'"]').show()}else{$('input[name="'+cusName+'"]').hide()}});$('#db_tab_config .dm-db-charset li span').bind('click',function(){var charset=$(this).attr('data-val');charset=charset?charset:'';$('#db_tab_config [name="db[charset]"]').val(charset)});$('#db_tab_config .btn-db-names').bind('click',function(){$_o.db_connect('db_names')});$('#db_tab_config .btn-db-connect').bind('click',function(){$_o.db_connect()});$('#db_tab_table').on('change','select[name^="db_table[field]"]',function(){var cusName=$(this).attr('name').replace('db_table[field]','db_table[custom]');if($(this).val()=='custom:'){$('input[name="'+cusName+'"]').show()}else{$('input[name="'+cusName+'"]').hide()}});$('#rele_module_file').on('click','.btn-file-rand-path',function(){var randStr=$_o.rand_str(10);$($_o.formid+' [name="file[path]"]').val(randStr)});$('#rele_module_api').on('click','.btn-api-rand-url',function(){var randStr=$_o.rand_str(10);$($_o.formid+' [name="api[url]"]').val(randStr)});$('#diy_tab').on('click','[data-type]',function(){$($_o.formid+' [name="diy[type]"]').val($(this).attr('data-type'))});$('#rele_module_toapi').on('change','[name="toapi[type]"]',function(){if($(this).val()=='post'){$('#rele_module_toapi .toapi-content-type').show()}else{$('#rele_module_toapi .toapi-content-type').hide()}});$('#rele_module_toapi').on('click','.toapi-add-param',function(){$_o.toapi_add_param(null,null)});$('#rele_module_toapi').on('click','.toapi-del-param',function(){$(this).parents('tr').eq(0).remove()});inputSelectCustom('#rele_module_toapi [name="toapi[charset]"]','toapi[charset_custom]');inputSelectCustom(null,null,{box:'#rele_module_toapi',slt:'[name="toapi[param_val][]"]',ipt:'[name="toapi[param_addon][]"]'});$('#rele_module_toapi').on('click','.toapi-add-header',function(){$_o.toapi_add_header(null,null)});$('#rele_module_toapi').on('click','.toapi-del-header',function(){$(this).parents('tr').eq(0).remove()});inputSelectCustom(null,null,{box:'#rele_module_toapi',slt:'[name="toapi[header_val][]"]',ipt:'[name="toapi[header_addon][]"]'})},load:function(data){var $_o=this;if(data.module){$($_o.formid+' select[name="module"]').val(data.module).trigger('change')}
if(data.config){if('cms'==data.module){$_o.cms_bind(data.config);$(document).ready(function(){$('#cms_tab a[href="#cms_tab_bind"]').tab('show')})}else if('db'==data.module){$_o.db_bind(data.config)}else if('file'==data.module){if(data.config.file){$($_o.formid+' [name="file[path]"]').val(data.config.file.path);$($_o.formid+' [name="file[type]"]').each(function(){if($(this).val()==data.config.file.type){$(this).prop('checked',!0)}});$($_o.formid+' [name="file[txt_implode]"]').val(data.config.file.txt_implode);if(data.config.file.hide_fields){for(var fi in data.config.file.hide_fields){$($_o.formid+' [name="file[hide_fields][]"][value="'+data.config.file.hide_fields[fi]+'"]').prop('checked',!0)}}}}else if('api'==data.module){if(data.config.api){$($_o.formid+' [name="api[url]"]').val(data.config.api.url);$($_o.formid+' [name="api[cache_time]"]').val(data.config.api.cache_time);if(data.config.api.hide_fields){for(var fi in data.config.api.hide_fields){$($_o.formid+' [name="api[hide_fields][]"][value="'+data.config.api.hide_fields[fi]+'"]').prop('checked',!0)}}}}else if('diy'==data.module){if(data.config.diy){$(document).ready(function(){$('#diy_tab a[href="#diy_tab_'+data.config.diy.type+'"]').tab('show');for(var i in data.config.diy){$($_o.formid+' [name="diy['+i+']"]').val(data.config.diy[i])}
if(data.config.diy.app){var appName=data.config.diy.app;if(appName.length>1){appName=appName.substr(0,1).toUpperCase()+appName.substr(1).toLowerCase()}else{appName=appName.toUpperCase()}
$($_o.formid+' [name="diy[app]"]').parent().find('.diy-app-name').text(appName+'.php')}})}}else if('toapi'==data.module){var config=data.config.toapi;if(config){$($_o.formid+' [name="toapi[url]"]').val(config.url);$($_o.formid+' [name="toapi[type]"]').val(config.type).trigger('change');$($_o.formid+' [name="toapi[content_type]"]').val(config.content_type);$($_o.formid+' [name="toapi[charset_custom]"]').val(config.charset_custom);$($_o.formid+' [name="toapi[charset]"]').val(config.charset).trigger('change');if(config.response){for(var i in config.response){$($_o.formid+' [name="toapi[response]['+i+']"]').val(config.response[i])}}
if(config.param_name){config.param_val=config.param_val?config.param_val:{};config.param_addon=config.param_addon?config.param_addon:{};for(var i in config.param_name){var pname=config.param_name[i]?config.param_name[i]:'';var pval=config.param_val[i]?config.param_val[i]:'';var paddon=config.param_addon[i]?config.param_addon[i]:'';$_o.toapi_add_param({name:pname,val:pval,addon:paddon},i)}}
if(config.header_name){config.header_val=config.header_val?config.header_val:{};config.header_addon=config.header_addon?config.header_addon:{};for(var i in config.header_name){var hname=config.header_name[i]?config.header_name[i]:'';var hval=config.header_val[i]?config.header_val[i]:'';var haddon=config.header_addon[i]?config.header_addon[i]:'';$_o.toapi_add_header({name:hname,val:hval,addon:haddon},i)}}
$($_o.formid+' [name="toapi[interval]"]').val(toInt(config.interval));$($_o.formid+' [name="toapi[wait]"]').val(toInt(config.wait));$($_o.formid+' [name="toapi[retry]"]').val(toInt(config.retry))}}}},cms_detect:function(){var $_o=this;$('#cms_list').html('').addClass('loading');ajaxOpen({type:'get',url:ulink("release/cmsDetect"),dataType:'json',success:function(data){$('#cms_list').removeClass('loading');if(data.code==1){var html='<p>点击选择CMS</p>';for(var x in data.data){var list=data.data[x];html+='<label>'+x+'</label><ul>';for(var y in list){html+='<li><a href="javascript:;" path="'+list[y]+'">'+list[y]+'</a></li>'}
html+='</ul>'}
$('#cms_list').html(html)}else{$('#cms_list').html(data.msg)}}})},cms_bind:function(config){var $_o=this;$('#cms_bind').html('').addClass('loading');var postData=$($_o.formid).serialize();if(config&&config.cms&&config.cms.app){postData='cms[app]='+encodeURIComponent(config.cms.app)+'&'+postData}
ajaxOpen({type:'post',url:ulink("release/cmsBind"),dataType:'html',data:postData,success:function(data,textStatus,request){$('#cms_bind').removeClass('loading').show();if((/application\/json/i).test(request.getResponseHeader('Content-Type'))){data=jQuery.parseJSON(data);$('#cms_bind').html('<b style="color:red;">'+data.msg+'</b>')}else{$('#cms_bind').html(data);if(config&&config.cms_app){if(config.cms_app.param){for(var f in config.cms_app.param){var paramEle=$('#cms_bind').find('[name="cms_app[param]['+f+']"]');if(paramEle.is('select')){paramEle.val(config.cms_app.param[f]).trigger('change')}else if(paramEle.is('input:radio')){$('#cms_bind').find('[name="cms_app[param]['+f+']"][value="'+config.cms_app.param[f]+'"]').prop('checked','checked')}else{paramEle.val(config.cms_app.param[f])}}
if(config.cms_app.custom){for(var f in config.cms_app.custom){$('#cms_bind').find('[name="cms_app[custom]['+f+']"]').val(config.cms_app.custom[f])}}}}}},error:function(XMLHttpRequest,textStatus,errorThrown){$('#cms_bind').removeClass('loading').show();$('#cms_bind').html(XMLHttpRequest.responseText)}})},db_bind:function(config){var $_o=this;$($_o.formid+' select[name="db[type]"]').val(config.db.type);$(document).ready(function(){$('#db_tab a[href="#db_tab_table"]').tab('show');$('#db_tab_table .db-table-list').html('').addClass('loading');ajaxOpen({type:'get',url:ulink("release/dbTables?id=_id_",{_id_:$_o.releid}),timeout:10000,dataType:'json',success:function(data){if(data.code==1){$('#db_tab_table .db-table-list').html(data.msg)}else{$('#db_tab_table .db-table-list').css('color','red').html(data.msg)}},complete:function(XMLHttpRequest,status){$('#db_tab_table .db-table-list').removeClass('loading');if(status=='timeout'){$('#db_tab_table .db-table-list').css('color','red').html('数据库连接超时')}}});$('#db_tab_table .db-table-list').on('click','.btn-db-table-bind',function(){var curTable=$(this).parents('.db-table-list').eq(0).find('.db-table-select').val();$_o.db_table_bind(curTable)});eleExchange('#db_table_bind_list','.icon-drag-move','.panel-default');$('#db_table_bind_list').on('click','.glyphicon-remove',function(){var obj=$(this);confirmRight(window.tpl_lang.confirm_delete,function(){obj.parents('.panel').eq(0).remove()})});$('#db_table_bind_list').on('change','select[name^="field"]',function(){if($(this).val()=='custom:'){$(this).siblings('input[name^="custom"]').show()}});if(config.db_table&&config.db_table.field){var tables=new Array();for(var table in config.db_table.field){tables.push(table)}
tables=tables.join(',');$('#db_tab_table .db-table-binding').addClass('loading');$_o.db_table_bind(tables)}})},db_table_bind:function(curTable){var $_o=this;var bindUrl=ulink("release/dbTableBind?id=_id_&table=_table_",{_id_:$_o.releid,_table_:curTable});if($('#db_table_bind_list').find('[id^="db_table_name_'+curTable+'"]').length>0){toastr.error('已绑定该表')}else{ajaxOpen({type:'get',url:bindUrl,dataType:'html',success:function(data){if(dataIsJson(data)){ajaxDataMsg(data)}else{$('#db_table_bind_list').append(data)}},complete:function(){$('#db_tab_table .db-table-binding').removeClass('loading').hide()}})}},db_connect:function(op){op=op?op:'';var $_o=this;$('#db_tab_config .rele-db-error').html('').addClass('loading');ajaxOpen({type:'post',url:ulink("release/dbConnect?op="+op),timeout:10000,dataType:'json',data:$($_o.formid).serialize(),success:function(data){if(data.code==1){if(op=='db_names'){modal('选择数据库',data.msg)}else{$('#db_tab_config .rele-db-error').css('color','green').html(data.msg)}}else{toastr.error(data.msg);$('#db_tab_config .rele-db-error').css('color','red').html(data.msg)}},complete:function(XMLHttpRequest,status){$('#db_tab_config .rele-db-error').removeClass('loading');if(status=='timeout'){$('#db_tab_config .rele-db-error').css('color','red').html('数据库连接超时')}}})},toapi_add_param:function(param,index){var $_o=this;var paramTable=$('#rele_module_toapi').find('.toapi-param-table');if(!paramTable.attr('data-tpl')){var paramTpl=$('#rele_module_toapi').find('.toapi-param-tpl');paramTable.attr('data-tpl',paramTpl.html());paramTpl.remove()}
param=param?param:{};if(!index){index=generateUUID()}
paramTable.find('tbody').append('<tr data-param-id="'+index+'">'+paramTable.attr('data-tpl')+'</tr>');var curTr=paramTable.find('[data-param-id="'+index+'"]');curTr.find('[name="toapi[param_name][]"]').val(param.name?param.name:'');curTr.find('[name="toapi[param_val][]"]').val(param.val?param.val:'').trigger('change');curTr.find('[name="toapi[param_addon][]"]').val(param.addon?param.addon:'')},toapi_add_header:function(header,index){var $_o=this;var headerTable=$('#rele_module_toapi').find('.toapi-header-table');if(!headerTable.attr('data-tpl')){var headerTpl=$('#rele_module_toapi').find('.toapi-header-tpl');headerTable.attr('data-tpl',headerTpl.html());headerTpl.remove()}
header=header?header:{};if(!index){index=generateUUID()}
headerTable.find('tbody').append('<tr data-header-id="'+index+'">'+headerTable.attr('data-tpl')+'</tr>');var curTr=headerTable.find('[data-header-id="'+index+'"]');curTr.find('[name="toapi[header_name][]"]').val(header.name?header.name:'');curTr.find('[name="toapi[header_val][]"]').val(header.val?header.val:'').trigger('change');curTr.find('[name="toapi[header_addon][]"]').val(header.addon?header.addon:'')},rand_str:function(len){var chars='ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　var maxPos=chars.length;　　var str='';　　for(var i=0;i<len;i++){　　　　str+=chars.charAt(Math.floor(Math.random()*maxPos));　　}
return str},import:function(id,name){var $_o=this;$($_o.formid+' input[name="release_id"]').val(id);$('#btn_import_release').text('导入配置：'+name);$('#myModal').modal('hide')}}