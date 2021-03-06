<?php

namespace cmsadmin\models;

use admin\models\Property as AdminProperty;

class Property extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'cms_nav_property';
    }

    public function rules()
    {
        return [
            [['nav_id', 'admin_prop_id', 'value'], 'required'],
        ];
    }
    
    public function getAdminProperty()
    {
        return $this->hasOne(AdminProperty::className(), ['id' => 'admin_prop_id']);
    }
    
    private $_object = null;
    
    public function getObject()
    {
        if ($this->_object === null) {
            $this->_object = $this->adminProperty->createObject($this->value);
        }
        
        return $this->_object;
    }
}
