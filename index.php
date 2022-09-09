<?php
// [ 应用入口文件 ]
define('SKYCAIJI_PATH', __DIR__.DIRECTORY_SEPARATOR);
// 定义应用目录
define('VENDOR_PATH', SKYCAIJI_PATH.'vendor'.DIRECTORY_SEPARATOR);
define('APP_PATH', VENDOR_PATH.'skycaiji'.DIRECTORY_SEPARATOR.'app'.DIRECTORY_SEPARATOR);
define('RUNTIME_PATH', SKYCAIJI_PATH.'runtime'.DIRECTORY_SEPARATOR);
define('APP_NAMESPACE', 'skycaiji');
// 加载框架引导文件
require VENDOR_PATH.'skycaiji'.DIRECTORY_SEPARATOR.'tp'.DIRECTORY_SEPARATOR.'start.php';
