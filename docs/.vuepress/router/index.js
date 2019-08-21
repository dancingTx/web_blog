const JS_Perview = require('./blog/JS_Perview')
const JS_Vue = require('./blog/JS_Vue') 
const JS_React = require('./blog/JS_React') 
const JS_Node = require('./blog/JS_Node') 
const JS_NPM = require('./blog/JS_NPM') 
const JS_Auto = require('./blog/JS_Auto') 
const JS_H5 = require('./blog/JS_H5') 
const JS_H5_WebAPI = require('./blog/JS_H5_WebAPI') 
const HTTP = require('./blog/HTTP') 
const Soft_Skill = require('./blog/Soft_Skill') 

const sidebar = {
    '/blog/': [
        ...JS_Perview,
        ...JS_Vue,
        ...JS_React,
        ...JS_Node,
        ...JS_NPM,
        ...JS_Auto,
        ...JS_H5,
        ...JS_H5_WebAPI,
        ...HTTP,
        ...Soft_Skill,
        '声明'
    ],
    // '/question/': [

    // ]
}

module.exports = sidebar