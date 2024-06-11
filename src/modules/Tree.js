//Base node
class Node {
    constructor(id, parent, data){
        this._id = id;
        this._parent = parent;
        this._data = data;
    }

    get id () {
        return Object.freeze(this._id);
    }

    get data() {
        return Object.freeze(this._data);
    }

    set data(data) {
        this._data = data;
    }
}

class Collection {
    constructor(){
        this._newId = 1;
        this._availableIDs = [];
    }
    getID(){
        return this._availableIDs.length > 0 ? this._availableIDs.pop() : this._newId++;
    }
}

//should be encapsulated within DocumentTree
class TreeNode extends Node {
    
    constructor(id, parent, data = {}){
        super(id, parent, data);
        this._children = [];
    }

    get parent () {
        return Object.freeze(this._parent);
    }

    get children() {
        return Object.freeze(this._children);
    }

    getChild(path) {
        var foundChild = this._children.find(c => c._data.path === path);
        return foundChild ? Object.freeze(foundChild) : null;
    }

    addChild(id, data){
        let newChild = new TreeNode(id, this, data);
        this._children.push(newChild);
        return Object.freeze(newChild);
    }

    //Needs updating to account for deleted nods descendants.
    //It should also implement just the functionality for "deleteNode()" the child is irrelavent.
    removeChildOfNode(id){
        let foundChild = this._children.find(child => child.id === id);
        let foundChildIndex = this._children.indexOf(foundChild);
        if (foundChild && foundChildIndex){
            this._children.splice(foundChildIndex, 1);
            return Object.freeze(foundChild);
        }

        throw Error(`Child with ID ${id} cannot be found.`);
    }

    addTraversal(listNode){
        this._data.traversal = listNode;
    }
}

//DocumentTree a map of a directory containing files
//Contains recursive helper functions and the root node
export class DocumentTree extends Collection {
    constructor(data){
        super();
        data.type = "folder";
        this._root = new TreeNode(this.getID(), null, data);
        this._allEntries = new List();
    }

    //getters
    get root (){
        return this._root;
    }

    push(parent, data){
        let node = parent.addChild(this.getID(), data);
        //If this is a file, we embed the linked lists node into the tree node's data
        //This later allows us to traverse along nodes file by file sequentially
        //We also maintain a linked list of files to enable different searching alogorithms
        if (data.type === "file") { 
            let listNode = this._allEntries.push(node);
            node.addTraversal(listNode);
        };
        return node;
    }


    //recursive search functions
    findById(id){
        let node = this.#recursiveFindByID(this._root, +id);
        if (!node) throw ReferenceError(`Node with ID ${id} does not exist in tree ${this}`);
        return node;
    }
    #recursiveFindByID(node, id){
        if (node.id === id) return node;
        let result;
        for(let child of node.children){
            result =this.#recursiveFindByID(child, id)
            if (result) return result;
        }
    }

    
    findByPath(path = ""){
        //EG ./entries/861/Teragoth => ["Teragoth", "861", "entries", "."]
        const splitPath = path.split("/").reverse();
        //pop off the root
        splitPath.pop();
        splitPath.pop();
    
        //Result ["Teragoth", "861"] -> pass array into recursive function
        let result = this.#recursiveFindByPath(this._root, splitPath);
        return result;
    }
    #recursiveFindByPath(node, pathArray){
        if (pathArray.length === 0){
            return node;
        }
        let search = pathArray.pop();
        let foundNode = node.getChild(search);
    
        if (foundNode === null) throw ReferenceError(`Cannot find ${search} in ${node.data.type} ${node.data.path}`);
    
        return this.#recursiveFindByPath(foundNode, pathArray);
    }

    print(){
        this.#recursivePrint(this._root, "");
    }
    #recursivePrint(node, indent){
        console.log(`${indent+node.data.path}`);
        indent += "--";
        for (let child of node.children){
            this.#recursivePrint(child, indent);
        }
    }


    getFirstEntryId(){
        return this._allEntries._head.data.id;
    }

    getNodePathAsIds(path){
        //EG ./entries/861/Teragoth => ["Teragoth", "861", "entries", "."]
        const splitPath = path.split("/").reverse();
        //pop off the root
        splitPath.pop();
        splitPath.pop();
    
        let idArray = [];
        //Result ["Teragoth", "861"] -> pass array into recursive function
        idArray.push({id: this._root.id, name: "Journal"});
        this.#recursiveGetNodePathAsIds(this._root, splitPath, idArray);
        console.log(idArray);
        return idArray;
    }

    #recursiveGetNodePathAsIds(node, pathArray, outArray){
        if (pathArray.length === 0) return outArray;
        let search = pathArray.pop();
        let foundNode = node.getChild(search);
        if (!foundNode) throw ReferenceError(`Cannot find ${search} in ${node.data.type} ${node.data.path}`);
        outArray.push({id: foundNode.id, name: foundNode.data.path});
        return this.#recursiveGetNodePathAsIds(foundNode, pathArray, outArray);
    }
}

class ListNode extends Node {
    constructor(id, last, data){
        super(id, last, data);
        this._next = null;
    }

    get last(){
        return this._parent;
    }

    get next() {
        return this._next;
    }

    set next(node){
        this._next = node;
    }
}

class List extends Collection {
    constructor(listData = null){
        super();
        this._length = 0;

        if (listData){
            for (let data of listData){
                this.push(data);
            }
        } else {
            this.#assignHead(null);
        }        
    }
    get length(){
        return this._length;
    }

    #assignHead(node){
        this._head = node;
        this._tail = node;
    }

    push(data){
        let node = new ListNode(this.getID(), this._tail, data);
        if (!this._head) this.#assignHead(node);
        else {
            this._tail.next = node;
            this._tail = node;
        }
        return this._tail;
    }

    pop(){
        let node = this._tail;
        this._tail = node.last;
        return node;
    }

    forEach(callback){
        this.iterateList(this._head, callback);
    }

    getIterator(){
        return this.iterateList;
    }

    iterateList(node, callback){
        callback(node.data);
        if (!node.next) return;
        this.iterateList(node.next, callback);
    }
}
