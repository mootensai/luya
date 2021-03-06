<?php

defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV') or define('YII_ENV', 'dev');

$config = [
    'id' => 'testenv',
    'siteTitle' => 'Luya Test App',
    'remoteToken' => 'testtoken',
    'basePath' => dirname(__DIR__),
    'defaultRoute' => 'unitmodule',
    'modules' => [
        'unitmodule' => [
            'class' => 'tests\data\modules\unitmodule\Module',
        ],
    ],
];

return $config;
