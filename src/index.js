export const renderNode = (el, template) => {
  if(!el){ return false }
  const root = el.cloneNode(false)
  root.innerHTML = template(root).replace(/undefined|false/g, '')
  el.parentNode.replaceChild(root, el)
  return root
}

export const encode = (data) => encodeURIComponent(JSON.stringify(data))

export const decode = (data) => JSON.parse(decodeURIComponent(data))

export default { renderNode, encode, decode }
