export const createRenderer = (el, component) => {
  if(!el){ return false }
  const root = el.cloneNode(false)
  let cache
  const render = (template) => {
    if(template !== cache){
      root.innerHTML = template.replace(/undefined|false|NaN|null/g, '')
      cache = template
    }
    return root
  }
  component(render, root)
  el.parentNode.replaceChild(root, el)
  return {render, root}
}

export default { renderNode }