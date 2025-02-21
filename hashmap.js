import LinkedList from "linkedlist";

export default class HashMap {
    constructor (loadFactor = 0.75, bucketLength = 16, ...args){
        this.init(loadFactor, bucketLength, ...args)
    }

    init = (loadFactor = 0.75, bucketLength = 16, ...args) => {
        this.loadFactor = loadFactor;
        this.bucketLength = bucketLength;
        this.buckets = new Array(this.bucketLength);
        this.load = 0;
        for (let each of args){
            if (each.length === 2){
                this.set(each[0], each[1])
            }
        }
    }

    load = 0;
    loadFactor = 0.75;
    bucketLength = 16;
    buckets = [];

    hash = (key) => {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode;
    } 

    checkExpansion = () => {
        if (this.load / this.bucketLength > this.loadFactor){
            this.init(this.loadFactor, this.bucketLength * 2, ...this.entries())
        }
    }

    // set new key
    set = (key, value) => {

        this.checkExpansion();
        this.load++;
        let hash = this.hash(key);
        let index = hash % this.bucketLength;
        let bucket = this.buckets[index];
        if (!bucket){
            this.buckets[index] = new LinkedList([key, value]);
        } else if (bucket.contains([key, value])) {
            bucket.at(bucket.find([key, value])).value()[1] = value;
        } else {
            bucket.append([key, value])
        }
            
    }

    // takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
    get = (key) => {
        let hash = this.hash(key);
        let index = hash % this.bucketLength;
        let bucket = this.buckets[index];
        if (bucket){
            for (let i = 0; i < bucket.getSize(); i++){
                if (bucket.at(i).value()[0] === key)
                    return bucket.at(i).value()[1];
            }
        }
        return null;
    } 
    
    // takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
    has = (key) => {
        let hash = this.hash(key);
        let index = hash % this.bucketLength;
        let bucket = this.buckets[index];
        if (bucket) return true;
        return null;
    } 
    
    // takes a key as an argument. If the given key is in the hash map, 
    // it should remove the entry with that key and return true. 
    // If the key isn’t in the hash map, it should return false.
    remove = (key) => {
        let hash = this.hash(key);
        let index = hash % this.bucketLength;
        let bucket = this.buckets[index];
        if (bucket){
            for (let i = 0; i < bucket.getSize(); i++){
                if (bucket.at(i)[0] === key)
                    bucket.removeAt(i);
                return true;
            }
        }
        return false;
    } 
    
    // returns the number of stored keys in the hash map.
    length = () => {
        return this.load;
    } 

    // removes all entries in the hash map.
    clear = () => {
        this.bucketLength = 16;
        this.buckets = new Array(this.bucketLength);
        this.load = 0;
    }

    // returns an array containing all the keys inside the hash map.
    keys = () => {
        let arr = [];
        this.iterate((node)=> {
            arr.push(node.value()[0]);
        });
        return arr;
    } 

    // returns an array containing all the values.
    values = () => {
        let arr = [];
        this.iterate((node)=> {
            arr.push(node.value()[1]);
        });
        return arr;
    } 

    replaceValue = (key, value) => {
        let madeReplacement = false;
        this.iterate((node)=> {
            if (node.value()[0] === key){
                node.value()[1] = value;
                madeReplacement = true;
            }
        });
        return madeReplacement;
    } 

    // returns an array that contains each key, value pair. 
    // Example: [[firstKey, firstValue], [secondKey, secondValue]]
    entries = () => {
        let arr = [];
        this.iterate((node)=> {
            arr.push(node.value());
        });
        return arr;
    } 

    iterate = (func) => {
        for (let each of this.buckets){
            if (each){
                for (let i = 0; i < each.getSize(); i++){
                    func(each.at(i));
                }
            }
        }
    }
}