import {expect} from 'chai'
import sayHello from '../src/say'
describe('测试hello.js',()=>{
  describe('sayhello',()=>{
    it('should say hello',()=>{
      const str=sayHello()
      expect(str).to.equal('sayhello')
    })
  })
})