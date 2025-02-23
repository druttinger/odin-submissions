// class for each node in the tree
class Node {
    value;
    leftNode;
    rightNode = null;
    isLeft;
    parent;
    depth;
    height = 0;

    constructor (value = null, leftNode = null, 
                 rightNode = null, isLeft = null, parent = null){
        this.value = value;
        this.leftNode = leftNode;
        this.rightNode = rightNode;
        this.isLeft = isLeft;
        this.parent = parent;
        if (this.parent === null) {
            this.depth = 0;
        } else this.depth = this.parent.depth + 1;
    }

    updateHeight = (node = this, height = 0) => {
        if (node.height < height){
            node.height = height;
            if (node.parent) this.updateHeight(node.parent, height + 1);
        }
    }

    setParent = (parent) => {
        this.parent = parent;
    }
    

    getLeftNode = () => {
        return this.leftNode;
    }
    
    setLeftNode = (newNode) => {
        this.leftNode = newNode;
    }
    
    getRightNode = () => {
        return this.rightNode;
    }
    
    setRightNode = (newNode) => {
        this.rightNode = newNode;
    }

    getValue = () => {
        return this.value;
    }
    
    setValue = (newValue) => {
        this.value = newValue;
    }

    isChildless = () => {
        return !(this.leftNode || this.rightNode);
    }
    
}

// class/factory which accepts an array when initialized. 
// The Tree class should have a root attribute, which uses the return value of buildTree which you’ll write next.
class Tree {

    constructor (array){
        // sort array and remove duplicate entries
        let set = new Set(array);
        array = [...set]
        array.sort((a, b) => a - b);
        // recursively build the tree
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    root = null;

    // function that takes an array of data (e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
    // and turns it into a balanced binary tree full of Node objects appropriately placed 
    // (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
    buildTree = (array, start, end, isLeft = null, parent = null) =>{
        // tie off this leaf if we have hit the end
        if (start > end)
            return null;
        let midPoint = Math.floor((end + start) / 2);
        let value = array[midPoint];
        let leftNode = this.buildTree(array, start, midPoint - 1, true);
        let rightNode = this.buildTree(array, midPoint + 1, end, false);

        let newNode = new Node(value, leftNode, rightNode, isLeft, parent);
        // update children to refer back to new node
        if (newNode.leftNode) newNode.leftNode.parent = newNode;
        if (newNode.rightNode) newNode.rightNode.parent = newNode;
        if (parent === null){
            this.updateAllDepths(newNode);
            this.updateAllHeights(newNode);
        }
        return newNode;
    }

    // print tree with clear edges, courtesy of The Odin Project
    prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.rightNode !== null) {
            this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.leftNode !== null) {
            this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    // functions that insert/delete the given value. 
    insert = (value) => {
        let currentNode = this.root;
        while (currentNode !== null && currentNode.value !== value){
            if (value < currentNode.value){
                if (currentNode.getLeftNode() === null){
                    currentNode.setLeftNode(new Node(value,null,
                                            null,true, currentNode));
                    currentNode.getLeftNode().depth = currentNode.depth + 1;
                    currentNode.getLeftNode().updateHeight();
                    return currentNode.getLeftNode();
                }
                currentNode = currentNode.getLeftNode();
            }
            if (value > currentNode.value){
                if (currentNode.getRightNode() === null){
                    currentNode.setRightNode(new Node(value,null,
                        null,false, currentNode));
                    currentNode.getRightNode().depth = currentNode.depth + 1;
                    currentNode.getRightNode().updateHeight();
                    return currentNode.getRightNode();
                }
                currentNode = currentNode.getRightNode();
            }
        }
        return currentNode;
    } 

    // find and delete specified value from Tree with root node
    delete = (value, node = this.root) => {
        let currentNode = this.find(value, node);
        // if there are no children just delete the node
        if (currentNode.isChildless()){
            currentNode = this.replaceNode(currentNode);
        // if there is one node replace the node with its child
        } else if (currentNode.leftNode === null) {
            currentNode = this.replaceNode(currentNode, currentNode.rightNode);
        } else if (currentNode.rightNode === null) {
            currentNode = this.replaceNode(currentNode, currentNode.leftNode);
        // if there are two children replace the value with the lowest value
        // on the right side and delete that node
        } else {
            currentNode.value = this.minValue(currentNode.rightNode);
            this.delete (currentNode.value, currentNode.rightNode);
        }
        this.updateAllDepths();
        this.updateAllHeights();
        return currentNode;
    } 

    // helper method to replace one node with another one by referencing the parent
    replaceNode = (node, replacement = null) => {
        if (replacement){
            replacement.setParent(node.parent);
            replacement.isLeft = node.isLeft;
        }
        if (node.parent === null) {
            this.root = replacement;
        } else if (node.isLeft) {
            node.parent.leftNode = replacement;
        } else {
            node.parent.rightNode = replacement;
        }
        return replacement;
    }

    // returns the lowest value in the tree/subtree
    minValue = (node) => {
        if (node.leftNode === null || node.leftNode === undefined) 
            return node.value;
        else return this.minValue(node.leftNode);
    }

    // function that returns the node with the given value.
    find = (value, node = this.root) => {
        let currentNode = node;
        while (currentNode !== null && currentNode.value !== value){
            if (value < currentNode.value)
                currentNode = currentNode.getLeftNode();
            if (value > currentNode.value)
                currentNode = currentNode.getRightNode();
        }
        return currentNode;
    } 

    
    updateAllHeights = (root = this.root) => {
        this.postOrder((node) => {
            if (!node.leftNode && !node.rightNode){
                node.height = 0;
            } else if (!node.leftNode) {
                node.height = node.rightNode.height + 1;
            } else if (!node.rightNode) {
                node.height = node.leftNode.height + 1;
            } else {
                node.height = (node.leftNode.height > node.rightNode.height ?
                    node.leftNode.height : node.rightNode.height) + 1;
                }
            }, root)
    }
        
    updateAllDepths = (root = this.root) => {
        this.preOrder((node) => {
            if (!node.parent){
                node.depth = 0;
            } else {
                node.depth = node.parent.depth + 1;
            }
        }, root)
    }

    // function that accepts a callback function as its parameter. levelOrder 
    // should traverse the tree in breadth-first level order and call the 
    // callback on each node as it traverses, passing the whole node as an 
    // argument, similarly to how Array.prototype.forEach might work for 
    // arrays. levelOrder may be implemented using either iteration or 
    // recursion (try implementing both!). If no callback function is provided, 
    // throw an Error reporting that a callback is required. 
    levelOrder = (callback) => {
        if (!callback) throw error('No callback passed!')
        let q = [];
        q.push(this.root);
        while (q[0]){
            let currentNode = q[0];
            if(currentNode.leftNode)
                q.push(currentNode.leftNode);
            if(currentNode.rightNode)
                q.push(currentNode.rightNode);
            callback(currentNode);
            q.shift();
        }
    }
        
    // inOrder, preOrder, and postOrder functions that also accept 
    // a callback as a parameter. Each of these functions should traverse the 
    // tree in their respective depth-first order and pass each node to the 
    // provided callback. The functions should throw an Error if no callback 
    // is given as an argument, like with levelOrder.
    inOrder = (callback, node = this.root) => {
        if (!callback) throw error('No callback passed!')
        if (node.leftNode)
            this.inOrder(callback, node.leftNode);
        callback(node);
        if (node.rightNode)
            this.inOrder(callback, node.rightNode);
    }

    preOrder = (callback, node = this.root) => {
        if (!callback) throw error('No callback passed!')
        callback(node);
        if (node.leftNode)
            this.preOrder(callback, node.leftNode);
        if (node.rightNode)
            this.preOrder(callback, node.rightNode);
    }

    postOrder = (callback, node = this.root) => {
        if (!callback) throw error('No callback passed!')
        if (node.leftNode)
            this.postOrder(callback, node.leftNode);
        if (node.rightNode)
            this.postOrder(callback, node.rightNode);
        callback(node);
    }

    // function that returns the given node’s height. Height is defined as the 
    // number of edges in the longest path from a given node to a leaf node.
    height = (node) => {
        return node.height;
    }
    
    // function that returns the given node’s depth. Depth is defined as the 
    // number of edges in the path from a given node to the tree’s root node.
    depth = (node) => {
        return node.depth;
    }

    // function that checks if the tree is balanced. A balanced tree is one 
    // where the difference between heights of the left subtree and the right 
    // subtree of every node is not more than 1.
    isBalanced = (root = this.root) => {
        let max = null;
        let min = null;
        this.inOrder ((node) => {
            if (!node.rightNode || !node.leftNode){
                if (!max) max = min = node.depth;
                else if (node.depth > max) max = node.depth; 
                else if (node.depth < min) min = node.depth; 
            }
        }, root);
        return max - min < 2;
    } 



    // function that rebalances an unbalanced tree. 
    rebalance = (root = this.root) => {
        // skip process if root is null or tree is already balanced
        if (root === null || this.isBalanced(root)) return root;
        let array = [];
        let parent = root.parent;
        let isLeft = root.isLeft;
        this.inOrder((node) => {
            array.push(node.value);
        }, root);
        return this.buildTree(array, 0, array.length - 1, parent, isLeft);
    } 
}

