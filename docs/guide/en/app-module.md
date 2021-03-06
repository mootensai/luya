Project Module
=============
A very important behvaior in *LUYA* projects are **modules**. You can always use modules to put your own custom and reusable logic inside. For instance you can put database logic inside of the via ActiveRecord models. A module can also provided informations for other module, for example [CMS Blocks](app-blocks.md). There are two different types of Modules:

+ [Admin](app-admin-module.md) Contains Model Data, NgRest Cruds
+ [Frontend](app-module-frontend.md) Contains frontend logic with controllers, logic and views.

> You can use the [Console Command](app-console.md) `module/create` to quick create new module.

Integrate
---------
To integrate a module, you have to define the them in your config file `prep.php` and `prod.php` (depending on which enviroment your `server.php` is configure), in the modules section:

```php
$config = [
    'modules' => [
        'contact'=> 'app\modules\team\Module'
    ]
];
``` 

Beispiel Modul
-------------

In our example we make a *TEAM Module* which has a frontend module part and admin moudl part. All admin modules have by defintion the suffix **admin**, the naming of the modules would look like this in our case:

+ team *Frontend* `modules/team/Module.php`
+ teamadmin *Admin* `modules/teamadmin/Module.php`


```php
<?php
namespace app\modules\team;

class Module extends \luya\base\Module
{

}
```

Das *Admin* Modul `modules/teamadmin/Module.php`:

```php
<?php
namespace app\modules\teamadmin;

class Module extends \admin\base\Module
{

}
```


Import Methode
--------------

All modules can contain a `import(\luya\console\interfaces\ImportController $import)` import method, this method will be called when running the [console command import](luya-console.md) and is one of the main ideas behind luya, store data from programmatic files into your databse while importing. If the `import()` method returns an array, each class must be extends of `luya\base\Importer`.

Example reponse for multiple importer classes:

```php
public function import(\luya\commands\ImportController $import)
{
    return [
        '\\cmsadmin\\importers\\BlockImporter',
        '\\cmsadmin\\importers\\CmslayoutImporter',
    ];
}
```

Example code where import directly does handle something:

```php
public function import(\luya\commands\ImportController $import)
{
    foreach ($import->getDirectoryFiles('filters') as $file) {
        $filterClassName = $file['ns'];
        if (class_exists($filterClassName)) {
            $object = new $filterClassName();
            $import->addLog('filters', implode(", ", $object->save()));
        }
    }
}
```

Komponenten Registrieren
------------------------
TBD

Links
------
+ [Frontend Modul guide](app-module-frontend.md)
+ [Admin Modul guide](app-admin-module.md)