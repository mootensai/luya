<?php

namespace tests\console\controllers;

use Yii;

class RunCommandsTest extends \tests\console\Base
{
    public function testCustomCommandSuccess()
    {
        Yii::$app->request->setParams([
            'command', 'unitmodule', 'command-output/success',
        ]);

        $this->assertEquals(0, Yii::$app->run());
    }

    public function testCustomCommandError()
    {
        Yii::$app->request->setParams([
            'command', 'unitmodule', 'command-output/error',
        ]);

        $this->assertEquals(1, Yii::$app->run());
    }
}
