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
const
    fs = require('fs'),
    path = require('path'),
    utils = require('loader-utils'),
    isProduction = process.env.NODE_ENV === 'production';


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
    let query = this.resourceQuery && utils.parseQuery(this.resourceQuery),
        options = utils.getOptions(this);

    // 处理模块
    if (query) {
        let name = query.name || query.module,
            deps = query.deps;

        // 添加依赖
        if (deps) {

            // 转化为数组
            if (typeof deps === 'string') {
                deps = [deps];
            }

            // 添加依赖
            deps.forEach(dep => {
                let local = resolvePath.call(this, dep, options && options.dependencies, query);

                if (local) {
                    try {
                        let stats = fs.statSync(local),
                            addFunc = stats.isDirectory() ? 'addContextDependency' : 'addDependency';

                        // 添加依赖
                        this[addFunc](local);
                    } catch (err) {
                        // do nothing;
                    }
                }
            });
        }

        // 加载模块
        if (name) {
            let alias = options && (options.alias || options.modules || options),
                local = resolvePath.call(this, name, alias, query);

            if (local) {
                return `module.exports = require('${ local + this.resourceQuery }');`;
            }
        }
    }

    // 返回随机字符串
    return isProduction ? '' : `module.exports='${ + new Date() }';`;
};


/**
 *****************************************
 * 解析路径
 *****************************************
 */
function resolvePath(name, alias, query) {

    // 解析配置
    if (alias && name in alias) {
        name = alias[name];
    }

    // 处理回调
    if (typeof name === 'function') {
        name = name.call(this, query);
    }

    // 解析路径
    if (name && typeof name === 'string') {

        // 解析相对路径
        if (name.startsWith('.')) {
            return path.resolve(this.resourcePath, name);
        }

        // 返回模块路径
        return name;
    }
}
