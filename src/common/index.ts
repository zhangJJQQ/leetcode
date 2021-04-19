// 链表元素
class ListNode<T> {
  constructor(val?: T, next?: ListNode<T>) {
    this.val = val;
    this.next = next ?? null;
  }
  val: any;
  next: ListNode<T> | null;
}
// 树元素
class TreeNode<T> {
  constructor(val?: T, left?: TreeNode<T>, right?: TreeNode<T>) {
    this.val = val;
    this.left = left ?? null;
    this.right = right ?? null;
  }
  val: any;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}
// 数组转链表
function array2list<T>(arr: T[]): ListNode<T> | null {
  if (arr.length == 0 || (arr.length == 1 && typeof arr[0] != "number")) {
    return null;
  }
  let list = null;
  let i = arr.length - 1;
  while (i > -1) {
    list = new ListNode(arr[i], list ?? undefined);
    i--;
  }
  return list;
}
function list2array<T>(list: ListNode<T> | null): T[] {
  const arr = [];
  let temp = list;
  while (temp) {
    arr.push(temp.val);
    temp = temp.next;
  }
  return arr;
}
// 数组转二叉树
function array2tree<T>(arr: T[]): TreeNode<T> | null {
  if (arr.length == 0 || (arr.length == 1 && typeof arr[0] != "number")) {
    return null;
  }
  const tree = new TreeNode<T>();
  let left: T[] = [];
  let right: T[] = [];
  let i = 0;
  let len = 0;
  let fir = -1;
  while (fir < arr.length) {
    i++;
    len = Math.pow(2, i);
    fir = len - 1;
    left = [...left, ...arr.slice(len - 1, (len * 3) / 2 - 1)];
    right = [...right, ...arr.slice((len * 3) / 2 - 1, len * 2 - 1)];
  }
  tree.val = arr[0];
  tree.left = array2tree(left);
  tree.right = array2tree(right);
  return tree;
}
function tree2array<T>(root: TreeNode<T> | null): T[] {
  if (!root) return [];
  const left = tree2array(root.left);
  const right = tree2array(root.right);
  return [...left, root.val, ...right];
}
// 二分查找
function quickFindIndex<T>(
  array: T[],
  predicate: (value?: T, index?: number, array?: T[]) => boolean
): number {
  let min = 0;
  let max = array.length - 1;
  let mid = Math.floor((min + max) / 2);
  if (predicate(array[min], min, array)) return 0;
  if (!predicate(array[max], max, array)) return -1;
  while (max - min > 1) {
    mid = Math.floor((min + max) / 2);
    if (predicate(array[mid], mid, array)) max = mid;
    else min = mid;
  }
  return max;
}
// 二分查找
function quickFind<T>(
  array: T[],
  predicate: (value?: T, index?: number, array?: T[]) => boolean
): T | null {
  const index = quickFindIndex(array, predicate);
  if (index === -1) return null;
  return array[index];
}
// 快排
function quickSort<T>(arr: T[], compare: (a: T, b: T) => boolean): T[] {
  if (arr.length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  const middle = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const ele = arr[i];
    if (compare(ele, middle)) {
      left.push(ele);
    } else {
      right.push(ele);
    }
  }
  const sortedLeft = quickSort(left, compare);
  const sortedRight = quickSort(right, compare);
  return [...sortedLeft, middle, ...sortedRight];
}
class Heap<T> {
  constructor(compare: (a: T, b: T) => boolean) {
    this.heap = [];
    this.compare = compare;
  }
  heap: T[];
  compare: (a: T, b: T) => boolean;
  swap(i: number, j: number) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  shiftDown() {
    let fatherIndex = 0;
    let tempIndex = fatherIndex;
    let leftChildIndex = fatherIndex * 2;
    let rightChildIndex = fatherIndex * 2 + 1;
    while (leftChildIndex < this.heap.length) {
      tempIndex = leftChildIndex;
      if (
        rightChildIndex < this.heap.length &&
        !this.compare(this.heap[leftChildIndex], this.heap[rightChildIndex])
      ) {
        tempIndex = rightChildIndex;
      }
      if (this.compare(this.heap[tempIndex], this.heap[fatherIndex])) {
        this.swap(tempIndex, fatherIndex);
        fatherIndex = tempIndex;
        leftChildIndex = fatherIndex * 2;
        rightChildIndex = fatherIndex * 2 + 1;
      } else {
        break;
      }
    }
  }
  shiftUp() {
    let fatherIndex = 0;
    let childIndex = this.heap.length - 1;
    while (childIndex > 0) {
      fatherIndex = Math.floor(childIndex / 2);
      if (this.compare(this.heap[childIndex], this.heap[fatherIndex])) {
        this.swap(childIndex, fatherIndex);
        childIndex = fatherIndex;
      } else {
        break;
      }
    }
  }
  push(ele: T) {
    this.heap = [...this.heap, ele];
    this.shiftUp();
  }
  pop() {
    const head = this.heap[0];
    this.swap(0, this.heap.length - 1);
    this.heap = this.heap.slice(0, this.heap.length - 1);
    this.shiftDown();
    return head;
  }
}
class UnionFind<T> {
  constructor(param: number | T[]) {
    this.elsTree = new Map();
    this.size = 0;
    if (typeof param === "number" && Number.isInteger(param)) {
      new Array(param).fill(0).forEach((v, i) => {
        this.elsTree.set(i, i);
      });
      this.size = param;
    }
    if (typeof param === "object" && Array.isArray(param)) {
      param.forEach((v, i) => {
        this.elsTree.set(v, v);
      });
      this.size = param.length;
    }
  }
  elsTree: Map<number | T, number | T>;
  size: number;
  find(el: T): T {
    if (this.elsTree.get(el) !== el) {
      this.elsTree.set(el, this.find(this.elsTree.get(el) as T));
    }
    return this.elsTree.get(el) as T;
  }
  same(el1: T, el2: T) {
    const elRoot1 = this.find(el1);
    const elRoot2 = this.find(el2);
    return elRoot1 === elRoot2;
  }
  union(el1: T, el2: T) {
    const elRoot1 = this.find(el1);
    const elRoot2 = this.find(el2);
    if (elRoot1 === elRoot2) return;
    this.elsTree.set(elRoot1, elRoot2);
    this.size--;
  }
}
function proxyMatrix<T>(matrix: T[][]) {
  return new Proxy(matrix, {
    get: (target: T[][], p: number) => {
      if (typeof target[p] === 'undefined') {
        target[p] = []
      }
      return target[p];
    }
  })
}
const cacheMatrix = proxyMatrix<number>([[]]);
// 排列组合A
function A(n1: number, n2: number): number {
  if (n1 === 0) {
    cacheMatrix[n1][n2] = 1;
  }
  if (n1 === 1) {
    cacheMatrix[n1][n2] = n2;
  }
  if (typeof cacheMatrix[n1][n2] === 'undefined') {
    cacheMatrix[n1][n2] = n2 * A(n1 - 1, n2 - 1);
  }
  return cacheMatrix[n1][n2];
}
// 排列组合C
function C(n1: number, n2: number) {
  return A(n1, n2) / A(n1, n1);
}
export {
  ListNode,
  TreeNode,
  array2tree,
  array2list,
  tree2array,
  list2array,
  quickFindIndex,
  quickFind,
  quickSort,
  Heap,
  UnionFind,
  A,
  C,
};
