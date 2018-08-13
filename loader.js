/**
 *****************************************
 * Created by lifx
 * Created on 2018-08-13 13:52:24
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const utils = require('loader-utils');


/**
 *****************************************
 * 定义模块
 *****************************************
 */
module.exports = function loader() {};


/**
 *****************************************
 * 定义加载内容
 *****************************************
 */
module.exports.pitch = function pitch() {
    let query = this.resourceQuery && utils.parseQuery(this.resourceQuery);

    // 处理模块
    if (query && query.name) {
        let options = utils.getOptions(this),
            local = options && options[query.name];

        // 处理回调
        if (typeof local === 'function') {
            local = local.call(this, query);
        }

        // 替换模块
        if (local && typeof local === 'string') {
            return `module.exports = require('${ local + this.resourceQuery }');`;
        }
    }

    // 返回空
    return '';
};
