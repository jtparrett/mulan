export const renderNode = (el, template) => {
  if(!el){ return false }
  el.innerHTML = template(el).replace(/undefined|false/g, '')
  return el.childNodes
}

export const encode = (data) => encodeURIComponent(JSON.stringify(data))

export const decode = (data) => JSON.parse(decodeURIComponent(data))

export default { renderNode, encode, decode }
