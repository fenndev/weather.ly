import TrieNode from "./TrieNode";

export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode('', null);
    }

    // Compares each character in a string to a list of
    // TrieNodes and inserts new ones for each character
    // that isn't already present in the node map.
    public insert(query: string): void {
        let current = this.root;
        for(const char of query) {
            let node = current.children.get(char);
            if(!node) {
                node = new TrieNode(char, current);
                current.children.set(char, node);
            }
            current = node;
        }
        current.isEndOfWord = true;
    }
    
    // Iterates through word a given string's chars, checks if it exists in the Trie, 
    // and calls a helper function to add matching suggestions to an array. 
    // Returns up to 3 suggestions.
    public search(query: string): string[] {
        let current = this.root;
        const suggestions: string[] = [];
        for(const char of query) {
            const node = current.children.get(char);
            if(!node) return suggestions;
            current = node;
        }

        this.trieSearch(current, suggestions);
        return suggestions.slice(0, 3);
    }

    // Recursively search the Trie starting from the given node, 
    // adding all the end-of-word values to the suggestions array.
    private trieSearch(node: TrieNode, suggestions: string[]) {
        if(node.isEndOfWord) suggestions.push(node.value);

        for(const child of Object.values(node.children)) this.trieSearch(child, suggestions);
    }
}