class LinkedList {

    firstElem = null;
    lastElem = null;
    elems = [];
    size = 0;

    constructor(...args){
        this.size = 0;
        for (let each of args){
            this.append(each);
        }
    }

    append = (value) => {
        let node = new Node(value);
        this.size++;
        this.elems.push(node);
        if (this.lastElem === null){
            this.lastElem = this.firstElem = node;
        } else {
            this.lastElem = this.lastElem.ptr = node;
        }
    }
   
    prepend = (value) => {
        let node = new Node(value);
        this.size++;
        //insert at the beginning of the index array
        this.elems.splice(0, 0, node)
        if (this.lastElem === null){
            this.lastElem = this.firstElem = node;
        } else {
            node.ptr = this.firstElem;
            this.firstElem = node;
        }
    }

    // insert value at  given index
    insertAt = (value, index) => {
        if (index > this.size){
            console.error('Index out of bounds');
            return;
        }
        let node = new Node(value);
        this.size++;
        //insert into the tracking array
        this.elems.splice(index, 0, node)
        if (index === 0){
            this.firstElem = node;
        } else {
            this.elems[index-1].ptr = node;
            node.ptr =  this.elems[index + 1] ?
                this.elems[index + 1] : null;
        }
        if (index === this.size - 1){
            this.lastElem = node;
        } 
    }

    // remove value at  given index
    removeAt = (index) => {
        if (index >= this.size){
            console.error('Index out of bounds');
            return;
        }
        this.size--;
        if (this.size === 0)
            this.firstElem = this.lastElem = null;
        else {
            if (index === 0){
                // change the initial pointer if the index is 0
                this.firstElem = this.firstElem.ptr;
            } else {
                // otherwise change the pointer of the node that comes before it
                this.elems[index - 1].ptr = this.elems[index].ptr;
            }
                //make sure to update the lastElem pointer if need be
            if (index === this.size){
                this.lastElem = this.elems[index - 1];
            } 
        }
        this.elems.splice(index, 1)
    }

    //returns the total number of nodes in the list
    getSize = () => {
        return this.size;
    } 

    //returns the first node in the list
    head = () => {
        return this.firstElem;
    } 
   
    //returns the last node in the list
    tail = () => {
        return this.lastElem;
    } 

    //returns the node at the given index
    at = (index) => {
        return this.elems[index];
    }

    //removes the last element from the list
    pop = () => {
        if (this.size > 0){
            this.size--;
            this.elems.pop();
            if (this.size === 0){
                this.firstElem = null;
                this.lastElem = null;
            } else {
                this.lastElem = this.elems.at(-1);
                this.elems.at(-1).ptr = null;
            }
        }
    } 

    //returns true if the passed in value is in the list and otherwise returns false.
    contains = (value) => {
        let node = this.firstElem;
        while (node !== null){
            if (node.value === value) return true;
            node = node.nextNode();
        }
        return false;
    }

    //returns the index of the node containing value, or null if not found.
    find = (value) => {
        let node = this.firstElem;
        let count = 0;
        while (node !== null){
            if (node.value === value) return count;
            node = node.nextNode();
            count++;
        }
        return null;
    }

    // represents your LinkedList objects as strings
    toString = () => {
        let node = this.firstElem;
        let returnString = '';
        while (node !== null){
            returnString += '( ' + node.value() + ' ) -> ';
            node = node.nextNode();
        }
        returnString += 'null';
        return returnString;
    }
}

class Node {
    constructor (data = null, ptr = null){
        this.data = data;
        this.ptr = ptr;
    }

    value = ()=>{
        return this.data;
    }

    nextNode = ()=>{
        return this.ptr;
    }
}