/** @module String */

/**
 * 获取字符串的字节长度
 * @function byteSize
 * @param {string} str - 字符串
 * @return {number}
 * @example
 * U.byteSize('日')
 * // => 3
 *
 * U.byteSize('12')
 * // => 2
 *
 * U.byteSize('hello')
 * // => 5
 */
export const byteSize = str => new Blob([str]).size

/**
 * 反转字符串
 * @function reverseString
 * @param {string} str - 字符串
 * @return {str}
 * @example
 * U.reverseString('hello!')
 * // => '!olleh'
 */
export const reverseString = str => [...str].reverse().join('')

/**
 * 向URL追加参数
 * @function stringifyURL
 * @param {string} url - URL路径
 * @param {object} params - 参数对象
 * @return {string}
 * @example
 * U.stringifyURL('https://www.google.com/', {name: 'john', age: 30})
 * // => 'https://www.google.com/?name=john&age=30'
 */
export const stringifyURL = (url, params) => {
  url += (/\?/).test(url) ? '&' : '?'
  return url += Object.keys(params).map(key => `${key}=${params[key]}`).join('&')
}

/**
 * 解析URL参数
 * @function parseURL
 * @param {string} url - 字符串
 * @return {object}
 * @example
 * U.parseURL('http://url.com/page?name=Adam&surname=Smith')
 * // => {name: 'Adam', surname: 'Smith'}
 *
 * U.parseURL('https://www.google.com/')
 * // => {}
 */
export const parseURL = url => {
  const arr = url.match(/([^?=&]+)(=([^&]*))/g) || []
  return arr.reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a), {})
}

/**
 * 移除字符串中的HTML标签
 * @function removeHTML
 * @param {string} str - 字符串
 * @return {string}
 * @example
 * const str = '<p>这是<em>一个</em>段落。</p>'
 * U.removeHTML(str)
 * // => '这是一个段落。'
 */
export const removeHTML = str => str.replace(/<[^>]*>/g, '')

/**
 * 转义特殊字符
 * @function escapeHTML
 * @param {string} str - 字符串
 * @return {string}
 * @example
 * const str = '<a href="#">you & me</a>'
 * U.escapeHTML(str)
 * // => '&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;'
 */
export const escapeHTML = str => str.replace(
  /[&<>"]/g,
  tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  }[tag] || tag)
)

/**
 * 反转义特殊字符
 * @function unescapeHTML
 * @param {string} str - 字符串
 * @return {string}
 * @example
 * const str = '&lt;a href=&quot;#&quot;&gt;you &amp; me&lt;/a&gt;'
 * U.unescapeHTML(str)
 * // => '<a href="#">you & me</a>'
 */
export const unescapeHTML = str => str.replace(
  /&amp;|&lt;|&gt;|&quot;/g,
  tag => ({
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"'
  }[tag] || tag)
)

/**
 * 使用指定的掩码字符替换start~end之间的所有字符
 * @function mask
 * @param {string|number} str - 字符串
 * @param {number} [start=0] - 可选，开始位置，默认为0（即字符串开头）
 * @param {number} [end=0] - 可选，结束位置，默认为0（即字符串结尾）
 * @param {string} [mask='*'] - 可选，掩码字符，默认为'*'号
 * @return {string}
 * @example
 * U.mask(123456789) // => *********
 * U.mask(123456789, 3) // => 123******
 * U.mask(str, 0, 4) // => *****6789
 * U.mask(str, 3, 4) // => 123**6789
 * U.mask(str, 3, 4, '&') // => 123&&6789
 */
export const mask = (str, start = 0, end = 0, mask = '*') => [...`${str}`].map(
  (v, i) => i >= start && i < `${str}`.length - end ? mask : v
).join('')

/**
 * 随机生成16进制色值
 * @function randomHex
 * @return {string}
 * @example
 * U.randomHex()
 * // => "#f13ba7"
 */
export const randomHex = () => '#' + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)

/**
 * 将3位16进制色值转为6位
 * @function extendHex
 * @param {string} shortHex - 字符串
 * @return {string}
 * @example
 * U.extendHex('#03f')
 * // => '#0033ff'
 * 
 * U.extendHex('05a')
 * // => '#0055aa'
 */
export const extendHex = shortHex => {
  return '#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0)
    .split('')
    .map(x => x + x)
    .join('')
}

/**
 * 解析cookie字符串
 * @function parseCookie
 * @param {string} str - 字符串
 * @return {object}
 * @example
 * U.parseCookie('taken=bar; equation=E%3Dmc%5E2')
 * // => {taken: 'bar', equation: 'E=mc^2'}
 */
export const parseCookie = str => {
  return str.split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
}
