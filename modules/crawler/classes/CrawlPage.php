<?php

namespace crawler\classes;

use Goutte\Client;
use yii\base\InvalidConfigException;
use yii\base\yii\base;
use luya\helpers\Url;

class CrawlPage extends \yii\base\Object
{
    public $pageUrl = null;

    public $client = null;

    public $baseUrl = null;
    
    public $baseHost = null;
    
    private $_crawler = null;

    public function __clone()
    {
        $this->flush();
    }

    public function init()
    {
        if ($this->baseUrl === null) {
            throw new InvalidConfigException('baseUrl properties can not be null.');
        }
        
        $info = parse_url($this->baseUrl);
        
        $this->baseHost = $info['scheme'] . '://' . $info['host'];
    }

    public function flush()
    {
        $this->_crawler = null;
        $this->pageUrl = null;
    }

    public function getCrawler()
    {
        if ($this->_crawler === null) {
            $this->client = new Client();
            $this->_crawler = $this->client->request('GET', $this->pageUrl);
        }

        return $this->_crawler;
    }

    public function getContentType()
    {
        $this->getCrawler();
        return $this->client->getResponse()->getHeader('Content-Type');
    }
    
    public function getLinks()
    {
        $links = $this->getCrawler()->filterXPath('//a')->each(function ($node, $i) {
            return $node->extract(array('_text', 'href'))[0];
        });
        foreach ($links as $key => $item) {
            $url = parse_url($item[1]);

            if (!isset($url['host']) || !isset($url['scheme'])) {
                $base = $this->baseHost;
            } else {
                $base = $url['scheme'] . '//' . $url['host'];
            }
            
            $path = null;
            
            if (isset($url['path'])) {
                $path = $url['path'];
            }
            
            $url = rtrim($base, "/") . "/" . ltrim($path, "/");
            

            $links[$key][1] = http_build_url($url, [
                'query' => (isset($host['query'])) ? $host['query'] : [],
            ], HTTP_URL_JOIN_QUERY | HTTP_URL_STRIP_FRAGMENT);
        }
        return $links;
    }

    public function getLanguageInfo()
    {
        return $this->getCrawler()->filterXPath('//html')->attr('lang');
    }

    public function getTitle()
    {
        return $this->getCrawler()->filterXPath('//title')->text();
    }

    private function tempGetContent($url)
    {
        $curl = new \Curl\Curl();
        $curl->get($url);
        $content = $curl->response;

        if (empty($content)) {
            return '';
        }
        
        $dom = new \DOMDocument('1.0', 'utf-8');

        libxml_use_internal_errors(true);
        $dom->loadHTML($content);
        libxml_clear_errors();

        $dom->preserveWhiteSpace = false; // remove redundant white spaces

        $body = $dom->getElementsByTagName('body');

        $bodyContent = null;

        if ($body && $body->length > 0) {
            // remove scripts
            while (($r = $dom->getElementsByTagName('script')) && $r->length) {
                $r->item(0)->parentNode->removeChild($r->item(0));
            }

            $domBody = $body->item(0);

            $bodyContent = $dom->saveXML($domBody);
            //$bodyContent = $this->dom->saveHTML($this->domBody); // argument not allowed on 5.3.5 or less, see: http://www.php.net/manual/de/domdocument.savehtml.php
        }

        return $bodyContent;
    }

    public function getContent()
    {
        $bodyContent = $this->tempGetContent($this->pageUrl);

        // find crawl full ignore
        preg_match("/\[CRAWL_FULL_IGNORE\]/s", $bodyContent, $output);
        if (isset($output[0])) {
            if ($output[0] == '[CRAWL_FULL_IGNORE]') {
                return;
            }
        }

        $content = preg_replace('/\s+/', ' ', $bodyContent);

        // remove crawl ignore tags
        preg_match_all("/\[CRAWL_IGNORE\](.*?)\[\/CRAWL_IGNORE\]/s", $content, $output);
        if (isset($output[0]) && count($output[0]) > 0) {
            $content = str_replace($output[0], '', $content);
        }

        // strip tags and stuff
        $content = strip_tags($content);

        // remove whitespaces and stuff
        $content = trim(str_replace(array("\n", "\r", "\t", "\n\r", "\r\n"), '', $content));

        $content = htmlentities($content, ENT_QUOTES | ENT_IGNORE, 'UTF-8');

        return $content;
    }
}
