LUYA UPGRADE
============

This document will help you upgrading from one LUYA Version into another

1.0.0-beta6
-----------

* `#771`: As we have removed the `LUYA` module as module and use it as library you have to remove the `luya\Module` in your application. But when you are using the *CMS-Module* you must bootstrap it instead in your application config setting:
  ```php
  'bootstrap' => [
      'cms',
  ],
  ```

* `#780`: In terms of Yii2 controller view render behavior consistency:
  - removed `$useModuleViewPath` propertie of `luya\web\Controller`.
  - removed `$controllerUseModuleViewPath` propertie of `luya\base\Module` replaced with `$useAppViewPath`.

* `#777` The suffix (ActiveWindow) is now removed from the folders where the view files are located:
  - before: `MyTestActiveWindow` folder for view files: `views/<locator>/mytestactivewindow`
  - after: `MyTestActiveWindow` folder for view files: `views/<locator>/mytest`.
