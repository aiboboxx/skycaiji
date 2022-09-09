/*
 |--------------------------------------------------------------------------
 | SkyCaiji (蓝天采集器)
 |--------------------------------------------------------------------------
 | Copyright (c) 2018 https://www.skycaiji.com All rights reserved.
 |--------------------------------------------------------------------------
 | 使用协议  https://www.skycaiji.com/licenses
 |--------------------------------------------------------------------------
 */
'use strict';function AppClass(){}
AppClass.prototype={constructor:AppClass,init_list:function(){var $_o=this;$(document).ready(function(){$('#app_list').on('click','.install',function(){var obj=$(this);var parent=obj.parents('tr[data-app]');var app=parent.attr('data-app');if(parent.attr('data-agreement')){windowModal('协议',ulink('admin/app/agreement?app=_app_',{'_app_':app}))}else{confirmRight('是否安装？',function(){windowModal('正在安装...',ulink('admin/app/install?app=_app_',{'_app_':app}))})}});$('#app_list').on('click','.uninstall',function(){var obj=$(this);confirmRight('卸载会清理相关数据，确定卸载？',function(){var app=obj.parents('tr[data-app]').attr('data-app');windowModal('正在卸载...',ulink('admin/app/uninstall?app=_app_',{'_app_':app}))})});$('#app_list').on('click','.upgrade',function(){var obj=$(this);confirmRight('确定升级至新版本？',function(){var app=obj.parents('tr[data-app]').attr('data-app');windowModal('正在升级...',ulink('admin/app/upgrade?app=_app_',{'_app_':app}))})});$('#app_list').on('click','.enable',function(){var app=$(this).parents('tr[data-app]').attr('data-app');var enable=$(this).attr('data-enable');enable=parseInt(enable);enable=enable>0?0:1;windowModal((enable?'开启':'关闭')+'应用',ulink('admin/app/enable?app=_app_&enable=_enable_',{'_app_':app,'_enable_':enable}))});$('#app_list').on('click','.store-detail',function(){openStoreUrl($(this).attr('data-url'))});$('#app_list').on('click','.nav-packs a',function(){if($(this).attr('target')=='_blank'){var url=$(this).attr('data-url');if(url){window.open(url,'_blank');return!1}}});$("[data-toggle='popover']").popover();if($('#auto_check').is(':checked')){$_o.check_update()}
$('#auto_check').bind('click',function(){var auto=$(this).is(':checked')?1:0;ajaxOpen({type:"GET",url:ulink('mystore/appOp?op=auto_check&auto='+auto),dataType:"json",success:function(data){data.code==1?toastr.success(data.msg):toastr.error(data.msg)}})});$('#btn_check').bind('click',function(){$_o.check_update()})})},init_manage:function(){$('.manage-nav a').bind('click',function(){if($(this).attr('target')=='_blank'){var url=$(this).attr('data-url');if(url){window.open(url,'_blank');return!1}}});$('#newest_version').bind('click',function(){var obj=$(this);confirmRight('确定升级至新版本？',function(){var app=obj.attr('data-app');windowModal('正在升级...',ulink('admin/app/upgrade?app=_app_',{'_app_':app}))})});$('#enable').bind('click',function(){var app=$(this).attr('data-app');var enable=$(this).attr('data-enable');enable=parseInt(enable);enable=enable>0?0:1;windowModal((enable?'开启':'关闭')+'应用',ulink('admin/app/enable?app=_app_&enable=_enable_',{'_app_':app,'_enable_':enable}))});if(document.getElementById('iframe_main')){var boxHeight=$(window).height()-$('.main-header').height();$('.content').height(boxHeight+'px');boxHeight=boxHeight-$('.content .manage-nav').height();$('.content .manage-wrap').height(boxHeight);$('#iframe_main').on('load',function(){$('.iframe-loading').remove();$(this).show()})}},check_update:function(){var apps=new Array();$('#app_list').find('tr[data-app]').each(function(){apps.push($(this).attr('data-app'))});if(apps.length>0){$('#btn_check').html('检测更新 <div class="loading-sm" style="position:absolute;top:2px;right:-15px;"></div>');$('.store-detail').find('.new-version').remove();ajaxOpen({type:"get",url:ulink('mystore/appOp?op=check_store_update'),dataType:"json",async:!0,data:{apps:apps},success:function(data){if(data.code==1&&data.data){for(var i in data.data){var app=data.data[i];var storeDetail=$('tr[data-app="'+app+'"]').find('.store-detail');storeDetail.append('<span class="new-version">新</span>')}}},complete:function(){$('#btn_check').html('检测更新')}})}},};var appClass=new AppClass()