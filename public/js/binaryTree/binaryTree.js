
import {Node} from './node.js';

export class Tree {
  constructor() {
    this.root = null;
  }

  toObject() {
    return this.root;
  }

  add(num) {
    if(!this.root) this.root = new Node(num);
    else{
      let node = this.root;

      while(true) {
        if(num<node.value){
          if(node.left) node = node.left;
          else{
            node.left = new Node(num);
            return;
          }
        } 
        else{
          if(node.right){
            node = node.right;
          }
          else{
            node.right = new Node(num);
            return;
          }
        }
      }
    }
  }
}


const preorderTraverse = (node, array, y, x, sign) => {
  if(!node) return array;

  if(y === 0) array.push({ value: node.value, y: 0, x: 0 });
  else {
    x = x + (sign * 2) / Math.pow(2, y);
    array.push({ value: node.value, y: y, x: x });
  }
  
  y = y + 1;

  array = preorderTraverse(node.left, array, y, x, -1);
  array = preorderTraverse(node.right, array, y, x, 1);
  return array;
};

const preorderTraverse_link = (node, linkarray, y, x, sign) => {
  if (!node) return linkarray;
  let prev_x = x;
  let prev_y = y - 1;

  if (y === 0) none; // вот тут интересный момент
  else {
    x = x + (sign * 2) / Math.pow(2, y);
    linkarray.push(
      { source: [prev_x, prev_y], 
        target: [x, y] 
      }
    );
  }
  y = y + 1;

  linkarray = preorderTraverse_link(node.left, linkarray, y, x, -1);
  linkarray = preorderTraverse_link(node.right, linkarray, y, x, 1);
  return linkarray;
};

const convertToXY = (item) => {
  const topMargin = 50;
  let node = {};
  node.value = item.value;
  node.y = item.y * 50 + topMargin;
  node.x = item.x * 200 + 400;
  return node;
};

const convertLinkToXY = (item) => {
  const topMargin = 50;
  let node = { source: [], target: [] };
  node.source[0] = item.source[0] * 200 + 400;
  node.source[1] = item.source[1] * 50 + topMargin;
  node.target[0] = item.target[0] * 200 + 400;
  node.target[1] = item.target[1] * 50 + topMargin;
  return node;
};

function resetTree() {
  tree = new Tree();
  tree.add(50);

  let treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
  let treelinkArray = preorderTraverse_link(tree.root, [], 0, 0, 1);
  treeArray = treeArray.map(convertToXY);
  let treelinkArrayBef = treelinkArray.map(convertLinkToXY);
  let treelinkArrayAft = treelinkArray.map(convertLinkToXY);

  updateTree(treeArray, treelinkArrayBef, treelinkArrayAft);
  prevLink = [];

}

function addRandomToTree() {
  let newValue = 0;
  let randInt = Math.floor(Math.random() * 100);
  newValue = randInt
  tree.add(randInt);
  let treeArray = preorderTraverse(tree.root, [], 0, 0, 1);
  let treelinkArray = preorderTraverse_link(tree.root, [], 0, 0, 1);

  treeArray = treeArray.map(convertToXY);
  let treelinkArrayAft = treelinkArray.map(convertLinkToXY);
  let treelinkArrayBef = treelinkArray.map(convertLinkToXY);

  console.log("Before:")
  console.log(treelinkArrayBef)
  console.log("Aft")
  console.log(treelinkArrayAft)

  let mydiff = _.cloneDeep(_.differenceWith(treelinkArrayBef, prevLink, _.isEqual))
  console.log(mydiff)

  prevLink = _.cloneDeep(treelinkArrayBef)
  for (let i = 0; i < prevLink.length; i++) {
    if (_.isEqual(prevLink[i].source, mydiff[0].source) && _.isEqual(prevLink[i].target, mydiff[0].target))
      prevLink[i].target = prevLink[i].source
  }

  updateTree(treeArray, prevLink, treelinkArrayBef);
  prevLink = _.cloneDeep(treelinkArrayBef);

}

function updateTree(treeArray, treelinkArrayBef, treelinkArrayAft) {
  let t = d3.transition().duration(750);

  let links = svg.selectAll("path").data(treelinkArrayBef);

  let enter_links = links.enter().append("path").attr("fill", "none").attr("stroke", "black");

  links = enter_links.merge(links).attr("d", linkGen);

  links = svg.selectAll("path").data(treelinkArrayAft);

  links.exit().remove();

  enter_links = links.enter().append("path").attr("fill", "none").attr("stroke", "black");

  links = enter_links.merge(links).transition().attr("d", linkGen);

  let nodes = svg.append("g").selectAll('circle').data(treeArray);

  svg.selectAll("g").selectAll('g').data(treeArray).exit().remove()

  let enter = nodes.enter().append('g').attr("transform", d => "translate(" + d.x + "," + d.y + ")");

  enter.append("circle").attr("class", "node").attr("fill", d => d.value < newValue ? "#aec6cf" : d.value === newValue ? "white" : "#ff7560").attr("stroke", "black").attr("r", 20);
  enter.append("text").attr("text-anchor", "middle").attr("y", ".3em").text(d => d.value);

  nodes = enter.merge(nodes);

}
