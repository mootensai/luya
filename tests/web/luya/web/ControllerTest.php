<?php

namespace tests\web\luya\base;

use Yii;

class StubController extends \luya\web\Controller
{
}

class ControllerTest extends \tests\web\Base
{
    public $controller;

    public function setUp()
    {
        $this->controller = new StubController('stub', Yii::$app->getModule('viewmodule'));
    }

    public function testViewRender()
    {
        $view1 = $this->controller->render('view1');
        $this->assertEquals('view1', $view1);
    }

    public function testViewLayoutRender()
    {
        $view2 = $this->controller->renderLayout('view2');
        $this->assertEquals('view2', $view2);
    }
}
