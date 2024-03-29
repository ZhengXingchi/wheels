import {extend ,configure } from 'vee-validate'
import {required,email,min,length,confirmed,max,is} from 'vee-validate/dist/rules'
import {i18n} from './i18n'
extend('email',email)
extend('min',min)
extend('max',max)
extend('is',is)
extend('required',required)
extend('length',length)
extend('confirmed',confirmed)
configure({
  defaultMessage:(field,values)=>{
    values._field_=i18n.t(`fields.${field}`)
    return i18n.t(`validation.${values._rule_}`,values)
  }
})