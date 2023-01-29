// An attempt to implement a Trie

export default class TrieNode {
    public children: Map<string, TrieNode>;
    public isEndOfWord: boolean;

    constructor(public value: string, public parent: TrieNode | null) {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}