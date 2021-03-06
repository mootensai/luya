<?php

namespace crawler;

/**
 * @link https://github.com/FriendsOfPHP/Goutte
 * @link http://api.symfony.com/2.7/Symfony/Component/DomCrawler.html
 *
 * @author nadar
 */
class Module extends \luya\base\Module
{
    public $useAppViewPath = true;
    
    public $isCoreModule = true;

    public $baseUrl = null;
    
    /**
     * 
     * @var array with full regular expressions:
     * 'filterRegex' => [
     *     '/\.\//i',
     * ],
     */
    public $filterRegex = [];
}
