import JS_Perview from './blog/JS_Perview'
import JS_Vue from './blog/JS_Vue'
import JS_React from './blog/JS_React'
import JS_Node from './blog/JS_Node'
import JS_NPM from './blog/JS_NPM'
import JS_Auto from './blog/JS_Auto'
import JS_H5 from './blog/JS_H5'
import JS_H5_WebAPI from './blog/JS_H5_WebAPI'
import HTTP from './blog/HTTP'
import Soft_Skill from './blog/Soft_Skill'

const sidebar = {
    '/blog/':[
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

export default sidebar