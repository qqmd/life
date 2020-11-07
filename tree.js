function assembleTree(nodes, parent, depth) {
  if(!depth) depth = 0
  nodes.forEach(n => {
    let path = parent?parent+'#'+n.path:n.path
    n.meta = {title: n.title, role: n.path, path: path}
    if (n.children && n.children instanceof Array) {
      assembleTree(n.children, path, depth)
    }
  })
  if (depth === 0) {
    return nodes
  }
  depth++
}

const nodes = [
  {title: 'a', path: 'a', children: [{title: 'a1', path: 'a1'}, {title: 'a2', path: 'a2'}]},
  {title: 'c', path: 'c'},
]
console.log(assembleTree(nodes))